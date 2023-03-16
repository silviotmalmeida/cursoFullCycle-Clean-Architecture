// dependências
import { Table, Model, PrimaryKey, Column } from "sequelize-typescript";

// definindo as características da tabela no db
@Table({
  tableName: "products",
  timestamps: false,
})

// classe de modelo do orm
export default class ProductModel extends Model {
  // definindo as colunas e restrições da tabela
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare price: number;
}
