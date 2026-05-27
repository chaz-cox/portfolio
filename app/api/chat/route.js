import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const SYSTEM_PROMPT = `You are a friendly AI assistant on Chaz Cox's
portfolio website. Answer questions about Chaz based only on the info
below. Be conversational and highlight his strengths naturally.
If asked something not covered, say you don't have that info and
suggest they reach out directly at cox.s.chaz@gmail.com.

--- ABOUT CHAZ ---
Full Stack Developer based in St. George, UT.
3 years experience at HelloPOS building shipping logistics (ShipEngine),
tax compliance systems (Avalara), and data reporting tools.
Skills: JavaScript, TypeScript, Python, Java, Vue.js, Angular,
React Native, Spring Boot, SQL, Arduino/IoT.
Education: B.S. Computer Science, Utah Tech University 2024.
Projects: PDF Medical Data Extractor (Python), KippyCam IoT app
(React Native + Arduino).
GitHub: https://github.com/chaz-cox
LinkedIn: https://www.linkedin.com/in/chaz-cox-b108a9236/`

export async function POST(request) {
  const { messages } = await request.json()

  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    systemInstruction: SYSTEM_PROMPT
  })

  // Convert messages to Gemini format
  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))

  const chat = model.startChat({ history })
  const lastMessage = messages[messages.length - 1].content
  const result = await chat.sendMessage(lastMessage)

  return Response.json({ 
    reply: result.response.text() 
  })
}
