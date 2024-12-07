import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export abstract class Configuration {

    constructor(){
        const nodeNameEnv = this.createPathEnv(this.nodeEnv)
        dotenv.config({
            path: nodeNameEnv,
        })
    }

    public getEnviroment(k: string): string | undefined {
        return process.env[k];
    }

    public getNumberEnv(k: string): number {
        return Number(this.getEnviroment(k));
    }

    public get nodeEnv(): string {
        return this.getEnviroment('NODE_ENV')?.trim() || '';
    }

    public createPathEnv(path: string): string {
        const arrEnv: string[] = ['env'];
        
        if(path.length > 0){
            const stringToArray = path.split('.');
            arrEnv.unshift(...stringToArray);
        }
        return '.' + arrEnv.join('.');
    }

    public get typeORMCOnfig(): DataSourceOptions{
        return {
            type: 'mysql',
            host: this.getEnviroment('DB_HOST'),
            port: this.getNumberEnv('DB_PORT'),
            username: this.getEnviroment('DB_USER'),
            password: this.getEnviroment('DB_PASSWORD'),
            database: this.getEnviroment('DB_DATABASE'),
            entities: [__dirname + "/../**/*.entity.ts}"],
            migrations: [__dirname + "/../../migrations/*.ts"],
            synchronize: true,
            logging: false,
            namingStrategy: new SnakeNamingStrategy(),
            extra: {
                connectionLimit: 10,
            },
        }
    }

    async dbConnect(): Promise<DataSource> {
        const dataSource = new DataSource(this.typeORMCOnfig);

        try {
            await dataSource.initialize();
            console.log('Database connection established.');
            return dataSource;
        } catch (error) {
            console.error('Error during dataSource initiazation', error);
            throw error;
        }
    }
}
