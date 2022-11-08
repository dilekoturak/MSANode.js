import * as express from "express"
import * as cors from "cors"
import { PostgresDataSource } from "./db"

PostgresDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
    const app = express()
    app.use(cors({
        origin: ['http://localhost:3000','http://localhost:4200']
    }))
  
    app.use(express.json())
    console.log("listening to port : 8000")
    app.listen(8000)
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})