import {ApiProperty} from "@nestjs/swagger";

export class DelegationHistoryDto {

    @ApiProperty({
        type: String,
        description: "State of description",
    })
    state: string;

    @ApiProperty({
        type: String,
        description: "Description",
    })
    description: string;

}