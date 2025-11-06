// lib/indiankanoon-client.ts

import type {
  SearchResponse,
  DocumentResponse,
  DocumentFragmentResponse,
  DocumentMetaResponse,
} from "./types/indiankanoon"

const INDIAN_KANOON_BASE_URL="http://api.indiankanoon.org"
const API_TOKEN="fc9051c78a9a5b6829efeb5ecdfcc3744472b727"

interface SearchOptions {
  formInput: string
  pagenum?: number
  maxpages?: number
  doctypes?: string
  fromdate?: string
  todate?: string
  title?: string
  cite?: string
  author?: string
  bench?: string
  maxcites?: number
}

interface DocumentOptions {
  maxcites?: number
  maxcitedby?: number
}

class IndianKanoonClient {
  private apiToken: string
  private baseUrl: string

  constructor(apiToken: string, baseUrl: string = INDIAN_KANOON_BASE_URL) {
    if (!apiToken) {
      console.warn("[IndianKanoon] WARNING: No API token provided. Indian Kanoon features will not work.")
    }
    this.apiToken = apiToken
    this.baseUrl = baseUrl
  }

  private async fetchAPI<T>(endpoint: string): Promise<T> {
    // If no API token, return empty response
    if (!this.apiToken) {
      console.warn("[IndianKanoon] Skipping request - no API token configured")
      throw new Error("Indian Kanoon API token not configured")
    }

    const url = `${this.baseUrl}${endpoint}`

    console.log("[IndianKanoon] Fetching:", url)
    console.log("[IndianKanoon] Using token:", this.apiToken.substring(0, 10) + "...")

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Token ${this.apiToken}`,
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
      })

      if (!response.ok) {
        const errorText = await response.text()
        
        if (response.status === 401) {
          console.error("[IndianKanoon] AUTHENTICATION FAILED - Invalid or expired API key")
          console.error("[IndianKanoon] Please check your INDIAN_KANOON_API_KEY in .env.local")
        }
        
        console.error("[IndianKanoon] API Error:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
          url,
        })
        
        throw new Error(
          `Indian Kanoon API error: ${response.status} ${response.statusText}`,
        )
      }

      const data = await response.json()
      console.log("[IndianKanoon] Success:", {
        endpoint,
        dataKeys: Object.keys(data),
        docsCount: data.docs?.length || 0,
      })

      return data
    } catch (error) {
      console.error("[IndianKanoon] Fetch error:", error)
      throw error
    }
  }

  async search(options: SearchOptions): Promise<SearchResponse> {
    const params = new URLSearchParams({
      formInput: options.formInput,
      pagenum: (options.pagenum || 0).toString(),
    })

    if (options.maxpages) params.append("maxpages", options.maxpages.toString())
    if (options.doctypes) params.append("doctypes", options.doctypes)
    if (options.fromdate) params.append("fromdate", options.fromdate)
    if (options.todate) params.append("todate", options.todate)
    if (options.title) params.append("title", options.title)
    if (options.cite) params.append("cite", options.cite)
    if (options.author) params.append("author", options.author)
    if (options.bench) params.append("bench", options.bench)
    if (options.maxcites) params.append("maxcites", options.maxcites.toString())

    return this.fetchAPI<SearchResponse>(`/search/?${params.toString()}`)
  }

  async getDocument(docId: string, options?: DocumentOptions): Promise<DocumentResponse> {
    const params = new URLSearchParams()

    if (options?.maxcites) params.append("maxcites", options.maxcites.toString())
    if (options?.maxcitedby) params.append("maxcitedby", options.maxcitedby.toString())

    const queryString = params.toString() ? `?${params.toString()}` : ""

    return this.fetchAPI<DocumentResponse>(`/doc/${docId}/${queryString}`)
  }

  async getDocumentFragment(docId: string, query: string): Promise<DocumentFragmentResponse> {
    const params = new URLSearchParams({ formInput: query })

    return this.fetchAPI<DocumentFragmentResponse>(`/docfragment/${docId}/?${params.toString()}`)
  }

  async getDocumentMeta(docId: string): Promise<DocumentMetaResponse> {
    return this.fetchAPI<DocumentMetaResponse>(`/docmeta/${docId}/`)
  }
}

// Check if API token is available
if (!API_TOKEN) {
  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  console.error("⚠️  WARNING: INDIAN_KANOON_API_KEY not found!")
  console.error("Add it to your .env.local file:")
  console.error("INDIAN_KANOON_API_KEY=your_api_key_here")
  console.error("Indian Kanoon features will not work.")
  console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
}

export const indianKanoonClient = new IndianKanoonClient(API_TOKEN || "")
export { IndianKanoonClient }
