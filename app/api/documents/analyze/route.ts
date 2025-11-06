import { generateText } from "ai"

export const runtime = "nodejs"

interface AnalyzeRequest {
  documentId: string
  documentName: string
}

export async function POST(req: Request) {
  try {
    const { documentId, documentName }: AnalyzeRequest = await req.json()

    if (!documentId || !documentName) {
      return Response.json({ error: "Document ID and name are required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Fetch the document content from storage
    // 2. Extract text using OCR if it's an image/PDF
    // 3. Analyze the actual content

    // For demo purposes, we'll generate a mock analysis based on the document name
    const prompt = `You are a legal document analyzer. Analyze a legal document named "${documentName}" and provide:

1. A brief summary (2-3 sentences)
2. 3-4 key points from the document
3. 2-3 potential legal issues or concerns
4. 2-3 recommendations for the user

Format your response as JSON with these exact keys: summary, keyPoints (array), legalIssues (array), recommendations (array).

Make the analysis realistic and helpful for an Indian legal context.`

    const { text } = await generateText({
      model: "google/gemini-2.0-flash-exp",
      prompt,
      temperature: 0.7,
    })

    // Parse the AI response
    let analysis
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0])
      } else {
        // Fallback if JSON parsing fails
        analysis = {
          summary: "This document appears to be a legal document that requires careful review.",
          keyPoints: [
            "Document contains important legal information",
            "Multiple parties may be involved",
            "Specific dates and obligations are mentioned",
          ],
          legalIssues: [
            "Potential compliance requirements need verification",
            "Jurisdictional considerations should be reviewed",
          ],
          recommendations: [
            "Consult with a legal professional for detailed advice",
            "Verify all dates and deadlines mentioned",
            "Keep copies of all related documents",
          ],
        }
      }
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)
      // Use fallback analysis
      analysis = {
        summary: "This document contains legal information that requires professional review.",
        keyPoints: [
          "Document uploaded successfully",
          "Contains legal terminology and clauses",
          "May require professional legal interpretation",
        ],
        legalIssues: ["Complex legal language may need clarification", "Specific legal obligations should be verified"],
        recommendations: [
          "Consult a qualified lawyer for detailed analysis",
          "Maintain organized records of all documents",
        ],
      }
    }

    return Response.json({ analysis })
  } catch (error) {
    console.error("[v0] Analysis error:", error)
    return Response.json({ error: "Failed to analyze document" }, { status: 500 })
  }
}
