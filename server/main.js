import dotenv from 'dotenv'
import express from 'express'
import sequelize from './db.js'
import * as models from './models/models.js'
import cors from 'cors'
import router from './routes/index.js'
import errorHandler from "./middlewares/ErrorHandlingMiddleware.js";
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser';

dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(express.static("static"))
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors())
app.use('/api', router)


app.use(errorHandler)

const start = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, function () {
            console.log(`Server started on port: ${PORT}`)
        })
    }catch(e){
        console.log(e)
    }
}
start()

export default app



