import { EntityTarget, Repository, DataSource } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Configuration } from "./config";

export class BaseService<T extends BaseEntity> extends Configuration {
    public execRepository: Promise<Repository<T>>;

    constructor(private getEntity: EntityTarget<T>, private dataSource: DataSource) {
        super();
        this.execRepository = this.initRepository(getEntity);
    }

    async initRepository(entity: EntityTarget<T>): Promise<Repository<T>> {
        return this.dataSource.getRepository(entity);
    }
}
