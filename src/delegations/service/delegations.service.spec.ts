import {DelegationsService} from "./delegations.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getModelToken} from "@nestjs/sequelize";
import {Delegation} from "../model/delegation";
import {NotFoundException} from "@nestjs/common";

const mockDelegation = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
};

describe('DelegationsService', () => {
    let service: DelegationsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DelegationsService,
                {
                    provide: getModelToken(Delegation),
                    useValue: mockDelegation,
                },
            ],
        }).compile();

        service = module.get<DelegationsService>(DelegationsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of delegations', async () => {
            const result = [{ id: '1', name: 'Test' }];
            mockDelegation.findAll.mockResolvedValue(result);
            expect(await service.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a delegation if found', async () => {
            const result = { id: '1', name: 'Test' };
            mockDelegation.findOne.mockResolvedValue(result);
            expect(await service.findOne('1')).toBe(result);
        });

        it('should throw a NotFoundException if not found', async () => {
            mockDelegation.findOne.mockResolvedValue(null);
            await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
        });
    });

    describe('create', () => {
        it('should create and return a delegation', async () => {
            const delegationData = { name: 'Test' };
            const result = { id: '1', ...delegationData };
            mockDelegation.create.mockResolvedValue(result);
            expect(await service.create(delegationData as any)).toBe(result);
        });
    });

    describe('update', () => {
        it('should update and return the delegation', async () => {
            const delegationData = { name: 'Updated Test' };
            const existingDelegation = { id: '1', name: 'Test', update: jest.fn().mockResolvedValue(delegationData) };
            mockDelegation.findOne.mockResolvedValue(existingDelegation);
            expect(await service.update('1', delegationData as any)).toBe(delegationData);
        });

        it('should throw a NotFoundException if not found', async () => {
            mockDelegation.findOne.mockResolvedValue(null);
            await expect(service.update('1', {} as Delegation)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should delete the delegation', async () => {
            const existingDelegation = { id: '1', name: 'Test', destroy: jest.fn() };
            mockDelegation.findOne.mockResolvedValue(existingDelegation);
            await service.remove('1');
            expect(existingDelegation.destroy).toHaveBeenCalled();
        });

        it('should throw a NotFoundException if not found', async () => {
            mockDelegation.findOne.mockResolvedValue(null);
            await expect(service.remove('1')).rejects.toThrow(NotFoundException);
        });
    });
});