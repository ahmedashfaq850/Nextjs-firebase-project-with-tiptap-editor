import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  const { prompt } = await request.json()

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Prompt is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    console.log('Received prompt:', prompt)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
    console.log('Model initialized:', model)
    const result = await model.generateContent(prompt)
    console.log('Result from generateContent:', result)
    const response = await result.response
    const text = response.text()

    return new Response(JSON.stringify({ content: text }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error generating content:', error || error)
    return new Response(JSON.stringify({ error: 'Failed to generate content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
