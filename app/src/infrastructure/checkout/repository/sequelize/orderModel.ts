// dependências
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customerModel";
import OrderItemModel from "./orderItemModel";

// definindo as características da tabela no db
@Table({
  tableName: "orders",
  timestamps: false,
})

// classe de modelo do orm
export default class OrderModel extends Model {
  // definindo as colunas e restrições da tabela
  @PrimaryKey
  @Column
  declare id: string;

  // relacionamento com customer
  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @Column({ allowNull: false })
  declare total: number;

  // relacionamento com orderItem, tem que ser realizado o include deste model no repository
  @HasMany(() => OrderItemModel, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true,
  })
  declare items: OrderItemModel[];
}
