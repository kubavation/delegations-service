import {DelegationDto} from "./delegation-dto";

export interface CreateDelegationDto
    extends Omit<DelegationDto, 'id' | 'createdAt' | 'updatedAt'> {

}