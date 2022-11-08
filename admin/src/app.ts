import { Product } from './entity/product';
import * as express from "express"
import { Request, Response } from "express"
import * as cors from "cors"
import { PostgresDataSource } from "./db"

PostgresDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
    const productRepository = PostgresDataSource.getRepository(Product)

    const app = express()
    app.use(cors({
        origin: ['http://localhost:3000','http://localhost:4200']
    }))
    app.use(express.json())

    app.get('/', (req, res) => {
        res.send('hello world')
    })

    app.get('/api/products', async (req: Request, res: Response) => {
        const products = await productRepository.find()
        res.json(products)
    })

    app.post('/api/products', async (req: Request, res: Response) => {
        const product = await productRepository.create(req.body)
        const result = await productRepository.save(product)
        return res.send(result)
    })

    app.get('/api/products/:id', async (req: Request, res: Response) => {
        const product = await productRepository.findOne({
            where: {id: Number(req.params.id)}
        })
        return res.send(product)
    })

    app.put('/api/products/:id', async (req: Request, res: Response) => {
        const product = await productRepository.findOne({
            where: {id: Number(req.params.id)}
        })
        productRepository.merge(product, req.body)
        const result = await productRepository.save(product)
        return res.send(result)
    })

    app.delete('/api/products/:id', async (req: Request, res: Response) => {
        const product = await productRepository.findOne({
            where: {id: Number(req.params.id)}
        })
        const result = productRepository.delete(product.id)
        return res.send(result)
    })

    app.post('/api/products/:id/like', async (req: Request, res: Response) => {
        const product = await productRepository.findOne({
            where: {id: Number(req.params.id)}
        })
        product.likes++
        const result = await productRepository.save(product)
        return res.send(result)
    })

    app.listen(8000)
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})