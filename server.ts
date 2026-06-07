import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP Verification Error:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      // Validation
      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required.' 
        });
      }

      const recipient = process.env.RECIPIENT_EMAIL || 'jaiyanthofficial@gmail.com';

      // Check if SMTP is configured
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('--- EMAIL NOT CONFIGURED ---');
        console.warn('Set SMTP_USER and SMTP_PASS in your environment variables to send real emails.');
        console.warn(`Intended Recipient: ${recipient}`);
        console.warn(`From: ${name} (${email})`);
        console.warn(`Message: ${message}`);
        console.warn('----------------------------');
        
        return res.status(200).json({ 
          success: true, 
          message: 'Message logged to server console (SMTP not configured).' 
        });
      }

      // Send the email
      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`, // Most providers require the 'from' to be the authenticated user
        replyTo: email,
        to: recipient,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #00f2ff;">New Portfolio Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      });

      console.log(`Email successfully sent to ${recipient} from ${email}`);

      res.status(200).json({ 
        success: true, 
        message: 'Message transmitted successfully.' 
      });
    } catch (error) {
      console.error('Contact API Error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error. Could not send message.' 
      });
    }
  });

  // API route for AI assistant chatbot
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ success: false, message: 'Message payload is required.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        console.warn('--- GEMINI_API_KEY NOT CONFIGURED ---');
        return res.status(200).json({
          success: true,
          text: `**[Demo Mode Engaged]** Hi there! I am Jaiyanth's virtual workspace agent. Since my neural runtime requires a \`GEMINI_API_KEY\` (which is not configured in the environment right now), I'm running on localized standard memory blocks. 

🎓 **About Jaiyanth B**:
- Graduating in **2027** with a B.Tech in **Computer Science & Business Systems** at VSB Engineering College. Currently maintaining a high **8.13 CGPA**.
- Focus domains include **Artificial Intelligence, Machine Learning, Secure Systems, Automation, and Cloud Infrastructure**.

💡 **Core Projects**:
1. **Fake News Detector**: Leverages LLMs, Flask, and PostgreSQL to authenticate textual claims & articles.
2. **Secure Document Vault**: An encrypted offline block storage engine enforcing AES-GCM and Argon2 secure hashes with FastAPI.
3. **Up-Skill AI**: A career advisor/mentor interface supporting NLP resume reviews and mock simulations built with Flask and PostgreSQL.
4. **Car-Rent Platform**: A secure vehicle drop-off and booking system with stateless JWT cookie encryption built on Next.js.

📧 **How to reach Jaiyanth**:
- Send him a broadcast on the contact form below or email him directly: **jaiyanthofficial@gmail.com** (or dial **+919345573281**)!
- Let me know if you would like me to discuss anything else about his academic background or project repo configurations!`
        });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are "Jaiyanth B" (or the "JB AI Copilot Agent"), the friendly, super-competent AI developer persona built directly for Jaiyanth B's portfolio.
About Jaiyanth B:
- Undergrad computer science and business systems student (2023 - 2027) at VSB Engineering College. Maintains an 8.13 CGPA.
- Key skills: Python, Java, SQL, React, Machine Learning, Cloud Systems, FastAPI, NLP, RAG, LangChain, PostgreSQL, MySQL.
- Highlighted Projects:
  1. "Fake News Detector": ML-based detector via Flask, PostgreSQL, LLM integration.
  2. "Secure Document Vault": Highly resilient encrypted document handling via AES-GCM, SQLite, FastAPI, and encrypted streams.
  3. "Up-Skill": Interactive resume evaluator and mock coach utilizing personalized AI suggestions, backed by Flask and PostgreSQL.
  4. "Car-Rent": Secure car rental platform with location-based delivery services and JWT security, built on Next.js and SQLite.
- Current status: Open to internships, software developer roles, and research opportunities in AI and engineering.

Tone & Guidelines:
- Highly professional, extremely technically sound, crisp, welcoming, and slightly terminal-inspired.
- Use elegant Markdown grids, checklists, and bullet points to organize facts.
- Answer user's questions about Jaiyanth's skills, academic accomplishments, projects, or how to contact him.
- If asked, guide the recruiter/user to send a message via the Contact Form or mail: jaiyanthofficial@gmail.com.
- Do NOT make up fake credentials for him outside what is specified above.
- Be brief (under 180 words per response).`;

      // Transform incoming simple role history to GenAI protocol
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.role === 'user' ? 'user' : 'model',
            parts: [{ text: turn.text || turn.message || '' }]
          });
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.status(200).json({
        success: true,
        text: response.text
      });

    } catch (err: any) {
      console.error('Gemini API Invocation Error:', err);
      res.status(500).json({
        success: false,
        message: 'Neural interface failed to process content.'
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Mode:', process.env.NODE_ENV || 'development');
  });
}

startServer();
