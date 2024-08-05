import {DelegationDto} from "./delegation-dto";
import {OmitType} from "@nestjs/swagger";

export class CreateDelegationDto
    extends OmitType(DelegationDto, ['id' , 'createdAt' , 'updatedAt'] as const) {

}