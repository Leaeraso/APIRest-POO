import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRouter } from './router/user.router';
import { Configuration } from './config/config';
import { DataSource } from 'typeorm';

class Main extends Configuration{
    public app: express.Application = express();
    private PORT: number = this.getNumberEnv('PORT');

    constructor() {
        super()
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true}));

        this.dbConnect();

        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers());
        this.listen();
    }

    public routers(): Array<express.Router> {
        return [new UserRouter().router];
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

    public listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server listening on port: ${this.PORT}`);
        })
    }

}

new Main();

