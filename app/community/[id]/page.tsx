"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ThumbsUp, MessageSquare, User, Clock, CheckCircle2, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface Reply {
  id: string
  author: string
  content: string
  createdAt: Date
  upvotes: number
  isHelpful: boolean
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [replyText, setReplyText] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [replies, setReplies] = React.useState<Reply[]>([
    {
      id: "1",
      author: "Legal Expert",
      content:
        "You can file an RTI application online through the RTI portal (rtionline.gov.in) or offline by submitting it to the Public Information Officer (PIO) of your municipal office. The process typically takes 30 days. You'll need to pay a nominal fee of ₹10.",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      upvotes: 15,
      isHelpful: true,
    },
    {
      id: "2",
      author: "Priya Sharma",
      content:
        "I recently filed an RTI for similar documents. Make sure to be very specific about what information you need. Include property address, survey numbers, and the time period. This helps get accurate responses.",
      createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
      upvotes: 8,
      isHelpful: false,
    },
    {
      id: "3",
      author: "Amit Kumar",
      content:
        "Also, keep a copy of your RTI application and the receipt. If you don't get a response within 30 days, you can file a first appeal with the First Appellate Authority of that department.",
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      upvotes: 12,
      isHelpful: true,
    },
  ])

  // Mock post data
  const post = {
    id: params.id,
    title: "How to file an RTI application for property documents?",
    content:
      "I need to get copies of property documents from the municipal office. What is the process for filing an RTI application? How long does it take? Are there any specific formats I need to follow? Also, what fee do I need to pay?",
    author: "Rajesh Kumar",
    category: "RTI Application",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    upvotes: 24,
    isResolved: true,
  }

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newReply: Reply = {
      id: Date.now().toString(),
      author: "Current User",
      content: replyText,
      createdAt: new Date(),
      upvotes: 0,
      isHelpful: false,
    }

    setReplies((prev) => [...prev, newReply])
    setReplyText("")
    setIsSubmitting(false)
  }

  const handleUpvote = (replyId: string) => {
    setReplies((prev) => prev.map((reply) => (reply.id === replyId ? { ...reply, upvotes: reply.upvotes + 1 } : reply)))
  }

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return "just now"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="container py-8 max-w-4xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Community
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="secondary">{post.category}</Badge>
            {post.isResolved && (
              <Badge variant="default" className="bg-green-500/10 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Resolved
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">{post.content}</p>

          <Separator />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{getTimeAgo(post.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.upvotes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{replies.length}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{replies.length} Replies</h2>
        </div>

        <div className="space-y-4">
          {replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">{reply.author}</span>
                      {reply.isHelpful && (
                        <Badge variant="default" className="bg-green-500/10 text-green-700 dark:text-green-400 text-xs">
                          Helpful
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{getTimeAgo(reply.createdAt)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reply.content}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpvote(reply.id)}
                    className="h-8 gap-1 hover:text-primary"
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span className="text-xs">{reply.upvotes}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Your Reply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share your experience or advice..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitReply} disabled={!replyText.trim() || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Post Reply
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
