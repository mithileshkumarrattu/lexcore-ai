import { type NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

// Supported languages with proper mapping
const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी (Hindi)" },
  { code: "te", label: "తెలుగు (Telugu)" },
  { code: "bn", label: "বাংলা (Bengali)" },
  { code: "mr", label: "मराठी (Marathi)" },
  { code: "ta", label: "தமிழ் (Tamil)" },
  { code: "gu", label: "ગુજરાતી (Gujarati)" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", label: "മലയാളം (Malayalam)" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
]

// Helper: Clean response from markdown formatting
function formatPlainText(text: string): string {
  return (
    text
      // Remove markdown formatting
      .replace(/\*\*/g, "") // Remove bold
      .replace(/\*/g, "") // Remove italic
      .replace(/#{1,6}\s/g, "") // Remove headings
      .replace(/`([^`]+)`/g, "$1") // Remove inline code
      .replace(/```[\s\S]*?```/g, "") // Remove code blocks
      // Remove markdown links but keep text
      .replace(/\[([^\]]+)\]$$[^)]+$$/g, "$1")
      // Clean up extra whitespace
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  )
}

// System prompt for Gemini with structured response instructions
function buildSystemPrompt(languageCode: string) {
  const languageInstructions: Record<string, string> = {
    hi: "आपको केवल हिंदी में जवाब देना है। स्पष्ट और संरचित उत्तर दें।",
    te: "మీరు తెలుగులో మాత్రమే సమాధానం ఇవ్వాలి। స్పష్టమైన మరియు నిర్మాణాత్మక సమాధానం ఇవ్వండి।",
    bn: "আপনাকে শুধুমাত্র বাংলায় উত্তর দিতে হবে। স্পষ্ট এবং কাঠামোবদ্ধ উত্তর দিন।",
    mr: "तुम्ही फक्त मराठीत उत्तर द्यावे. स्पष्ट आणि संरचित उत्तर द्या.",
    ta: "நீங்கள் தமிழில் மட்டுமே பதிலளிக்க வேண்டும். தெளிவான மற்றும் கட்டமைக்கப்பட்ட பதில் கொடுங்கள்.",
    gu: "તમારે ફક્ત ગુજરાતીમાં જવાબ આપવો જોઈએ. સ્પષ્ટ અને સંરચિત જવાબ આપો.",
    kn: "ನೀವು ಕನ್ನಡದಲ್ಲಿ ಮಾತ್ರ ಉತ್ತರಿಸಬೇಕು. ಸ್ಪಷ್ಟ ಮತ್ತು ರಚನಾತ್ಮಕ ಉತ್ತರ ನೀಡಿ.",
    ml: "നിങ്ങൾ മലയാളത്തിൽ മാത്രം ഉത്തരം നൽകണം. വ്യക്തവും ഘടനാപരവുമായ ഉത്തരം നൽകുക.",
    pa: "ਤੁਹਾਨੂੰ ਸਿਰਫ਼ ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦੇਣਾ ਚਾਹੀਦਾ ਹੈ। ਸਪੱਸ਼ਟ ਅਤੇ ਢਾਂਚਾਗਤ ਜਵਾਬ ਦਿਓ।",
    en: "Respond only in English. Provide clear and structured answers.",
  }

  return `
You are NyaySetu.AI, an expert Indian legal aid assistant.
${languageInstructions[languageCode] || languageInstructions.en}

IMPORTANT FORMATTING RULES:
- Do NOT use any markdown formatting (**, *, #, etc.)
- Use plain text only
- Structure your response clearly with sections when appropriate
- For processes, use "Step 1:", "Step 2:" format
- List "Required Documents:" when applicable  
- Mention "Fees:" or costs with ₹ symbol
- Add "Important:" for critical information
- Include "Tips:" for helpful advice
- For legal rights, mention "Your Rights:" section

Provide accurate, actionable legal guidance based on Indian law.
If unsure about specific details, recommend consulting a qualified lawyer.
Never ask for personal information or qualifying questions.
`.trim()
}

export async function POST(req: NextRequest) {
  try {
    const { messages, selectedLanguage, isDocumentSummary, documentText } = await req.json()

    // Get language code from selected language
    const langCode = SUPPORTED_LANGUAGES.find((lang) => lang.label === selectedLanguage)?.code || "en"

    // Get the last user message
    const userMessages = messages.filter((m: any) => m.role === "user")
    const lastUserMsg = userMessages[userMessages.length - 1]

    if (!lastUserMsg || !lastUserMsg.content) {
      return NextResponse.json({
        role: "assistant",
        content: "You can now ask your legal question.",
      })
    }

    // Skip language selection messages
    if (SUPPORTED_LANGUAGES.some((lang) => lang.label === lastUserMsg.content.trim())) {
      return NextResponse.json({
        role: "assistant",
        content: `Thank you for selecting ${selectedLanguage}. Please briefly describe your legal problem or ask any question.`,
      })
    }

    // Build conversation context for Gemini
    const systemPrompt = buildSystemPrompt(langCode)

    let prompt: string

    if (isDocumentSummary && documentText) {
      // Document summarization prompt
      prompt = `${systemPrompt}

Please analyze the following legal document in ${selectedLanguage}. Provide a comprehensive summary with clear sections for key points, important dates, required actions, and legal implications.

Document Text:
${documentText}

User's request: ${lastUserMsg.content}`
    } else {
      // Regular conversation prompt with context
      const conversationHistory = messages
        .filter((m: any) => m.role === "user" || m.role === "bot")
        .slice(-6) // Keep last 6 messages for context
        .map((m: any) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n")

      prompt = `${systemPrompt}

Recent Conversation:
${conversationHistory}

Current User Query: ${lastUserMsg.content}

Provide a helpful, structured response addressing the user's legal question.`
    }

    // Call Gemini API
    const requestBody = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        topK: 32,
        topP: 0.8,
        maxOutputTokens: 2048,
      },
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated."

    // Clean the response from markdown formatting
    responseText = formatPlainText(responseText)

    return NextResponse.json({
      role: "assistant",
      content: responseText,
      language: langCode,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        role: "assistant",
        content: "Sorry, I could not process your request right now. Please try again later.",
      },
      { status: 500 },
    )
  }
}
