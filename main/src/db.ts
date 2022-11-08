import { DataSource, DataSourceOptions } from "typeorm"
import { Product } from "./entity/product"

const options: DataSourceOptions = {
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "node_admin",
    entities: [
        Product
    ],
    synchronize: true
};

export const MongoDataSource = new DataSource(options);
