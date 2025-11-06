export interface ChatThread {
  id: string
  title: string
  messages: Array<{
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: string
    documents?: Array<{ name: string; content: string }>
    legalReferences?: any[]
  }>
  language: string
  category?: string
  createdAt: string
  updatedAt: string
}

export interface UserData {
  name: string
  email: string
  phone?: string
  createdAt: string
}

export const storage = {
  // User management
  getUser: (): UserData | null => {
    if (typeof window === "undefined") return null
    const data = localStorage.getItem("nyaysetu_user")
    return data ? JSON.parse(data) : null
  },

  setUser: (user: UserData) => {
    if (typeof window === "undefined") return
    localStorage.setItem("nyaysetu_user", JSON.stringify(user))
  },

  removeUser: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem("nyaysetu_user")
    localStorage.removeItem("auth_token")
  },

  // Chat threads management
  getThreads: (): ChatThread[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem("chat_threads")
    return data ? JSON.parse(data) : []
  },

  saveThread: (thread: ChatThread) => {
    if (typeof window === "undefined") return
    const threads = storage.getThreads()
    const existingIndex = threads.findIndex((t) => t.id === thread.id)

    if (existingIndex >= 0) {
      threads[existingIndex] = { ...thread, updatedAt: new Date().toISOString() }
    } else {
      threads.unshift(thread)
    }

    // Keep only last 50 threads
    const trimmed = threads.slice(0, 50)
    localStorage.setItem("chat_threads", JSON.stringify(trimmed))
  },

  getThread: (id: string): ChatThread | null => {
    const threads = storage.getThreads()
    return threads.find((t) => t.id === id) || null
  },

  deleteThread: (id: string) => {
    if (typeof window === "undefined") return
    const threads = storage.getThreads().filter((t) => t.id !== id)
    localStorage.setItem("chat_threads", JSON.stringify(threads))
  },

  // Preferences
  getPreferences: () => {
    if (typeof window === "undefined") return { language: "en", theme: "system" }
    const data = localStorage.getItem("user_preferences")
    return data ? JSON.parse(data) : { language: "en", theme: "system" }
  },

  setPreferences: (prefs: { language?: string; theme?: string }) => {
    if (typeof window === "undefined") return
    const current = storage.getPreferences()
    localStorage.setItem("user_preferences", JSON.stringify({ ...current, ...prefs }))
  },

  export interface LegalReference {
  caseNumber: number
  title: string
  court: string
  url: string
  snippet: string
  docId: string
  date?: string
  citations?: string[]
},

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  language?: string
  documents?: Array<{ name: string; content: string }>
  legalReferences?: LegalReference[]
},
}
