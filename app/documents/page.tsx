"use client"

import * as React from "react"
import { Upload, FileText, Download, Loader2, Search, Eye, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DOCUMENT_TYPES } from "@/lib/data"

interface UploadedDocument {
  id: string
  name: string
  type: string
  size: number
  uploadDate: Date
  analysis?: {
    summary: string
    keyPoints: string[]
    legalIssues: string[]
    recommendations: string[]
  }
}

export default function DocumentsPage() {
  const [documents, setDocuments] = React.useState<UploadedDocument[]>([])
  const [isUploading, setIsUploading] = React.useState(false)
  const [isAnalyzing, setIsAnalyzing] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedDoc, setSelectedDoc] = React.useState<UploadedDocument | null>(null)
  const [showAnalysis, setShowAnalysis] = React.useState(false)
  const [showGenerator, setShowGenerator] = React.useState(false)
  const [generatorForm, setGeneratorForm] = React.useState({
    type: "",
    details: "",
    language: "en",
  })
  const [isGenerating, setIsGenerating] = React.useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/documents/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Upload failed")

        const data = await response.json()

        const newDoc: UploadedDocument = {
          id: data.id,
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date(),
        }

        setDocuments((prev) => [newDoc, ...prev])
      }
    } catch (error) {
      console.error("[v0] Upload error:", error)
      alert("Failed to upload document. Please try again.")
    } finally {
      setIsUploading(false)
      e.target.value = ""
    }
  }

  const analyzeDocument = async (doc: UploadedDocument) => {
    setIsAnalyzing(doc.id)

    try {
      const response = await fetch("/api/documents/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: doc.id, documentName: doc.name }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()

      setDocuments((prev) =>
        prev.map((d) =>
          d.id === doc.id
            ? {
                ...d,
                analysis: data.analysis,
              }
            : d,
        ),
      )

      setSelectedDoc({ ...doc, analysis: data.analysis })
      setShowAnalysis(true)
    } catch (error) {
      console.error("[v0] Analysis error:", error)
      alert("Failed to analyze document. Please try again.")
    } finally {
      setIsAnalyzing(null)
    }
  }

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  const generateDocument = async () => {
    if (!generatorForm.type || !generatorForm.details) {
      alert("Please fill in all fields")
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generatorForm),
      })

      if (!response.ok) throw new Error("Generation failed")

      const data = await response.json()

      // Download the generated document
      const blob = new Blob([data.content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = data.filename
      a.click()
      URL.revokeObjectURL(url)

      setShowGenerator(false)
      setGeneratorForm({ type: "", details: "", language: "en" })
    } catch (error) {
      console.error("[v0] Generation error:", error)
      alert("Failed to generate document. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const filteredDocs = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Document Center</h1>
          <p className="text-muted-foreground mt-1">Upload, analyze, and generate legal documents</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowGenerator(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Generate Document
          </Button>
          <Button variant="outline" asChild className="relative bg-transparent">
            <label>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.doc,.docx,.txt"
              />
            </label>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="uploaded" className="space-y-6">
        <TabsList>
          <TabsTrigger value="uploaded">My Documents</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="uploaded" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {isUploading && (
            <Card>
              <CardContent className="p-6 flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm text-muted-foreground">Uploading documents...</span>
              </CardContent>
            </Card>
          )}

          {filteredDocs.length === 0 && !isUploading && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No documents yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload your legal documents to get started</p>
                <Button variant="outline" asChild>
                  <label>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                    />
                  </label>
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc) => (
              <Card key={doc.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-primary" />
                    <Button variant="ghost" size="icon" onClick={() => deleteDocument(doc.id)} className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-base line-clamp-2">{doc.name}</CardTitle>
                  <CardDescription>
                    {formatFileSize(doc.size)} • {doc.uploadDate.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {doc.analysis && (
                    <Badge variant="secondary" className="mb-2">
                      Analyzed
                    </Badge>
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => analyzeDocument(doc)}
                      disabled={isAnalyzing === doc.id}
                    >
                      {isAnalyzing === doc.id ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Analyzing
                        </>
                      ) : (
                        <>
                          <Search className="h-3 w-3 mr-1" />
                          Analyze
                        </>
                      )}
                    </Button>
                    {doc.analysis && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedDoc(doc)
                          setShowAnalysis(true)
                        }}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENT_TYPES.map((template) => (
              <Card key={template.id} className="hover:border-primary transition-colors cursor-pointer">
                <CardHeader>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription>Professional template ready to customize</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => {
                      setGeneratorForm({ ...generatorForm, type: template.id })
                      setShowGenerator(true)
                    }}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Analysis Dialog */}
      <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Document Analysis</DialogTitle>
            <DialogDescription>{selectedDoc?.name}</DialogDescription>
          </DialogHeader>
          {selectedDoc?.analysis && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedDoc.analysis.summary}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Key Points</h3>
                <ul className="space-y-2">
                  {selectedDoc.analysis.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Legal Issues Identified</h3>
                <ul className="space-y-2">
                  {selectedDoc.analysis.legalIssues.map((issue, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  {selectedDoc.analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Document Generator Dialog */}
      <Dialog open={showGenerator} onOpenChange={setShowGenerator}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate Legal Document</DialogTitle>
            <DialogDescription>Fill in the details to generate a customized legal document</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doc-type">Document Type</Label>
              <Select
                value={generatorForm.type}
                onValueChange={(value) => setGeneratorForm({ ...generatorForm, type: value })}
              >
                <SelectTrigger id="doc-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={generatorForm.language}
                onValueChange={(value) => setGeneratorForm({ ...generatorForm, language: value })}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Case Details</Label>
              <Textarea
                id="details"
                placeholder="Describe your case, include names, dates, and relevant details..."
                value={generatorForm.details}
                onChange={(e) => setGeneratorForm({ ...generatorForm, details: e.target.value })}
                className="min-h-[150px]"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowGenerator(false)} disabled={isGenerating}>
                Cancel
              </Button>
              <Button onClick={generateDocument} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
