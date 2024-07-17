import {BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Delegation} from "./delegation";

@Table({
    underscored: true
})
export class DelegationHistory extends Model<DelegationHistory> {

    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @Column
    state: string;

    @Column
    description: string;

    @ForeignKey(() => Delegation)
    @Column(DataType.UUID)
    delegationId: string;

    @BelongsTo(() => Delegation)
    delegation: Delegation;

}