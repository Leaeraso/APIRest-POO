import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRouter } from './user/user.router';
import { Configuration } from './config/config';

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

    public listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Server listening on port: ${this.PORT}`);
        })
    }

}

new Main();

