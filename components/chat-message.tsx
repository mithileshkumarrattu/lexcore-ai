"use client"

import * as React from "react"
import { Bot, User, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { VoiceOutput } from "@/components/voice-input"
import type { ChatMessageProps } from "@/types/chat-message" // Added import for ChatMessageProps

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      {message.role === "assistant" && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
      )}

      <Card className={`max-w-[80%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
        <div className="p-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap leading-relaxed m-0">{message.content}</p>
          </div>

          {message.role === "assistant" && (
            <div className="flex gap-1 mt-3 pt-3 border-t border-border/50">
              <VoiceOutput text={message.content} />
              <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy message</span>
              </Button>
            </div>
          )}
        </div>
      </Card>

      {message.role === "user" && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  )
}
