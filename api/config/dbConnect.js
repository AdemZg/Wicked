const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try{
        const connect = mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to db successfully')
    }
    catch(err){
        console.error('Database connection error')
    }
}
module.exports = dbConnect