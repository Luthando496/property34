const dotenv = require('dotenv');
const House = require('../Models/Houses');
const mongoose = require('mongoose')
const data = require('./data')

// Setting dotenv file
dotenv.config()

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



const seedHouses = async () => {
    try {

        await House.deleteMany();
        console.log('Houses are deleted');

        await House.insertMany(data)
        console.log('All Houses are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedHouses()