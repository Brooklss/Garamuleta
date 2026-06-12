import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500', '*'],
    methods: ['GET', 'POST'],
}));
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const productData = fs.readFileSync('./products.json', 'utf8');

const SYSTEM_PROMPT = `
You are "Tekcon Assistant", a friendly and knowledgeable AI assistant for Tekcon Ethiopia — Ethiopia's leading bathroom water heating solutions company, based in Addis Ababa.

Company Profile:
- Name: Tekcon Ethiopia
- Founded: 2004 (20 years of experience)
- Owner / Founder: Ato Tekeba Brhine
- Specialty: Import, distribution, installation, and after-sales service of water heaters
- Location: Addis Ababa, Ethiopia
- We serve residential homes, apartments, hotels, guesthouses, and commercial buildings

Product Lines:
- Electric Storage Water Heaters (10L, 30L, 50L, 80L)
- Instant Electric Water Heaters (3.5kW, 5.5kW)
- Solar Water Heaters (150L, 200L evacuated tube systems)
- Gas Water Heaters (6L/min, 16L/min)
- Accessories & Spare Parts

Your personality: warm, knowledgeable, concise, and professional. Respond in the same language the user writes in (English or Amharic).

Your responsibilities:
- Help customers choose the right water heater for their needs (family size, power availability, usage)
- Answer questions about product specs, features, installation, and warranty
- Guide visitors to the right page (Products, About, Contact)
- For pricing questions, always say: "For pricing and availability, please contact us directly at +251 11 XXX XXXX or visit our Addis Ababa showroom — we'd be happy to assist."
- Never quote prices — Tekcon is a catalog/showroom business, not an online shop
- Keep responses concise — 2–4 sentences unless detail is required

Official Product & Company Data:
${productData}

Important guidelines:
- Always recommend the correct product size based on family size or usage
- Highlight solar options for customers asking about energy savings
- Mention installation service is available for all products
- If asked about price, quote in ETB from the data above
`;

app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        const contents = [
            ...history.map(turn => ({
                role: turn.role,
                parts: [{ text: turn.text }],
            })),
            {
                role: 'user',
                parts: [{ text: message }],
            },
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.65,
                maxOutputTokens: 512,
            },
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('AI Error:', error?.message || error);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok', company: 'Tekcon Ethiopia' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚿 Tekcon AI server running on http://localhost:${PORT}`));