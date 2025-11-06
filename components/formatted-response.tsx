"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, IndianRupee, FileText, AlertTriangle, Lightbulb, Scale, CheckCircle2, ArrowRight } from "lucide-react"

interface ParsedResponse {
  summary: string[]
  steps: string[]
  documents: string[]
  fees: string[]
  timeline: string[]
  warnings: string[]
  tips: string[]
  rights: string[]
}

function parseMarkdown(text: string): React.ReactNode {
  // Handle bold text **text**
  const parts = text.split(/(\*\*.*?\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

function parseResponse(content: string): ParsedResponse {
  const lines = content.split("\n").filter((line) => line.trim())

  const parsed: ParsedResponse = {
    summary: [],
    steps: [],
    documents: [],
    fees: [],
    timeline: [],
    warnings: [],
    tips: [],
    rights: [],
  }

  let currentSection: keyof ParsedResponse | null = null

  for (const line of lines) {
    const lower = line.toLowerCase()

    // Detect section headers
    if (lower.includes("step") && (lower.includes(":") || /\d/.test(line))) {
      currentSection = "steps"
      parsed.steps.push(line.trim())
    } else if (
      lower.includes("document") ||
      lower.includes("paper") ||
      lower.includes("certificate") ||
      lower.includes("proof")
    ) {
      currentSection = "documents"
      if (!lower.includes("required documents:")) {
        parsed.documents.push(line.trim())
      }
    } else if (lower.includes("fee") || lower.includes("cost") || lower.includes("₹") || lower.includes("rupee")) {
      currentSection = "fees"
      parsed.fees.push(line.trim())
    } else if (
      lower.includes("timeline") ||
      lower.includes("duration") ||
      lower.includes("days") ||
      lower.includes("weeks") ||
      lower.includes("months")
    ) {
      currentSection = "timeline"
      parsed.timeline.push(line.trim())
    } else if (
      lower.includes("important") ||
      lower.includes("warning") ||
      lower.includes("note") ||
      lower.includes("remember") ||
      lower.includes("caution")
    ) {
      currentSection = "warnings"
      parsed.warnings.push(line.trim())
    } else if (
      lower.includes("tip") ||
      lower.includes("advice") ||
      lower.includes("recommend") ||
      lower.includes("suggest") ||
      lower.includes("helpful")
    ) {
      currentSection = "tips"
      parsed.tips.push(line.trim())
    } else if (
      lower.includes("right") ||
      lower.includes("entitle") ||
      lower.includes("legal protection") ||
      lower.includes("can file") ||
      lower.includes("can report")
    ) {
      currentSection = "rights"
      parsed.rights.push(line.trim())
    } else if (currentSection) {
      // Continue adding to current section
      if (line.trim().match(/^[\d\-•*]/)) {
        parsed[currentSection].push(line.trim())
      }
    } else {
      // Add to summary if no section detected
      if (line.trim().length > 20) {
        parsed.summary.push(line.trim())
      }
    }
  }

  return parsed
}

export function FormattedResponse({ content }: { content: string }) {
  const parsed = parseResponse(content)

  return (
    <div className="space-y-4">
      {/* Summary */}
      {parsed.summary.length > 0 && (
        <div className="space-y-2">
          {parsed.summary.map((line, i) => (
            <p key={i} className="text-sm leading-relaxed">
              {parseMarkdown(line)}
            </p>
          ))}
        </div>
      )}

      {/* Steps */}
      {parsed.steps.length > 0 && (
        <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Action Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {parsed.steps.slice(0, 6).map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  {parseMarkdown(step.replace(/^(Step \d+:|[\d\-•*]\s*)/, ""))}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Documents Required */}
      {parsed.documents.length > 0 && (
        <Card className="border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {parsed.documents.slice(0, 8).map((doc, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100"
                >
                  {doc.replace(/^[\d\-•*]\s*/, "").replace(/\*\*/g, "")}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {/* Fees & Costs */}
        {parsed.fees.length > 0 && (
          <Card className="border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
                Fees & Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {parsed.fees.slice(0, 4).map((fee, i) => (
                <p key={i} className="text-sm leading-relaxed">
                  {parseMarkdown(fee.replace(/^[\d\-•*]\s*/, ""))}
                </p>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Timeline */}
        {parsed.timeline.length > 0 && (
          <Card className="border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {parsed.timeline.slice(0, 4).map((time, i) => (
                <p key={i} className="text-sm leading-relaxed">
                  {parseMarkdown(time.replace(/^[\d\-•*]\s*/, ""))}
                </p>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Important Notes */}
      {parsed.warnings.length > 0 && (
        <Card className="border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {parsed.warnings.slice(0, 4).map((warning, i) => (
              <p key={i} className="text-sm leading-relaxed">
                {parseMarkdown(warning.replace(/^(Important:|Note:|Warning:|[\d\-•*]\s*)/, ""))}
              </p>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Helpful Tips */}
      {parsed.tips.length > 0 && (
        <Card className="border-cyan-200 dark:border-cyan-900 bg-cyan-50/50 dark:bg-cyan-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              Helpful Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {parsed.tips.slice(0, 4).map((tip, i) => (
              <p key={i} className="text-sm leading-relaxed">
                {parseMarkdown(tip.replace(/^(Tip:|Advice:|[\d\-•*]\s*)/, ""))}
              </p>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Your Legal Rights */}
      {parsed.rights.length > 0 && (
        <Card className="border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Your Legal Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {parsed.rights.slice(0, 4).map((right, i) => (
              <p key={i} className="text-sm leading-relaxed">
                {parseMarkdown(right.replace(/^(Your Rights:|Rights:|[\d\-•*]\s*)/, ""))}
              </p>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
