"use client"

import * as React from "react"
import { Send, Loader2, Languages, FileText, Download, Volume2, VolumeX, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SUPPORTED_LANGUAGES, QUICK_REPLIES, LEGAL_CATEGORIES } from "@/lib/data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { VoiceInput } from "@/components/voice-input"
import { FormattedResponse } from "@/components/formatted-response"
import { LegalReferences } from "@/components/legal-references"
import {
  type ChatMessage,
  type ChatThread,
  loadChats,
  saveChats,
  createNewChat,
  addMessageToChat,
  deleteChat,
} from "@/lib/chat-storage"

export default function ChatPage() {
  const [currentThread, setCurrentThread] = React.useState<ChatThread | null>(null)
  const [threads, setThreads] = React.useState<ChatThread[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedLanguage, setSelectedLanguage] = React.useState("en")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("")
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Load chats from localStorage on mount
  React.useEffect(() => {
    const savedChats = loadChats()
    setThreads(savedChats)
    if (savedChats.length > 0) {
      setCurrentThread(savedChats[0])
      setSelectedLanguage(savedChats[0].language)
    } else {
      const newChat = createNewChat("en")
      setCurrentThread(newChat)
      setThreads([newChat])
      saveChats([newChat])
    }
  }, [])

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [threads])

  // Add welcome message to new chats
  React.useEffect(() => {
    if (currentThread && currentThread.messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content:
          "Namaste! 🙏 I'm your AI legal assistant,How can I assist you today",
        timestamp: new Date(),
      }
      addMessageToChat(currentThread.id, welcomeMessage)
      const updatedChats = loadChats()
      setThreads(updatedChats)
      const updated = updatedChats.find((t) => t.id === currentThread.id)
      if (updated) setCurrentThread(updated)
    }
  }, [currentThread])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !currentThread) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      language: selectedLanguage,
    }

    addMessageToChat(currentThread.id, userMessage)
    const updatedChats = loadChats()
    setThreads(updatedChats)
    const updated = updatedChats.find((t) => t.id === currentThread.id)
    if (updated) setCurrentThread(updated)

    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          language: selectedLanguage,
          category: selectedCategory,
          history: currentThread.messages.slice(-5),
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        documents: data.documents,
        legalReferences: data.legalReferences,
      }

      addMessageToChat(currentThread.id, assistantMessage)
      const finalChats = loadChats()
      setThreads(finalChats)
      const finalUpdated = finalChats.find((t) => t.id === currentThread.id)
      if (finalUpdated) setCurrentThread(finalUpdated)
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again or rephrase your question.",
        timestamp: new Date(),
      }
      addMessageToChat(currentThread.id, errorMessage)
      const errorChats = loadChats()
      setThreads(errorChats)
      const errorUpdated = errorChats.find((t) => t.id === currentThread.id)
      if (errorUpdated) setCurrentThread(errorUpdated)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (reply: string) => {
    setInput(reply)
  }

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = selectedLanguage === "en" ? "en-IN" : `${selectedLanguage}-IN`
        utterance.onend = () => setIsSpeaking(false)
        window.speechSynthesis.speak(utterance)
        setIsSpeaking(true)
      }
    }
  }

  const downloadDocument = (name: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript)
  }

  const handleNewChat = () => {
    const newChat = createNewChat(selectedLanguage, selectedCategory)
    const updatedThreads = [newChat, ...threads]
    setThreads(updatedThreads)
    setCurrentThread(newChat)
    saveChats(updatedThreads)
  }

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId)
    const updatedThreads = loadChats()
    setThreads(updatedThreads)
    if (currentThread?.id === chatId) {
      if (updatedThreads.length > 0) {
        setCurrentThread(updatedThreads[0])
      } else {
        const newChat = createNewChat("en")
        setCurrentThread(newChat)
        setThreads([newChat])
        saveChats([newChat])
      }
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar with chat threads */}
      <div className="hidden md:flex w-64 border-r flex-col">
        <div className="p-4 border-b">
          <Button onClick={handleNewChat} className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={`p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors group ${
                  currentThread?.id === thread.id ? "bg-muted" : ""
                }`}
                onClick={() => setCurrentThread(thread)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{thread.title}</p>
                    <p className="text-xs text-muted-foreground">{thread.messages.length} messages</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteChat(thread.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-muted/30 px-4 py-3">
          <div className="container max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-lg font-semibold">Legal AI Assistant</h1>
              <p className="text-sm text-muted-foreground">Ask anything about Indian law</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[160px]">
                  <Languages className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.nativeLabel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory || "default"} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Legal Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">All Categories</SelectItem>
                  {LEGAL_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full" ref={scrollRef}>
            <div className="container max-w-5xl mx-auto py-6 px-4 space-y-6">
              {currentThread && currentThread.messages.length === 1 && (
                <div className="space-y-4 mb-6 text-center">
                  <p className="text-sm text-muted-foreground">Quick questions to get started:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {QUICK_REPLIES.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {currentThread?.messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] space-y-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <Card className={message.role === "user" ? "bg-primary text-primary-foreground" : ""}>
                      <CardContent className="p-4">
                        {message.role === "assistant" ? (
                          <FormattedResponse content={message.content} />
                        ) : (
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        )}
                      </CardContent>
                    </Card>

                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 px-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSpeak(message.content)}
                          className="h-7 text-xs"
                        >
                          {isSpeaking ? <VolumeX className="h-3 w-3 mr-1" /> : <Volume2 className="h-3 w-3 mr-1" />}
                          {isSpeaking ? "Stop" : "Listen"}
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    )}

                    {/* NEW: Use LegalReferences component */}
                    {message.legalReferences && message.legalReferences.length > 0 && (
                      <LegalReferences references={message.legalReferences} />
                    )}

                    {message.documents && message.documents.length > 0 && (
                      <Card className="bg-muted/50 border-green-200 dark:border-green-900">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-semibold">Generated Documents</span>
                          </div>
                          <Separator />
                          {message.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{doc.name}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => downloadDocument(doc.name, doc.content)}
                                className="h-8"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Analyzing your query...</span>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="border-t bg-background p-4">
          <form onSubmit={handleSubmit} className="container max-w-5xl mx-auto">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your legal question..."
                className="min-h-[60px] max-h-[200px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <div className="flex flex-col gap-2">
                <VoiceInput onTranscript={handleVoiceTranscript} disabled={isLoading} />
                <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
