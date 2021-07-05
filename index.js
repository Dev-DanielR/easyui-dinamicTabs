const
  path    = require('path'),
  express = require('express'),
  app     = express(),
  port    = 2000

//Session
const
  sqlite      = require('better-sqlite3'),
  session     = require('express-session'),
  SqliteStore = require('better-sqlite3-session-store')(session),
  db          = new sqlite('sessions.db');

app.use(
  session({
    saveUninitialized : true,
    store: new SqliteStore({
      client  : db,
      expired : {clear: true, intervalMs: 900000}
    }),
    secret : 'c46f7a5e90a522acfbcfa4f28605edc8',
    resave : false
  })
)

//Middleware
const getTheme = require('./middlewares/theme')

//Routes
app.set('view engine', 'ejs')

function respond(page) {
  app.get(`/${page}`, (req, res) => res.render(page, { 'theme': getTheme(req) }))
}
function respondWithDelay(page) {
  app.get(`/${page}`, (req, res) => {
    setTimeout(
      () => res.render(page, { 'theme': getTheme(req) }),
      parseInt(Math.random() * 2500) + 500
    )
  })
}

respond('index')
respond('login')
respond('login2')
respond('login3')
respondWithDelay('google')
respondWithDelay('bing')
respondWithDelay('duckduckgo')

//Assets
app.use('/', express.static(path.join(__dirname, 'public')))

//Listen
app.listen(port, () => console.log('Server started!'))