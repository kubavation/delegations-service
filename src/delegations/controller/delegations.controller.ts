import {Body, Controller, Delete, Get, HttpStatus, Post, Put} from '@nestjs/common';
import {DelegationsService} from "../service/delegations.service";
import {Delegation} from "../model/delegation";
import {CreateDelegationDto} from "../dto/create-delegation-dto";
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {DelegationDto} from "../dto/delegation-dto";

@Controller('delegations')
export class DelegationsController {

    constructor(private readonly delegationsService: DelegationsService) {}

    @Get()
    @ApiOperation({description: 'Get all delegations'})
    @ApiResponse({status: HttpStatus.OK, description: 'List of delegations', type: [DelegationDto]})
    findAll() {
        return this.delegationsService.findAll();
    }

    @Post()
    @ApiOperation({description: 'Create delegations'})
    @ApiBody({ type: [CreateDelegationDto] })
    @ApiResponse({status: HttpStatus.CREATED, description: 'Delegation successfully created'})
    create(@Body() delegation: CreateDelegationDto) {
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
