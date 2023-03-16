// dependências
import { Table, Model, PrimaryKey, Column } from "sequelize-typescript";

// definindo as características da tabela no db
@Table({
  tableName: "customers",
  timestamps: false,
})

// classe de modelo do orm
export default class CustomerModel extends Model {
  // definindo as colunas e restrições da tabela
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: number;

  @Column({ allowNull: false })
  declare zipcode: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare active: boolean;

  @Column({ allowNull: false })
  declare rewardPoints: number;
}
