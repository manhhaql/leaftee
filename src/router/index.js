import Express from 'express';
import Cors from 'cors';
import Morgan from 'morgan';
import BodyParser from 'body-parser';
import Path from 'path';

import HelloRoute from './hello_route';
import SizeRoute from './size_route';

class AppRoute {
    constructor() {
        this.helloRoute = new HelloRoute();
        this.sizeRoute = new SizeRoute();

        this.express = Express();
        this.middleware();
        this.routes();
    };

    middleware() {
        this.express.use(Cors());
        this.express.use(Morgan('dev'));
        this.express.use(BodyParser.json());
        this.express.use(BodyParser.urlencoded({
            extended: true
        }));
    };

    routes() {
        this.express.use('/api-docs', Express.static(Path.join(__dirname, '../../', '/swagger')));
        this.express.use('/hello', this.helloRoute.router);
        this.express.use('/size', this.sizeRoute.router);
    };
};

export default AppRoute;