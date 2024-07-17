import {Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DelegationHistory} from "./delegation-history";

@Table({
    underscored: true
})
export class Delegation extends Model<Delegation> {

    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @Column
    number: string;

    @HasMany(() => DelegationHistory)
    history: DelegationHistory[];

}