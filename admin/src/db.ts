import { DataSource, DataSourceOptions } from "typeorm"
import { Product } from "./entity/product"
import { createDatabase } from "typeorm-extension";

const options: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "node_admin",
    entities: [
        Product
    ],
    synchronize: true
};

(async () => {
    // Create the database with specification of the DataSource options
    await createDatabase({
        ifNotExist: true,
        options
    });
})();

export const PostgresDataSource = new DataSource(options);
