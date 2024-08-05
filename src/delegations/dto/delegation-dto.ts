import {ApiProperty} from "@nestjs/swagger";

export class DelegationDto {

    @ApiProperty({
        type: String,
        description: "Delegation identifier",
    })
    id: string;

    @ApiProperty({
        type: String,
        description: "Delegation number",
    })
    number: string;

    @ApiProperty({
        type: Date,
        description: "Start date of the delegation",
    })
    dateFrom: Date;

    @ApiProperty({
        type: Date,
        description: "End date of the delegation",
    })
    dateTo: Date;

    @ApiProperty({
        type: Date,
        description: "Date when the delegation was created",
        required: false,
    })
    createdAt?: Date;

    @ApiProperty({
        type: Date,
        description: "Date when the delegation was last updated",
        required: false,
    })
    updatedAt?: Date;
}