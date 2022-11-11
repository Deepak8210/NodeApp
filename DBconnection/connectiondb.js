const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RegisterUser',(err)=>
{
    if (!err) console.log("Connection is Successful!!")
    else console.log("Error in Connection")
})