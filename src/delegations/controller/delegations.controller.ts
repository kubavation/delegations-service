import {Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {DelegationsService} from "../service/delegations.service";
import {Delegation} from "../model/delegation";

@Controller('delegations')
export class DelegationsController {

    constructor(private readonly delegationsService: DelegationsService) {}

    @Get()
    findAll() {
        return this.delegationsService.findAll();
    }

    @Post()
    create(delegation: Delegation) {
        return this.delegationsService.create(delegation);
    }

    @Put(':id')
    update(id: string, data: Delegation) {
        return this.delegationsService.update(id, data);
    }

    @Delete(':id')
    delete(id: string) {
        return this.delegationsService.remove(id);
    }
}
