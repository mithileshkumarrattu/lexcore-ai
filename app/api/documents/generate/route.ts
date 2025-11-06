import { generateText } from "ai"

export const runtime = "nodejs"

interface GenerateRequest {
  type: string
  details: string
  language: string
}

const DOCUMENT_TEMPLATES: Record<string, string> = {
  "legal-notice": "Legal Notice",
  "consumer-complaint": "Consumer Complaint",
  "rti-application": "RTI Application",
  "police-complaint": "Police Complaint (FIR)",
  affidavit: "Affidavit",
}

export async function POST(req: Request) {
  try {
    const { type, details, language }: GenerateRequest = await req.json()

    if (!type || !details) {
      return Response.json({ error: "Document type and details are required" }, { status: 400 })
    }

    const documentName = DOCUMENT_TEMPLATES[type] || "Legal Document"
    const languageName = language === "hi" ? "Hindi" : "English"

    const prompt = `You are a legal document generator for Indian law. Generate a professional ${documentName} in ${languageName} based on these details:

${details}

Requirements:
1. Use proper legal format and language
2. Include all necessary sections (To, From, Subject, Date, etc.)
3. Use appropriate legal terminology for Indian law
4. Include placeholders [IN BRACKETS] for information not provided
5. Add a disclaimer at the end
6. Make it ready to use with minimal editing
7. If in Hindi, use Devanagari script

Generate a complete, professional document that can be used in Indian legal proceedings.`

    const { text } = await generateText({
      model: "google/gemini-2.0-flash-exp",
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    const filename = `${documentName.replace(/\s+/g, "_")}_${Date.now()}.txt`

    return Response.json({
      content: text,
      filename,
    })
  } catch (error) {
    console.error("[v0] Generation error:", error)
    return Response.json({ error: "Failed to generate document" }, { status: 500 })
  }
}
