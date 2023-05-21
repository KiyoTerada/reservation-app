const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const config = require('../config')

router.post('/login',async function(req,res){
    const{email, password} = req.body

    if(!email){
        return res.status(422).send({errors:[{title:'User error',detail:'Please fill email!'}]})
    }
    if(!password){
        return res.status(422).send({errors:[{title:'User error',detail:'Please fill password!'}]})
    }
    try{
        const foundUser = await User.findOne({email})
        if(!foundUser){
            return res.status(422).send({errors:[{title:'User error',detail:'User is not exist!'}]})
        }
        if(!foundUser.hasSamePassword(password)){
            return res.status(422).send({errors:[{title:'User error',detail:'Incorrect password!'}]})
        }
        const token = jwt.sign({
            userId: foundUser.id,
            username: foundUser.username
          }, config.SECRET, { expiresIn: '1h' });
        return res.json(token)
    }
    catch
    {
        return res.status(422).send({errors:[{title:'User error',detail:'Something went wrong!!!'}]})
    }
    // foundProducts = await Product.find({})
    //     res.json(foundProducts)
})

router.post('/register',async function(req,res){
    const {username, email, password, confirmpassword} = req.body
    /*
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword
    */

    if(!username){
        return res.status(422).send({errors:[{title:'User error',detail:'ユーザー名を入力してください'}]})
    }
    if(!email){
        return res.status(422).send({errors:[{title:'User error',detail:'Please fill email!'}]})
    }
    if(!password){
        return res.status(422).send({errors:[{title:'User error',detail:'Please fill password!'}]})
    }
    if(password != confirmpassword){
        return res.status(422).send({errors:[{title:'User error',detail:'Please check password'}]})
    }
    // User.findOne({email}, function(err,founderror){
    //     if(err){
    //         return res.status(422).send({errors:[{title:'User error',detail:'Something went wrong!!!'}]})
    //     }
    //     if(founderror){
    //         return res.status(422).send({errors:[{title:'User error',detail:'User already exists!'}]})
    //     }
    // })
    try{
        const foundUser = await User.findOne({email})
        if(foundUser){
            return res.status(422).send({errors:[{title:'User error',detail:'User already exists!'}]})
        }
    }
    catch
    {
        return res.status(422).send({errors:[{title:'User error',detail:'Something went wrong!!!'}]})
    }
    const user = new User({username,email,password})
    try{
        const result = await user.save()
        return res.json({"registerd": true})
    }
    catch
    {
        return res.status(422).send({errors:[{title:'User error',detail:'Something went wrong!!!'}]})
    }
        // return res.json(foundUser)
})
    // return res.json({username,email,password})
module.exports = router