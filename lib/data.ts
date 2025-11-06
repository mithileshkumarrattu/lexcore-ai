// Static data for LexCore AI

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം" },
  { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ" },
]

export const LEGAL_CATEGORIES = [
  "Consumer Rights",
  "Property Disputes",
  "Family Law",
  "Criminal Law",
  "Labour Rights",
  "Cybercrime",
  "RTI Application",
  "Legal Notice",
  "Police Complaint",
  "Other",
]

export const DOCUMENT_TYPES = [
  { id: "legal-notice", name: "Legal Notice", icon: "FileText" },
  { id: "consumer-complaint", name: "Consumer Complaint", icon: "ShoppingCart" },
  { id: "rti-application", name: "RTI Application", icon: "Info" },
  { id: "police-complaint", name: "Police Complaint", icon: "Shield" },
  { id: "affidavit", name: "Affidavit", icon: "FileCheck" },
]

export const QUICK_REPLIES = [
  "How do I file an RTI application?",
  "What are my rights in a cyberbullying case?",
  "Help me file a police complaint",
  "Consumer complaint process",
  "Legal aid schemes in India",
  "How to send a legal notice?",
]

export const LEGAL_SCHEMES = [
  {
    name: "National Legal Services Authority (NALSA)",
    description: "Free legal aid for eligible citizens",
    eligibility: "Women, children, SC/ST, disabled persons, victims of trafficking, etc.",
  },
  {
    name: "State Legal Services Authority",
    description: "State-level legal aid services",
    eligibility: "Based on income and social criteria",
  },
  {
    name: "District Legal Services Authority",
    description: "District-level legal aid and Lok Adalats",
    eligibility: "Local residents meeting criteria",
  },
]

export const FAQS = [
  {
    question: "Is LexCore AI a replacement for a lawyer?",
    answer:
      "No, LexCore AI provides legal information and guidance but is not a substitute for professional legal advice. For complex cases, we recommend consulting a qualified lawyer.",
  },
  {
    question: "How accurate is the AI?",
    answer:
      "Our AI is trained on Indian legal databases and provides information based on current laws. However, always verify critical information with legal professionals.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take privacy seriously. Your conversations and documents are encrypted and never shared with third parties.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "We support English and 10 major Indian languages: Hindi, Telugu, Bengali, Marathi, Tamil, Gujarati, Kannada, Malayalam, and Punjabi.",
  },
]

// BNS 2023 sections (sample - expand as needed)
export const legalInformation = {
  bns2023: {
    sections: [
      {
        number: "1",
        title: "Title and extent of operation of the Code",
        description: "This Act may be called the Bharatiya Nyaya Sanhita, 2023.",
      },
      // Add more sections as needed
    ],
  },
}
