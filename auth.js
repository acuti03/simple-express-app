import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const auth = (req, res, next) => {
    const { user } = req.query

    console.log(user)

    user == "simo" ? console.log("accesso effettuato") : res.status(401).sendFile(path.join(__dirname, './public', '404.html'))
    
    next()
}

export default auth