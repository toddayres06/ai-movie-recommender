import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API running")
})

import axios from "axios"

app.post("/recommend", async (req, res) => {

  const { movie } = req.body

  try {

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: `Suggest 5 movies similar to ${movie}. Explain briefly why each is similar.`
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    res.json(response.data)

  } catch (err) {
    console.error(err.response?.data || err.message)
    res.status(500).json({ error: "Failed to fetch recommendations" })
  }

})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})