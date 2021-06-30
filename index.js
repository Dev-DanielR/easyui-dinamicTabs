const path = require('path')

const express = require('express')
const app = express()

const port = 3000

app.set('view engine', 'ejs')

app.get(`/`, (req, res) => {
  let theme = req.query.theme || 'default';
  res.render('index', { theme })
})

function respondWithDelay(page) {
  app.get(`/${page}.html`, async (req, res) => {
    setTimeout(() => res.render(page), 2000)
  })
}
respondWithDelay('google')
respondWithDelay('bing')
respondWithDelay('duckduckgo')

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log('Server started!'))