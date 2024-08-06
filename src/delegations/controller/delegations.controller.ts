import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {DelegationsService} from "../service/delegations.service";
import {Delegation} from "../model/delegation";
import {CreateDelegationDto} from "../dto/create-delegation-dto";
import {ApiBody, ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {DelegationDto} from "../dto/delegation-dto";
import {UpdateDelegationDto} from "../dto/update-delegation-dto";

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
    @ApiOperation({description: 'Create delegation'})
    @ApiBody({ type: CreateDelegationDto })
    @ApiResponse({status: HttpStatus.CREATED, description: 'Delegation successfully created'})
    create(@Body() delegation: CreateDelegationDto) {
        return this.delegationsService.create(delegation);
    }

    @Put(':id')
    @ApiOperation({description: 'Update delegation'})
    @ApiBody({ type: UpdateDelegationDto })
    @ApiParam({name: 'id', description: 'Delegation identifier'})
    @ApiResponse({status: HttpStatus.OK, description: 'Delegation successfully updated'})
    update(@Param('id') id: string, data: UpdateDelegationDto) {
        return this.delegationsService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({description: 'Delete delegation'})
    @ApiParam({name: 'id', description: 'Delegation identifier'})
    @ApiResponse({status: HttpStatus.NO_CONTENT, description: 'Delegation successfully deleted'})
    delete(@Param('id') id: string) {
        return this.delegationsService.remove(id);
    }
}
