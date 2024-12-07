import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Configuration } from "./config";

export class BaseService<T extends BaseEntity> extends Configuration {
    public execRepository: Promise<Repository<T>>;

    constructor(private getEntity: EntityTarget<T>) {
        super();
        this.execRepository = this.initRepository(this.getEntity);
    }

    async initRepository(entity: EntityTarget<T>): Promise<Repository<T>> {
        const getConn = await this.dbConnect()
        return getConn.getRepository(entity)
    }
}
