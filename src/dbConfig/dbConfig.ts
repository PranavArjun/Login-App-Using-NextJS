import mongoose, { connection } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        // We use ! Because we are using TS so we need to give sting value compulsary to mongo
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDB connected');
        })

        connection.on('error', (err) => {
            console.log('MongoDB Connection error , please make sure db is up and running : ' + err);
            process.exit()
        })

    } catch(error){
        console.log('Something went wrong in connecting to DB');
        console.log(error);
        
        

    }
}