import mongoose, { connection } from "mongoose";
export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!); 
            const connection = mongoose.connection;
            connection.on('connected', () => {
              console.log("MongoDb connnected Sussessfull")
            })
        connection.on('error', (err) => {
            console.log("MongoDb connection error" + err);
            process.exit()
        })
        
    } catch (error) {
        console.log(error)
    }
}