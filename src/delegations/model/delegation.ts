import {Column, DataType, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DelegationHistory} from "./delegation-history";

@Table({
    underscored: true,
    version: true,
    createdAt: true,
    updatedAt: true
})
export class Delegation extends Model<Delegation> {

    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @Column
    number: string;

    @Column
    dateFrom: Date;

    @Column
    dateTo: Date;

    @HasMany(() => DelegationHistory)
    history: DelegationHistory[];

}