
const isAuthenticated = (req, res, next) => {
    console.log("Middleware")
    console.log(req.session.username)
    if (req.session.username) {
        next()
    } else {
        next(new Error('You need to be logged in to do that!'))
    }
}

module.exports = isAuthenticated