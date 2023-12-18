import express from 'express'
import persone from '../persone.js'
import path from 'path'
import url from 'url'

const router = express.Router()
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

router.get('/', (req, res) => {
	res.status(200).json({success: true, data: persone})
})

router.post('/', (req, res) => {
	console.log(req.body)
	const persona = req.body

	persone.push(persona)

	res.status(200).json(persone)
})

router.get('/form', (req, res) => {
	res.status(200).sendFile(path.join(__dirname, '../public', 'form.html'))
})

router.get('/fidanzati', (req, res) => {
	let newPersone = persone.map(persona => {
		if(persona.relazione == true){
			const { nome, cognome } = persona
			return { nome , cognome }
		}
		else return -1
	})

	newPersone = newPersone.filter(value => {
		return value != -1
	})

	res.status(200).json(newPersone)
})

router.get('/search', (req, res) => {
	const { query, limit } = req.query
	let personeFiltrate = [...persone]

	if(query){
		personeFiltrate = personeFiltrate.filter(persona => {
			return persona.nome.startsWith(query)
		})
	}
	if(limit){
		personeFiltrate = personeFiltrate.slice(0, Number(limit))
	}

	if(personeFiltrate.length < 1) return res.status(404).sendFile(path.join(__dirname, "../public", "404.html"))

	res.status(200).json({success: true, data: personeFiltrate})
})


router.get('/:id', (req, res) => {
	const { id } = req.params
	const persona = persone.find((persona) => persona.id == id)

	res.status(200).json({success: true, data: persona})
})

router.put('/:id', (req, res) => {
	const { id } = req.params
	const persona = req.body

	persone[Number(id) - 1] = persona
	res.status(200).json({success: true, data: persone})
})

router.delete('/:id', (req, res) => {
	const { id } = req.params
	const index  = persone.findIndex(persona => persona.id == id)
	persone.splice(index, 1)

	res.status(200).json({success: true, data: persone})
})


export default router