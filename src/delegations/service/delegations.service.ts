import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Delegation} from "../model/delegation";
import {CreateDelegationDto} from "../dto/create-delegation-dto";
import {DelegationDto} from "../dto/delegation-dto";
import { v4 as uuidv4 } from 'uuid';
import {UpdateDelegationDto} from "../dto/update-delegation-dto";

@Injectable()
export class DelegationsService {

    constructor(@InjectModel(Delegation) private readonly delegation: typeof Delegation) {
    }


    async findAll(): Promise<DelegationDto[]> {
        return this.delegation.findAll();
    }

    async findOne(id: string) {

        const delegation = await this.delegation.findOne({
            where: { id }
        })

        if (!delegation) {
            throw new NotFoundException(`Delegation with id ${id} not found`);
        }

        return delegation;
    }

    async create(data: CreateDelegationDto) {
        return this.delegation.create({
            ...data,
            id: uuidv4()
        });
    }

    async update(id: string, data: UpdateDelegationDto) {
        return await this.findOne(id)
            .then(delegation => delegation.update({
                ...data
            }));
    }

    async remove(id: string) {
        return await this.findOne(id)
            .then(delegation => delegation.destroy());
    }
}