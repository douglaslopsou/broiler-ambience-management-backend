import { Router } from 'express';
import devicesRouter from './devices.routes';
import devicesDataRouter from './devicesdata.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/devices', devicesRouter);
routes.use('/devicesdata', devicesDataRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
