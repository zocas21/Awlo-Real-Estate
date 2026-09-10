import dotenv from "dotenv";
dotenv.config({ override: true });
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { SAMPLE_PROPERTIES, FAQ_ITEMS } from "./src/data/mockData";

interface StoredLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message?: string;
  interestedPropertyTitle?: string;
  budgetRange?: string;
  preferredNeighborhood?: string;
  source: 'contact_form' | 'ai_assistant' | 'book_tour';
  createdAt: string;
}

const leadsStore: StoredLead[] = [
  {
    id: 'lead-sample-1',
    name: 'Abebe Kebede',
    phone: '+251 91 155 4433',
    email: 'abebe.k@example.com',
    subject: '3-Bedroom Unit Inquiry in Bole',
    message: 'Interested in touring Awlo Bole Horizon Tower this Saturday.',
    interestedPropertyTitle: 'Awlo Bole Horizon Tower',
    budgetRange: '25-30M ETB',
    preferredNeighborhood: 'Bole',
    source: 'book_tour',
    createdAt: new Date().toISOString()
  }
];

const AWLO_SYSTEM_PROMPT = `You are the official AI assistant for this website. Help visitors understand the website, its services, products, courses, features, and information. Answer clearly, naturally, and professionally. Use information available on the website whenever relevant. Never invent information. If you don't know something, honestly say that you don't have enough information.

Website & Company Profile:
- Company Name: Awlo Real Estate
- Tagline: "Find Your Place in Addis Ababa"
- Location & Head Office: Bole Sub-city, In front of Bole Medhanialem Church, Next to Kenenisa Hotel, Addis Ababa, Ethiopia
- Phone: +251 92 941 9130
- Email: awlobc@gmail.com
- WhatsApp: +251 92 941 9130
- Working Hours: Monday–Saturday 09:30–20:00, Sunday 14:00–20:00 (East Africa Time)

Available Properties Portfolio in Addis Ababa:
${JSON.stringify(SAMPLE_PROPERTIES.map(p => ({
  id: p.id,
  title: p.title,
  neighborhood: p.neighborhood,
  propertyType: p.propertyType,
  priceETB: `${(p.priceETB / 1000000).toFixed(1)} Million ETB`,
  priceUSD: `$${(p.priceUSD / 1000).toFixed(0)}k USD`,
  beds: p.beds,
  baths: p.baths,
  sqm: `${p.sqm} m²`,
  status: p.status,
  completionDate: p.completionDate,
  keyFeatures: p.amenities
})), null, 2)}

FAQ Knowledge Base:
${JSON.stringify(FAQ_ITEMS.map(f => ({ question: f.question, answer: f.answer })), null, 2)}

Guidelines:
1. When visitors inquire about properties, mention exact names, locations (Bole, CMC, Sarbet, Summit, Ayat, etc.), prices in ETB and USD, and key amenities (backup power generators, water reserves, elevators, parking).
2. Clarify that all properties come with 100% authentic legal title deeds (Sertifikat/Karta) notarized by the Addis Ababa Document Authentication and Registration Agency upon final handover.
3. Explain the milestone installment payment plans (e.g. 20% down payment with balance paid across 18–36 months).
4. Invite users to book a free guided VIP site tour or visit our Bole head office in front of Bole Medhanialem Church, next to Kenenisa Hotel.
5. The AI should understand follow-up questions and maintain conversation context.
6. Keep answers friendly, concise, natural, and useful.`;

// Lazy GoogleGenAI client initialization using server-side GEMINI_API_KEY
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "Awlo Real Estate API",
      aiProvider: "Google Gemini API",
      model: "gemini-3.6-flash"
    });
  });

  // Properties API
  app.get("/api/properties", (_req, res) => {
    res.json({ success: true, count: SAMPLE_PROPERTIES.length, properties: SAMPLE_PROPERTIES });
  });

  // Leads API
  app.get("/api/leads", (_req, res) => {
    res.json({ success: true, count: leadsStore.length, leads: leadsStore });
  });

  app.post("/api/leads", (req, res) => {
    const { name, phone, email, subject, message, interestedPropertyTitle, budgetRange, preferredNeighborhood, source } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, error: "Name and phone number are required." });
    }

    const newLead: StoredLead = {
      id: `lead-${Date.now()}`,
      name,
      phone,
      email: email || '',
      subject: subject || 'General Property Inquiry',
      message: message || '',
      interestedPropertyTitle: interestedPropertyTitle || '',
      budgetRange: budgetRange || '',
      preferredNeighborhood: preferredNeighborhood || '',
      source: source || 'contact_form',
      createdAt: new Date().toISOString()
    };

    leadsStore.unshift(newLead);
    return res.json({ success: true, message: "Lead recorded successfully!", lead: newLead });
  });

  // Google Gemini AI Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      console.log("[/api/chat] Incoming chat request:", { messageLength: message?.length, historyCount: history?.length });

      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
          success: false,
          error: "Message parameter is required and cannot be empty."
        });
      }

      const ai = getGeminiClient();
      if (!ai) {
        console.error("GEMINI_API_KEY environment variable is not configured on the server.");
        return res.status(500).json({
          success: false,
          error: "Sorry, I'm having trouble connecting right now. Please try again."
        });
      }

      // Format previous conversation context for Gemini API
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const h of history) {
          if (h && typeof h.text === "string" && h.text.trim()) {
            contents.push({
              role: h.sender === 'user' ? 'user' : 'model',
              parts: [{ text: h.text.trim() }]
            });
          }
        }
      }

      // Append current user message
      contents.push({
        role: 'user',
        parts: [{ text: message.trim() }]
      });

      console.log("[/api/chat] Sending request to Gemini API (gemini-3.6-flash)...");
      const startTime = Date.now();

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: contents as any,
        config: {
          systemInstruction: AWLO_SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      console.log(`[/api/chat] Received Gemini response in ${Date.now() - startTime}ms`);

      const responseText =
        response.text?.trim() ||
        "I am here to assist you with finding the right property with Awlo Real Estate in Addis Ababa. How may I help you today?";

      // Match property IDs in response to suggest relevant property cards in the UI
      const matchedPropertyIds: string[] = [];
      SAMPLE_PROPERTIES.forEach(p => {
        if (
          responseText.toLowerCase().includes(p.title.toLowerCase()) ||
          (responseText.toLowerCase().includes(p.neighborhood.toLowerCase()) &&
            responseText.toLowerCase().includes(p.propertyType.toLowerCase()))
        ) {
          if (!matchedPropertyIds.includes(p.id)) {
            matchedPropertyIds.push(p.id);
          }
        }
      });

      return res.json({
        success: true,
        text: responseText,
        recommendedPropertyIds: matchedPropertyIds.slice(0, 3)
      });
    } catch (error: any) {
      console.error("Gemini Chat API Error:", error?.message || error);
      return res.status(500).json({
        success: false,
        error: "Sorry, I'm having trouble connecting right now. Please try again."
      });
    }
  });

  // Vite middleware for dev / static for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Awlo Real Estate server listening at http://localhost:${PORT}`);
  });
}

startServer();
