const jwt = require('jsonwebtoken');
const User = require('../model/user')
const config = require('../config')


function notAuthorized(res) {
    return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'You need to login!' }] })
}

exports.authMiddleware = function (req, res, next) {
    const token = req.headers.authorization

    if (!token) {
        return notAuthorized(res)
    }

    jwt.verify(token.split(' ')[1], config.SECRET, async function (err, decodedToekn) {
        if (err) {
            return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid token!' }] })
        }
        
        try{
            const foundUser = await User.findById(decodedToekn.userId)
            if (!foundUser) {
                return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid token!' }] })
            }
            next()
        }
        catch{
                return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid token!' }] })
        }
        // User.findById(decodedToekn.userId, function (err, foundUser) {
        //     if (err) {
        //         return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid token!' }] })
        //     }
        //     if (!foundUser) {
        //         return res.status(401).send({ errors: [{ title: 'Not Authorized', detail: 'Invalid token!' }] })
        //     }

        //     next()
        // })
    })
}