export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  language?: string
  documents?: Array<{ name: string; content: string }>
  legalReferences?: Array<{ title: string; url: string; snippet: string }>
}

export interface ChatThread {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
  language: string
  category?: string
}

const STORAGE_KEY = "lexcore_chats"

export function saveChats(chats: ChatThread[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
  }
}

export function loadChats(): ChatThread[] {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const chats = JSON.parse(stored)
      return chats.map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }))
    }
  }
  return []
}

export function createNewChat(language: string, category?: string): ChatThread {
  return {
    id: Date.now().toString(),
    title: "New Chat",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    language,
    category,
  }
}

export function updateChatTitle(chatId: string, title: string): void {
  const chats = loadChats()
  const chat = chats.find((c) => c.id === chatId)
  if (chat) {
    chat.title = title
    chat.updatedAt = new Date()
    saveChats(chats)
  }
}

export function addMessageToChat(chatId: string, message: ChatMessage): void {
  const chats = loadChats()
  const chat = chats.find((c) => c.id === chatId)
  if (chat) {
    chat.messages.push(message)
    chat.updatedAt = new Date()
    if (chat.messages.length === 2 && message.role === "user") {
      chat.title = message.content.substring(0, 50) + (message.content.length > 50 ? "..." : "")
    }
    saveChats(chats)
  }
}

export function deleteChat(chatId: string): void {
  const chats = loadChats()
  const filtered = chats.filter((c) => c.id !== chatId)
  saveChats(filtered)
}
