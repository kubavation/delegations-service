import {DelegationDto} from "./delegation-dto";
import {DelegationHistoryDto} from "./delegation-history-dto";
import {ApiProperty} from "@nestjs/swagger";

export class DetailedDelegationDto extends DelegationDto {

    @ApiProperty({
        type: () => DelegationHistoryDto,
        description: "End date of the delegation",
        isArray: true
    })
    history: DelegationHistoryDto[];

}