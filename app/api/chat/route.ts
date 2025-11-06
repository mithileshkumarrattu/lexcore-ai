// app/api/chat/route.ts

import { type NextRequest, NextResponse } from "next/server"
import { indianKanoonClient } from "@/lib/indiankanoon-client"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAjDuzhbSUfvKt7EjGknx5SqedcS9E_rQk"

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  hi: "Hindi (हिंदी)",
  te: "Telugu (తెలుగు)",
  bn: "Bengali (বাংলা)",
  mr: "Marathi (मराठी)",
  ta: "Tamil (தமிழ்)",
  gu: "Gujarati (ગુજરાતી)",
  kn: "Kannada (ಕನ್ನಡ)",
  ml: "Malayalam (മലയാളം)",
  pa: "Punjabi (ਪੰਜਾਬੀ)",
}

interface LegalReference {
  caseNumber: number
  title: string
  court: string
  url: string
  snippet: string
  docId: string
  citations?: string[]
  date?: string
}

// Check if query is casual/conversational
function isCasualQuery(message: string): boolean {
  const casualPhrases = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good afternoon",
    "good evening",
    "what can you do",
    "who are you",
    "what are you",
    "how are you",
    "help",
    "tell me about yourself",
    "what is your purpose",
    "can you help me",
    "introduce yourself",
    "what services",
    "namaste",
    "thanks",
    "thank you",
    "bye",
    "goodbye",
  ]

  const lowerMessage = message.toLowerCase().trim()

  if (lowerMessage.length < 50) {
    return casualPhrases.some(
      (phrase) =>
        lowerMessage === phrase ||
        lowerMessage.startsWith(phrase + " ") ||
        lowerMessage.endsWith(" " + phrase),
    )
  }

  return false
}

// FIXED: Check if query needs legal analysis - ADDED CYBER KEYWORDS
function needsLegalAnalysis(message: string): boolean {
  const legalKeywords = [
    "section",
    "act",
    "law",
    "case",
    "judgment",
    "judgement",
    "ipc",
    "bns",
    "crpc",
    "cpc",
    "article",
    "supreme court",
    "high court",
    "precedent",
    "citation",
    "constitution",
    "rights",
    "legal",
    "court",
    "complaint",
    "fir",
    "police",
    "advocate",
    "lawyer",
    "petition",
    "bail",
    "arrest",
    "crime",
    "punishment",
    "fine",
    "jail",
    "prison",
    "accused",
    "victim",
    "property",
    "contract",
    "divorce",
    "custody",
    "will",
    "inheritance",
    "tenant",
    "landlord",
    "employment",
    "compensation",
    // ADDED: Cyber keywords
    "cyber",
    "cyberbully",
    "bully",
    "bullying",
    "harass",
    "harassment",
    "stalk",
    "stalking",
    "online",
    "internet",
    "social media",
    "facebook",
    "instagram",
    "whatsapp",
    "twitter",
    "threat",
    "intimidat",
  ]

  const lowerMessage = message.toLowerCase()
  return legalKeywords.some((keyword) => lowerMessage.includes(keyword))
}

// Search Indian Kanoon with improved error handling
async function searchIndianKanoon(query: string): Promise<LegalReference[]> {
  try {
    console.log("[LexCore] Searching Indian Kanoon for:", query.substring(0, 100))

    const searchQuery = query.substring(0, 150).trim()

    const response = await indianKanoonClient.search({
      formInput: searchQuery,
      pagenum: 0,
      maxcites: 5,
    })

    console.log("[LexCore] Indian Kanoon raw response:", JSON.stringify(response).substring(0, 500))

    if (!response || typeof response !== "object") {
      console.log("[LexCore] Invalid response format")
      return []
    }

    if (response.docs && Array.isArray(response.docs) && response.docs.length > 0) {
      const references = response.docs.slice(0, 5).map((doc, index) => ({
        caseNumber: index + 1,
        title: doc.title || "Legal Document",
        court: doc.docsource || "Indian Court",
        url: `https://indiankanoon.org/doc/${doc.tid}/`,
        snippet: doc.headline || "Relevant legal reference from Indian Kanoon",
        docId: doc.tid,
        date: doc.publishdate || undefined,
        citations: [],
      }))

      console.log("[LexCore] ✅ Processed", references.length, "legal references from Indian Kanoon API")
      return references
    }

    console.log("[LexCore] No documents found in Indian Kanoon response")
    return []
  } catch (error) {
    console.error("[LexCore] ⚠️ Indian Kanoon API failed:", error)
    if (error instanceof Error) {
      console.error("[LexCore] Error details:", error.message)
    }
    return []
  }
}

