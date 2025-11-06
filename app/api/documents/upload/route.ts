export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Upload to storage (Vercel Blob, S3, etc.)
    // 2. Extract text using OCR if needed
    // 3. Store metadata in database

    // For now, we'll just return a mock ID
    const id = `doc_${Date.now()}_${Math.random().toString(36).substring(7)}`

    return Response.json({
      id,
      message: "Document uploaded successfully",
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return Response.json({ error: "Failed to upload document" }, { status: 500 })
  }
}
