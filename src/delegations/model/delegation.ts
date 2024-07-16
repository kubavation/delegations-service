import {Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export class Delegation extends Model<Delegation> {

    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @Column
    number: string;

    //todo

}