// Build casual conversation prompt
function buildCasualPrompt(languageName: string): string {
  return `You are LexCore AI, a friendly and helpful Indian legal assistant.

RESPONSE LANGUAGE: Respond ENTIRELY in ${languageName}.

IMPORTANT: This is a casual conversation. Respond naturally and conversationally, NOT in a structured legal format.

Your capabilities:
- Answer legal questions about Indian law
- Help with document preparation (RTI, complaints, legal notices)
- Explain legal processes and rights
- Provide guidance on Indian legal procedures
- Support in 10+ Indian languages

GUIDELINES:
- Be warm, friendly, and conversational
- Keep responses brief and natural (2-4 sentences)
- Don't use structured sections or bullet points
- Sound like a helpful friend, not a formal legal document
- Encourage users to ask specific legal questions

Respond naturally in ${languageName}.`
}

// FIXED: Build legal prompt with BOTH Indian Kanoon RAG AND Gemini citation instructions
function buildLegalPrompt(
  languageName: string,
  category?: string,
  legalReferences?: LegalReference[],
): string {
  let legalContext = ""

  // If Indian Kanoon returned results, use them
  if (legalReferences && legalReferences.length > 0) {
    legalContext = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 LEGAL SOURCES FROM INDIAN KANOON DATABASE
(Retrieval Augmented Generation - RAG)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${legalReferences
  .map(
    (ref) => `
📋 [CASE ${ref.caseNumber}]: ${ref.title}
   Court: ${ref.court}
   ${ref.date ? `Date: ${ref.date}` : ""}
   Document ID: ${ref.docId}
   URL: ${ref.url}
   
   Key Excerpt:
   ${ref.snippet}
`,
  )
  .join("\n" + "─".repeat(50) + "\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CITATION INSTRUCTIONS:
- PRIORITIZE these verified cases from Indian Kanoon database
- Cite them as "[Case ${legalReferences[0]?.caseNumber}]" in your response
- Example: "According to [Case 1], the court held that..."
- At the END, include "CITED CASES" section with full details
`
  } else {
    // If Indian Kanoon failed, ask Gemini to generate citations from its knowledge
    legalContext = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ CITATION REQUIREMENT (Indian Kanoon API Unavailable)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You MUST cite REAL, VERIFIED Indian Supreme Court and High Court cases from your training data.

EXAMPLES OF LANDMARK CASES YOU SHOULD CITE:
- Cybercrime: Shreya Singhal v. Union of India (2015) 5 SCC 1
- Privacy: K.S. Puttaswamy v. Union of India (2017) 10 SCC 1  
- Cyber harassment: State of TN v. Suhas Katti (2004)
- FIR rights: Lalita Kumari v. Govt of UP (2014) 2 SCC 1
- Bail: Sanjay Chandra v. CBI (2012) 1 SCC 40
- Constitutional rights: Maneka Gandhi v. UoI AIR 1978 SC 597

CITATION FORMAT:
- Use inline citations: [Case 1], [Case 2], [Case 3]
- At END, include complete "CITED CASES" section with:
  * Full case name
  * Court name
  * Citation (Year SCC/AIR)
  * Year
  * IndianKanoon.org URL (if you know the doc ID)
  * Brief relevance to user's query

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
  }

  return `You are LexCore AI, an expert Indian legal assistant specializing in Indian law and legal procedures.

RESPONSE LANGUAGE: Respond ENTIRELY in ${languageName}. All sections, explanations, and content must be in ${languageName}.

${category ? `LEGAL CATEGORY: This query is related to ${category}` : ""}

${legalContext}

RESPONSE FORMAT - Structure your response with these sections:

1. 📌 SUMMARY
   Brief overview of the legal issue (2-3 sentences)

2. ⚖️ RELEVANT CASE LAW
   ${legalReferences && legalReferences.length > 0 ? "Reference the verified cases from Indian Kanoon database above" : "Cite REAL Indian cases from your knowledge"}
   Format: "In [Case 1], the [Court] held that..."
   Explain how each case applies to user's situation

3. 📝 ACTION STEPS
   Clear, numbered steps
   Format: Step 1: [action], Step 2: [action]

4. 📄 REQUIRED DOCUMENTS
   List with brief explanations
   Format: - Document name (purpose)

5. 📚 LEGAL BASIS
   Cite specific sections and acts
   Format: "Under Section [X] of [Act], [explanation]"
   Include: IPC/BNS 2023, CrPC, CPC, IT Act 2000, Constitution

6. 💰 FEES & COSTS
   Real-world fee estimates with ₹ symbol
   Format: - Filing fee: ₹500

7. ⏱️ TIMELINE
   Expected duration for each step
   Format: - Initial filing: 1-2 days

8. ⚡ YOUR LEGAL RIGHTS
   Explain relevant rights clearly

9. ⚠️ IMPORTANT NOTES
   Critical warnings

10. 📖 CITED CASES (MANDATORY - Include at END)
    ${legalReferences && legalReferences.length > 0 ? "List the Indian Kanoon cases referenced above" : "List REAL Indian cases you cited from your knowledge"}
    
    Format for each case:
    [Case 1]: [Full Case Title]
    Court: [Court Name]
    ${legalReferences && legalReferences.length > 0 ? "Document ID: [docId from above]" : "Citation: [Year SCC/AIR]"}
    ${legalReferences && legalReferences.length > 0 ? "Date: [Date from above]" : "Year: [Year]"}
    URL: ${legalReferences && legalReferences.length > 0 ? "[URL from above]" : "https://indiankanoon.org/doc/[docid]/ (if known)"}
    Key Point: [Brief relevance]

CRITICAL GUIDELINES:
- ALWAYS cite case names using [Case X] format
- Be specific and actionable
- Use simple language
- Clarify: "This is legal information, not legal advice"
- Recommend consulting a lawyer for complex cases
- Format Indian numbering: ₹1,000 not ₹1000

Provide comprehensive, accurate information with REAL case citations.`
}

// Format response with proper citations
function formatResponseWithCitations(
  responseText: string,
  legalReferences: LegalReference[],
): string {
  if (!legalReferences || legalReferences.length === 0) {
    return responseText
  }

  // Check if response already has "CITED CASES" section
  if (responseText.toLowerCase().includes("cited cases")) {
    return responseText
  }

  // Add cited cases section at the end
  const citationsSection = `

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 CITED CASES & LEGAL REFERENCES
(Source: Indian Kanoon Database)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${legalReferences
  .map(
    (ref) => `
[Case ${ref.caseNumber}]: ${ref.title}

Court: ${ref.court}
${ref.date ? `Date: ${ref.date}` : ""}
Document ID: ${ref.docId}
Read Full Judgment: ${ref.url}

Key Excerpt:
${ref.snippet}
`,
  )
  .join("\n" + "─".repeat(50) + "\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️ These are verified cases from IndianKanoon.org database
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

  return responseText + citationsSection
}

// Generate legal document
async function generateLegalDocument(
  message: string,
  conversationHistory: any[],
  languageName: string,
  category?: string,
): Promise<{ name: string; content: string } | null> {
  try {
    console.log("[LexCore] Generating legal document for:", message.substring(0, 100))

    const docType = message.toLowerCase().includes("notice")
      ? "Legal Notice"
      : message.toLowerCase().includes("complaint")
        ? "Complaint"
        : message.toLowerCase().includes("rti")
          ? "RTI Application"
          : message.toLowerCase().includes("petition")
            ? "Petition"
            : message.toLowerCase().includes("affidavit")
              ? "Affidavit"
              : message.toLowerCase().includes("agreement")
                ? "Agreement"
                : "Legal Document"

    const conversationContext = conversationHistory
      ?.slice(-10)
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    const documentPrompt = `You are a legal document drafting expert specializing in Indian law.

Based on the following conversation, generate a professional ${docType} in ${languageName}.

Conversation Context:
${conversationContext}

Current Request: ${message}

${category ? `Legal Category: ${category}` : ""}

INSTRUCTIONS:
1. Create a complete, professional ${docType} for Indian legal proceedings
2. Include all necessary sections and formatting
3. Use proper legal language and terminology
4. Include placeholders in [square brackets] for information to be filled in
5. Add relevant legal citations and references where applicable
6. Include disclaimer at end noting this is a template
7. Format with appropriate spacing and sections
8. Write ENTIRELY in ${languageName}

Generate the complete document now:`

    const requestBody = {
      contents: [{ role: "user", parts: [{ text: documentPrompt }] }],
      generationConfig: {
        temperature: 0.4,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 3072,
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
      console.error("[LexCore] Document generation API error:", response.status)
      return null
    }

    const data = await response.json()
    const documentContent = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!documentContent) {
      console.log("[LexCore] No document content generated")
      return null
    }

    console.log("[LexCore] Document generated successfully")
    return {
      name: `${docType.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.txt`,
      content: documentContent,
    }
  } catch (error) {
    console.error("[LexCore] Document generation error:", error)
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, language, category, history, messages, selectedLanguage } = await req.json()

    const userMessage = message || (messages && messages[messages.length - 1]?.content)

    if (!userMessage?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    console.log("[LexCore] Processing chat request:", {
      language: language || selectedLanguage,
      category,
      messageLength: userMessage.length,
    })

    const languageName = LANGUAGE_NAMES[language] || selectedLanguage || "English"

    // Detect if this is a casual conversation
    const isCasual = isCasualQuery(userMessage)
    const needsLegal = needsLegalAnalysis(userMessage)

    console.log("[LexCore] Query type:", { isCasual, needsLegal })

    let legalReferences: LegalReference[] = []
    let systemPrompt: string

    // Use different prompts based on query type
    if (isCasual && !needsLegal) {
      console.log("[LexCore] Using casual conversation prompt")
      systemPrompt = buildCasualPrompt(languageName)
    } else {
      // Legal query - try Indian Kanoon API first
      const shouldSearchLegal = needsLegal || category !== undefined

      if (shouldSearchLegal) {
        console.log("[LexCore] 🔍 Attempting Indian Kanoon API search")
        legalReferences = await searchIndianKanoon(userMessage)
        
        if (legalReferences.length > 0) {
          console.log("[LexCore] ✅ Using", legalReferences.length, "cases from Indian Kanoon API")
        } else {
          console.log("[LexCore] ⚠️ Indian Kanoon API returned 0 results, Gemini will generate citations from its knowledge")
        }
      }

      systemPrompt = buildLegalPrompt(languageName, category, legalReferences)
    }

    const conversationContext = (history || messages)
      ?.slice(-5)
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    const fullPrompt = `${systemPrompt}

${conversationContext ? `Previous conversation:\n${conversationContext}\n` : ""}

User question: ${userMessage}

${isCasual ? "Respond naturally and conversationally." : `Provide a comprehensive, structured response in ${languageName}. ${legalReferences.length > 0 ? "CITE the verified Indian Kanoon cases using [Case X] format." : "CITE REAL Indian landmark cases from your knowledge using [Case X] format."} MUST include "CITED CASES" section at the end with complete details and URLs.`}`

    const requestBody = {
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: {
        temperature: isCasual ? 0.7 : 0.2, // Lower for accurate citations
        topK: 32,
        topP: 0.8,
        maxOutputTokens: isCasual ? 512 : 2500,
      },
    }

    console.log("[LexCore] Calling Gemini API")
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      },
    )

    if (!response.ok) {
      console.error("[LexCore] Gemini API error:", response.status)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated."

    // If Indian Kanoon returned results but Gemini didn't include them, append citations
    if (legalReferences.length > 0 && !responseText.toLowerCase().includes("cited cases")) {
      responseText = formatResponseWithCitations(responseText, legalReferences)
    }

    console.log("[LexCore] Gemini response received, length:", responseText.length)

    // Check if document generation is needed
    const shouldGenerateDoc =
      userMessage.toLowerCase().includes("draft") ||
      userMessage.toLowerCase().includes("template") ||
      userMessage.toLowerCase().includes("format") ||
      userMessage.toLowerCase().includes("notice") ||
      userMessage.toLowerCase().includes("complaint") ||
      userMessage.toLowerCase().includes("application") ||
      userMessage.toLowerCase().includes("petition") ||
      userMessage.toLowerCase().includes("affidavit") ||
      userMessage.toLowerCase().includes("agreement") ||
      userMessage.toLowerCase().includes("generate document") ||
      userMessage.toLowerCase().includes("create document") ||
      userMessage.toLowerCase().includes("prepare document")

    const documents: Array<{ name: string; content: string }> = []

    if (shouldGenerateDoc) {
      console.log("[LexCore] Attempting to generate document")
      const generatedDoc = await generateLegalDocument(
        userMessage,
        history || messages || [],
        languageName,
        category,
      )
      if (generatedDoc) {
        documents.push(generatedDoc)
        console.log("[LexCore] Document generated:", generatedDoc.name)
      }
    }

    console.log("[LexCore] Sending response with", legalReferences.length, "Indian Kanoon sources")

    return NextResponse.json({
      role: "assistant",
      content: responseText,
      response: responseText,
      legalReferences: legalReferences.length > 0 ? legalReferences : undefined,
      documents: documents.length > 0 ? documents : undefined,
      metadata: {
        sourcesUsed: legalReferences.length,
        citationSource: legalReferences.length > 0 ? "indiankanoon-api" : "gemini-knowledge",
        language: languageName,
        category: category || "General",
        timestamp: new Date().toISOString(),
        queryType: isCasual ? "casual" : "legal",
      },
    })
  } catch (error) {
    console.error("[LexCore] Chat API error:", error)
    return NextResponse.json(
      {
        role: "assistant",
        content: "Failed to process your request. Please try again.",
        error: "Failed to process your request. Please try again.",
      },
      { status: 500 },
    )
  }
}
