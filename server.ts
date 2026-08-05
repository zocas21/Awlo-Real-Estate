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

const AWLO_SYSTEM_PROMPT = `
You are "Awlo", the friendly, highly knowledgeable, and elite AI real estate assistant for Awlo Real Estate based in Addis Ababa, Ethiopia.

Company Profile:
- Name: Awlo Real Estate
- Tagline: "Find Your Place in Addis Ababa"
- Head Office: Awlo Building, 4th Floor, Bole Road (near Atlas Traffic Light), Addis Ababa, Ethiopia.
- Phone: +251 91 123 4567
- WhatsApp: +251 91 123 4567
- Working Hours: Monday to Saturday 8:30 AM – 6:00 PM (East Africa Time). Closed Sundays.

Available Properties Portfolio:
${JSON.stringify(SAMPLE_PROPERTIES, null, 2)}

FAQ Knowledge Base:
${JSON.stringify(FAQ_ITEMS, null, 2)}

Your Core Responsibilities & Behavior Rules:
1. Help users discover properties in Addis Ababa (Bole, CMC, Sarbet, Summit, Ayat, Bole Arabsa, Gerji, Lebu).
2. Recommend specific properties when users state budget, bedrooms, or preferred neighborhoods. Always mention exact names, prices in ETB & estimated USD, and key features.
3. Answer questions about legal title deeds (Sertifikat/Karta notarized by Addis Ababa Document Authentication office), payment plans (20% down deposit with 18-36 month installments), ready vs under-construction units, and site visits.
4. Lead Capture: When users express interest in purchasing or visiting, warmly ask for their Name and Phone number so a human sales agent can follow up.
5. Offer to schedule a free guided VIP "Book a Tour" site visit.
6. Tone: Warm, professional, confident, concise, and helpful with authentic Ethiopian real estate hospitality.
`;

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Awlo Real Estate API" });
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

  // Gemini AI Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ success: false, error: "Message parameter is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          success: false,
          error: "GEMINI_API_KEY environment variable is missing on the server."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      // Format message history
      const formattedHistory = (history || []).map((h: { sender: string; text: string }) => ({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      }));

      // Construct request
      const contents = [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: contents as any,
        config: {
          systemInstruction: AWLO_SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "I apologize, I could not generate a response right now. Please feel free to call our Awlo sales office directly at +251 91 123 4567.";

      // Match property IDs in response to suggest cards
      const matchedPropertyIds: string[] = [];
      SAMPLE_PROPERTIES.forEach(p => {
        if (
          responseText.toLowerCase().includes(p.title.toLowerCase()) ||
          (responseText.toLowerCase().includes(p.neighborhood.toLowerCase()) && responseText.toLowerCase().includes(p.propertyType.toLowerCase()))
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
      console.error("Gemini Chat API Error:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "An error occurred while processing your request with Awlo AI."
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
