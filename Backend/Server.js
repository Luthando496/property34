const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const house = require('./Routes/house')


app.use(express.json())
app.use(morgan('dev'))




app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','GET,PUT,PATCH,POST')
        return res.status(200).json({})
    }

    next()
})



app.use('/uploads',express.static(path.join(__dirname,'/uploads/')))

app.use('/v1/luthando/properties',house)














const connectDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://luthando:lavisa12345@property37.jihhk.mongodb.net/houses?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology:true}
        );
    
    console.log('DB CONNECTED')

    }catch(err){
        console.error(err.message)
        process.exit(1)
    }
}

connectDB()







// UNHANDLED EXCEPTIONS

process.on('uncaughtException',err=>{
    console.log('uncaught Exception Server Shutting Down')
    console.log(`ERROR = ${err.stack}`)
    process.exit(1)

})




const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is Running At ${process.env.PORT} In ${process.env.NODE_ENV}`)
})



// unhandledRejection
process.on('unhandledRejection',err=>{
    console.log(`ERROR REJECTION  ${err.message}`)
    coonsole.log('SERVER SHUTTING DOWN')

    server.close(()=>{
        process.exit(1)
    })

})