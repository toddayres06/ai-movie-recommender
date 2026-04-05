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
            content: `
              List 5 movies similar to "${movie}".

              Format EXACTLY like this:
              Movie Title - short reason

              Rules:
              - No numbering
              - No bullet points
              - One movie per line
              - Keep each line concise
              `
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

    const content = response.data.choices[0].message.content

    res.json({ result: content })

  } catch (err) {
    console.error(err.response?.data || err.message)
    res.status(500).json({ error: "AI request failed" })
  }

})

app.get("/search", async (req, res) => {
  const { query } = req.query

  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: process.env.TMDB_KEY,
          query
        }
      }
    )

    res.json(response.data.results)

  } catch (err) {
    console.error(err.response?.data || err.message)
    res.status(500).json({ error: "TMDB search failed" })
  }
})

app.get("/movie/:id", async (req, res) => {
  const { id } = req.params

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          api_key: process.env.TMDB_KEY
        }
      }
    )

    res.json(response.data)

  } catch (err) {
    console.error(err.response?.data || err.message)
    res.status(500).json({ error: "TMDB details failed" })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})