"use client"

import * as React from "react"
import Link from "next/link"
import { MessageSquare, ThumbsUp, Clock, User, Plus, Search, TrendingUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LEGAL_CATEGORIES } from "@/lib/data"

interface Post {
  id: string
  title: string
  content: string
  author: string
  category: string
  createdAt: Date
  upvotes: number
  replies: number
  isResolved: boolean
}

// Mock data for demonstration
const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "How to file an RTI application for property documents?",
    content:
      "I need to get copies of property documents from the municipal office. What is the process for filing an RTI application? How long does it take?",
    author: "Rajesh Kumar",
    category: "RTI Application",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    upvotes: 24,
    replies: 8,
    isResolved: true,
  },
  {
    id: "2",
    title: "Consumer complaint against online shopping fraud",
    content:
      "I ordered a product online but received a damaged item. The seller is not responding. Can I file a consumer complaint? What documents do I need?",
    author: "Priya Sharma",
    category: "Consumer Rights",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    upvotes: 18,
    replies: 12,
    isResolved: false,
  },
  {
    id: "3",
    title: "Landlord not returning security deposit - what are my options?",
    content:
      "My landlord is refusing to return my security deposit even after 3 months of vacating. What legal action can I take? Do I need a lawyer?",
    author: "Amit Patel",
    category: "Property Disputes",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    upvotes: 32,
    replies: 15,
    isResolved: false,
  },
  {
    id: "4",
    title: "Cyberbullying on social media - how to file a complaint?",
    content:
      "Someone is posting defamatory content about me on social media. I have screenshots. How do I file a cybercrime complaint? Which police station should I approach?",
    author: "Neha Singh",
    category: "Cybercrime",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    upvotes: 45,
    replies: 20,
    isResolved: true,
  },
  {
    id: "5",
    title: "Salary not paid for 2 months - labour law question",
    content:
      "My employer has not paid salary for the last 2 months. I have all appointment letters and salary slips. What should I do? Can I approach labour court?",
    author: "Vikram Reddy",
    category: "Labour Rights",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    upvotes: 56,
    replies: 18,
    isResolved: false,
  },
  {
    id: "6",
    title: "Divorce proceedings - mutual consent process",
    content:
      "My spouse and I have decided to separate mutually. What is the process for mutual consent divorce? How long does it take? What documents are needed?",
    author: "Anonymous User",
    category: "Family Law",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    upvotes: 28,
    replies: 22,
    isResolved: true,
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = React.useState<Post[]>(MOCK_POSTS)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [sortBy, setSortBy] = React.useState<string>("recent")

  const filteredPosts = React.useMemo(() => {
    let filtered = posts

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Sort posts
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "recent") {
        return b.createdAt.getTime() - a.createdAt.getTime()
      } else if (sortBy === "popular") {
        return b.upvotes - a.upvotes
      } else if (sortBy === "replies") {
        return b.replies - a.replies
      }
      return 0
    })

    return filtered
  }, [posts, searchQuery, selectedCategory, sortBy])

  const handleUpvote = (postId: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post)))
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

  const trendingTopics = [
    { name: "RTI Applications", count: 45 },
    { name: "Consumer Rights", count: 38 },
    { name: "Property Disputes", count: 32 },
    { name: "Labour Rights", count: 28 },
  ]

  return (
    <div className="container py-8">
      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Community Forum</h1>
              <p className="text-muted-foreground mt-1">Share experiences and get help from the community</p>
            </div>
            <Button asChild>
              <Link href="/community/new">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {LEGAL_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="replies">Most Replies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary">{post.category}</Badge>
                          {post.isResolved && (
                            <Badge variant="default" className="bg-green-500/10 text-green-700 dark:text-green-400">
                              Resolved
                            </Badge>
                          )}
                        </div>
                        <Link href={`/community/${post.id}`}>
                          <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                            {post.title}
                          </CardTitle>
                        </Link>
                        <CardDescription className="line-clamp-2 leading-relaxed">{post.content}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
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
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpvote(post.id)}
                          className="h-8 gap-1 hover:text-primary"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.upvotes}</span>
                        </Button>
                        <Link href={`/community/${post.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 gap-1 hover:text-primary">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredPosts.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No posts found</h3>
                    <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filters</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="unresolved" className="space-y-4">
              {filteredPosts
                .filter((post) => !post.isResolved)
                .map((post) => (
                  <Card key={post.id} className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <Link href={`/community/${post.id}`}>
                            <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                              {post.title}
                            </CardTitle>
                          </Link>
                          <CardDescription className="line-clamp-2 leading-relaxed">{post.content}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
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
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpvote(post.id)}
                            className="h-8 gap-1 hover:text-primary"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.upvotes}</span>
                          </Button>
                          <Link href={`/community/${post.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 hover:text-primary">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.replies}</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              {filteredPosts
                .filter((post) => post.isResolved)
                .map((post) => (
                  <Card key={post.id} className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            <Badge variant="default" className="bg-green-500/10 text-green-700 dark:text-green-400">
                              Resolved
                            </Badge>
                          </div>
                          <Link href={`/community/${post.id}`}>
                            <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                              {post.title}
                            </CardTitle>
                          </Link>
                          <CardDescription className="line-clamp-2 leading-relaxed">{post.content}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
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
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpvote(post.id)}
                            className="h-8 gap-1 hover:text-primary"
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.upvotes}</span>
                          </Button>
                          <Link href={`/community/${post.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 hover:text-primary">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.replies}</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{topic.name}</span>
                  <Badge variant="secondary">{topic.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="leading-relaxed">Be respectful and helpful to others</p>
              <p className="leading-relaxed">Share accurate information only</p>
              <p className="leading-relaxed">Protect privacy - no personal details</p>
              <p className="leading-relaxed">Report inappropriate content</p>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Need Expert Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 text-primary-foreground/90 leading-relaxed">
                Get instant AI-powered legal guidance
              </p>
              <Button variant="secondary" asChild className="w-full">
                <Link href="/chat">Chat with AI</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
