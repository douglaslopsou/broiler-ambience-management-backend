import { Router } from 'express';
import { getRepository } from 'typeorm';

import Log from '../models/Log';
import CreateLogService from '../services/CreateLogService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const logsRouter = Router();

//devicesRouter.use(ensureAuthenticated);

logsRouter.get('/', async (request, response) => {
  const logsRepository = getRepository(Log);
  const logs = await logsRepository.find();

  return response.json(logs);
});

logsRouter.post('/', async (request, response) => {
  const { type_log, description } = request.body;

  const createLog = new CreateLogService();

  const log = await createLog.execute({
    type_log,
    description
  });

  return response.json(log);
});

export default logsRouter;
