export interface SearchDoc {
  tid: string
  title: string
  headline: string
  docsource: string
  docsize: number
  publishdate?: string
}

export interface SearchResponse {
  found: number
  docs: SearchDoc[]
  encodedformInput: string
  categories?: Array<[string, Array<{ formInput: string; value: string }>]>
}

export interface Citation {
  tid: string
  title: string
}

export interface DocumentResponse {
  doc: string
  title: string
  tid: string
  docsource: string
  publishdate?: string
  citeList?: Citation[]
  citedbyList?: Citation[]
}

export interface DocumentFragmentResponse {
  formInput: string
  title: string
  tid: string
  headline: string
  doc: string
}

export interface DocumentMetaResponse {
  tid: string
  title: string
  docsource: string
  publishdate?: string
  docsize: number
}
