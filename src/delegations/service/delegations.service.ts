import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Delegation} from "../model/delegation";

@Injectable()
export class DelegationsService {

    constructor(@InjectModel(Delegation) private readonly delegation: typeof Delegation) {
    }

}