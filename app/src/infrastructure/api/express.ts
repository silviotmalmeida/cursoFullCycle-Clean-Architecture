// arquivo de configuração da api
// dependências
import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customerModel";
import { customerRoute } from "./routes/customerRoute";
import { productRoute } from "./routes/productRoute";
import ProductModel from "../product/repository/sequelize/productModel";

// configurando o express da api, bem como suas rotas
export const app: Express = express();
app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

// configurando o DB a ser utilizado pela api
export let sequelize: Sequelize;
async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}
setupDb();
