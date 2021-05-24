import { Router } from 'express';
import configurationRouter from './configuration.routes';
import ambienceRouter from './ambience.routes';
import devicesRouter from './devices.routes';
import devicesDataRouter from './devicesdata.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/ambience', ambienceRouter);
routes.use('/configuration', configurationRouter);
routes.use('/devices', devicesRouter);
routes.use('/devicesdata', devicesDataRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
