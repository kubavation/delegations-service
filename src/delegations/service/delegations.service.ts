import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Delegation} from "../model/delegation";
import {CreateDelegationDto} from "../dto/create-delegation-dto";
import {DelegationDto} from "../dto/delegation-dto";

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
        return this.delegation.create(data);
    }

    async update(id: string, data: Delegation) {

        const delegation = await this.findOne(id);

        return delegation.update(data);
    }

    async remove(id: string) {

        const delegation = await this.findOne(id);

        await delegation.destroy();
    }
}