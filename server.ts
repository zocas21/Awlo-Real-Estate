import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import OpenAI from "openai";
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

const AWLO_SYSTEM_PROMPT = `You are the official AI assistant for this website. Help visitors understand the website, its services, products, courses, features, and other available information. Answer clearly, naturally, and professionally. Use information available on the website when relevant. Never invent information. If you do not know something, honestly tell the user that you don't have enough information.

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
5. Keep answers friendly, concise, natural, and useful.`;

// Lazy OpenAI client initialization
let openaiClient: OpenAI | null = null;
function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

// Lazy Gemini client initialization for seamless fallback
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

// Fallback response generator based on site data if both online AI APIs are unreachable
function getRuleBasedResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('bole') && !q.includes('arabsa')) {
    return "Awlo Real Estate offers premium residential options in Bole, notably **Awlo Bole Horizon Tower** (3-bedroom luxury apartment, ETB 28.5M / ~$220,000 USD). It comes ready for move-in, complete with backup power, water reservoirs, and 100% notarized legal title deeds. Would you like to schedule a tour?";
  }
  if (q.includes('arabsa')) {
    return "Our **Awlo Bole Arabsa Eco-Flats** feature modern 3-bedroom residences at ETB 11.5M (~$89,000 USD) with scenic mountain views and solar water heating. Installment plans start with a 20% down payment.";
  }
  if (q.includes('price') || q.includes('cost') || q.includes('budget')) {
    return "Our properties range from ETB 11.5 Million (~$89k USD) for Bole Arabsa apartments to ETB 38 Million (~$295k USD) for luxury penthouses in CMC. We offer milestone payment plans starting with 20% down payment.";
  }
  if (q.includes('office') || q.includes('location') || q.includes('address') || q.includes('where')) {
    return "Our Awlo Real Estate head office is located in Bole Sub-city, in front of Bole Medhanialem Church, next to Kenenisa Hotel, Addis Ababa. We are open Monday–Saturday 09:30–20:00 and Sunday 14:00–20:00. You can reach us at +251 92 941 9130.";
  }
  if (q.includes('tour') || q.includes('visit') || q.includes('book')) {
    return "We would be delighted to host you for a free guided VIP site tour of our Addis Ababa developments! You can click the 'Book Site Tour' button in the chat or call our sales team directly at +251 92 941 9130.";
  }
  if (q.includes('legal') || q.includes('karta') || q.includes('title') || q.includes('deed')) {
    return "All Awlo properties are sold with 100% authentic legal ownership title deeds (Sertifikat/Karta) registered with the Addis Ababa City Administration Document Authentication and Registration Agency.";
  }
  return "Welcome to Awlo Real Estate! We offer verified luxury residential apartments and commercial developments across Bole, CMC, Sarbet, Summit, and Ayat in Addis Ababa. How may I help you today?";
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
      aiProvider: "OpenAI ChatGPT (with Gemini backup)",
      model: "gpt-4o-mini"
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

  // ChatGPT / OpenAI AI Chat API with resilient multi-tier fallback
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
          success: false,
          error: "Message parameter is required and cannot be empty."
        });
      }

      let responseText: string | null = null;
      let usedProvider = "none";

      // 1. Primary Engine: Try OpenAI ChatGPT API
      const openai = getOpenAIClient();
      if (openai) {
        try {
          const formattedHistory: OpenAI.Chat.ChatCompletionMessageParam[] = (history || [])
            .filter((h: any) => h && typeof h.text === 'string' && h.text.trim())
            .map((h: { sender: string; text: string }) => ({
              role: h.sender === 'user' ? ('user' as const) : ('assistant' as const),
              content: h.text
            }));

          const chatMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            {
              role: "system",
              content: AWLO_SYSTEM_PROMPT
            },
            ...formattedHistory,
            {
              role: "user",
              content: message.trim()
            }
          ];

          const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: chatMessages,
            temperature: 0.7,
            max_tokens: 600
          });

          const content = completion.choices[0]?.message?.content?.trim();
          if (content) {
            responseText = content;
            usedProvider = "OpenAI (gpt-4o-mini)";
          }
        } catch (openaiErr: any) {
          // Gracefully detect quota / billing / rate-limit / network issues
          const status = openaiErr?.status || openaiErr?.statusCode;
          const msg = openaiErr?.message || '';
          console.log(`[AI Engine] OpenAI notice (status: ${status}): ${msg.slice(0, 100)}. Switching to Gemini fallback engine...`);
        }
      }

      // 2. Secondary Engine: Gemini API (if OpenAI had 429 quota or connection error)
      if (!responseText) {
        const gemini = getGeminiClient();
        if (gemini) {
          try {
            const formattedHistory = (history || [])
              .filter((h: any) => h && typeof h.text === 'string' && h.text.trim())
              .map((h: { sender: string; text: string }) => ({
                role: h.sender === 'user' ? 'user' : 'model',
                parts: [{ text: h.text }]
              }));

            const contents = [
              ...formattedHistory,
              { role: 'user', parts: [{ text: message.trim() }] }
            ];

            const geminiRes = await gemini.models.generateContent({
              model: "gemini-3.6-flash",
              contents: contents as any,
              config: {
                systemInstruction: AWLO_SYSTEM_PROMPT,
                temperature: 0.7,
              }
            });

            if (geminiRes.text) {
              responseText = geminiRes.text;
              usedProvider = "Gemini (gemini-3.6-flash)";
            }
          } catch (geminiErr: any) {
            console.log(`[AI Engine] Gemini fallback notice: ${geminiErr?.message?.slice(0, 100) || 'Unavailable'}`);
          }
        }
      }

      // 3. Fallback: Intelligent domain knowledge base matcher
      if (!responseText) {
        responseText = getRuleBasedResponse(message);
        usedProvider = "Awlo Knowledge Engine";
      }

      // Match property IDs in response to suggest relevant property cards in the UI
      const matchedPropertyIds: string[] = [];
      SAMPLE_PROPERTIES.forEach(p => {
        if (
          responseText!.toLowerCase().includes(p.title.toLowerCase()) ||
          (responseText!.toLowerCase().includes(p.neighborhood.toLowerCase()) &&
            responseText!.toLowerCase().includes(p.propertyType.toLowerCase()))
        ) {
          if (!matchedPropertyIds.includes(p.id)) {
            matchedPropertyIds.push(p.id);
          }
        }
      });

      return res.json({
        success: true,
        text: responseText,
        provider: usedProvider,
        recommendedPropertyIds: matchedPropertyIds.slice(0, 3)
      });
    } catch (error: any) {
      console.log("[AI Engine] Handled request exception:", error?.message || error);
      return res.json({
        success: true,
        text: getRuleBasedResponse(req.body?.message || ""),
        provider: "Awlo Knowledge Engine",
        recommendedPropertyIds: []
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
