import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL =
  process.env.FINEX_BACKEND_URL ||
  process.env.NEXT_PUBLIC_FINEX_API_URL ||
  "http://localhost:8001"

async function proxyBackend(
  req: NextRequest,
  context: { params: { path?: string[] } } | Promise<{ params: { path?: string[] } }>,
) {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { detail: "FINEX_BACKEND_URL is not configured" },
      { status: 500 },
    )
  }

  const resolvedContext = await Promise.resolve(context)
  const path = resolvedContext.params.path?.join("/") ?? ""
  const target = new URL(`${BACKEND_URL.replace(/\/$/, "")}/${path}`)
  req.nextUrl.searchParams.forEach((value, key) => {
    target.searchParams.append(key, value)
  })

  const headers: Record<string, string> = {}
  const allowed = ["content-type", "authorization"]
  allowed.forEach((key) => {
    const value = req.headers.get(key)
    if (value) headers[key] = value
  })

  const init: RequestInit = {
    method: req.method,
    headers,
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    const body = await req.arrayBuffer()
    init.body = body
  }

  let backendResponse: Response
  try {
    backendResponse = await fetch(target, init)
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Failed to reach backend" },
      { status: 502 },
    )
  }

  const responseBody = backendResponse.body
  const responseInit: ResponseInit = {
    status: backendResponse.status,
    headers: backendResponse.headers,
  }

  return new NextResponse(responseBody, responseInit)
}

export { proxyBackend as GET, proxyBackend as POST, proxyBackend as PUT, proxyBackend as PATCH, proxyBackend as DELETE }
