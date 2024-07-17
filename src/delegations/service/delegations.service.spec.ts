import {DelegationsService} from "./delegations.service";
import {Delegation} from "../model/delegation";
import {NotFoundException} from "@nestjs/common";
import {TestBed} from "@automock/jest";
import {getModelToken} from "@nestjs/sequelize";

describe('DelegationsService', () => {
    let service: DelegationsService;
    let mockDelegation: jest.Mocked<typeof Delegation>;


    beforeAll(() => {
        const { unit, unitRef } = TestBed.create(DelegationsService).compile();

        service = unit;
        mockDelegation = unitRef.get(getModelToken(Delegation));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of delegations', async () => {
            const result = [{ id: '1', name: 'Test' }];
            jest.spyOn(mockDelegation, 'findAll').mockResolvedValue(result as any[]);
            expect(await service.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a delegation if found', async () => {
            const result = { id: '1', name: 'Test' };
            jest.spyOn(mockDelegation, 'findOne').mockResolvedValue(result as any);
            expect(await service.findOne('1')).toBe(result);
        });

        it('should throw a NotFoundException if not found', async () => {
            jest.spyOn(mockDelegation, 'findOne').mockResolvedValue(null);
            await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
        });
    });

    describe('create', () => {
        it('should create and return a delegation', async () => {
            const delegationData = { name: 'Test' };
            const result = { id: '1', ...delegationData };
            jest.spyOn(mockDelegation, 'create').mockResolvedValue(result);
            expect(await service.create(delegationData as any)).toBe(result);
        });
    });

    describe('update', () => {
        it('should update and return the delegation', async () => {
            const delegationData = { name: 'Updated Test' };
            const existingDelegation = { id: '1', name: 'Test', update: jest.fn().mockResolvedValue(delegationData) };
            jest.spyOn(mockDelegation, 'findOne').mockResolvedValue(existingDelegation as any);
            expect(await service.update('1', delegationData as any)).toBe(delegationData);
        });

        it('should throw a NotFoundException if not found', async () => {
            jest.spyOn(mockDelegation, 'findOne').mockResolvedValue(null);
            await expect(service.update('1', {} as Delegation)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should delete the delegation', async () => {
            const existingDelegation = { id: '1', name: 'Test', destroy: jest.fn() };
            jest.spyOn(mockDelegation, 'findOne').mockResolvedValue(existingDelegation as any);
            await service.remove('1');
            expect(existingDelegation.destroy).toHaveBeenCalled();
        });

        it('should throw a NotFoundException if not found', async () => {
            jest.spyOn(mockDelegation, 'findOne').mockResolvedValue(null);
            mockDelegation.findOne.mockResolvedValue(null);
            await expect(service.remove('1')).rejects.toThrow(NotFoundException);
        });
    });
});