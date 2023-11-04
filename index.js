const express = require('express')
const app = express()
app.get('/api/health', async (_, res) => {
  res
    .status(200)
    .send(`Backup health check for NextJs App. This means the ECS deployment has failed. This is very serious.`)
})
app.listen({ port: 3000 }, () => {
  console.log(`💩 Fallback server ready at http://localhost:3000`)
})
