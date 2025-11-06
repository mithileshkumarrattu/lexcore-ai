// components/legal-references.tsx

import { ExternalLink, Scale } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LegalReference {
  caseNumber: number
  title: string
  court: string
  url: string
  snippet: string
  docId: string
  date?: string
}

interface LegalReferencesProps {
  references: LegalReference[]
}

export function LegalReferences({ references }: LegalReferencesProps) {
  if (!references || references.length === 0) {
    return null
  }

  return (
    <Card className="mt-4 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Legal Sources Referenced</CardTitle>
        </div>
        <CardDescription className="text-xs">
          {references.length} case{references.length > 1 ? "s" : ""} from Indian Kanoon
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {references.map((ref) => (
          <div key={ref.docId} className="rounded-lg border border-border/50 p-3 space-y-2 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs shrink-0">
                    Case {ref.caseNumber}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{ref.court}</span>
                </div>
                <h4 className="font-medium text-sm leading-tight mb-1 line-clamp-2">{ref.title}</h4>
                {ref.date && <p className="text-xs text-muted-foreground">Date: {ref.date}</p>}
              </div>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                title="View on Indian Kanoon"
              >
                <ExternalLink className="h-4 w-4 text-primary" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{ref.snippet}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
