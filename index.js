const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require('./DBconnection/connectiondb')
const Register = require('./models/register')


//body parser importing
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//setting view engine to hbs
app.set('view engine','hbs')

//setting path of static folder
const static_path = path.join(__dirname,'public')
app.use(express.static(static_path))



//setting port for listening
const port = process.env.port || 3000
app.listen(port)

//getting element on the site
app.get('/',(req,res)=>
{
    res.sendFile(path.resolve(__dirname,'views','index.html'))
})


//register part
app.post('/register',async(req,res)=>
{
    const pass = req.body.password
    const cpass = req.body.cpassword

    try {
        
        if (pass === cpass) {
            
           const userRegister = new Register({

            name: req.body.name,
            email:req.body.email,
            password:req.body.password
           })
 
           const Registerd = await userRegister.save()
           res.status(201).res.sendFile(path.resolve(__dirname,'views','login.html'))


        } else {
            res.status(400).send("password not matched")
        }


    } catch (error) {
        
        res.status(400).send("error")

    }
})

//login part
app.get('/login',(req,res)=>
{
    res.render('login')
})



app.post('/welcome',async(req,res)=>
{
   
    try {
        const email = req.body.email
        const password = req.body.password
    
        const useremail = await Register.findOne({email:email})
    
        if(useremail.password === password)
           res.status(200).render('welcome')

        else 
            res.status(400).send("Invalid Credentials")
        

    } catch (error) {
        
        res.status(400).send("Invalid Credentials")

    }
})
