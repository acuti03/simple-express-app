import express from 'express'
import path from 'path'
import url from 'url'
import middlewareProva from './middlewareProva.js'
import auth from './auth.js'
import personeRouter from './routes/persone.js'

const app = express()
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/persone', personeRouter )
//app.use([auth, middlewareProva])

app.get('/', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, './public', 'home.html'))
})

app.get('*', (req, res) => {
	res.status(404).sendFile(path.join(__dirname, './public', '404.html'))
})


app.listen(3000)