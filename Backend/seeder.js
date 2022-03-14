const mongoose=require('mongoose')
const dotenv=require('dotenv')
const products=require('./data')
const House=require('./Models/Houses')

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

const importData = async () => {
  try {
      await House.deleteMany()
    await House.insertMany(products)

    console.log('Data consted!')
    process.exit()
  } catch (error) {
    console.error(`${error}`,'hello')
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await House.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}