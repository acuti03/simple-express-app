const middlewareProva = (req, res, next) => {
    const { method, url } = req
    const date = new Date().getMinutes()

    console.log(method, url, date)
    next()
}

export default middlewareProva