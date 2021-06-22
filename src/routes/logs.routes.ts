import { Router } from 'express';
import { getRepository, Like } from 'typeorm';

import Log from '../models/Log';
import CreateLogService from '../services/CreateLogService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const logsRouter = Router();

//devicesRouter.use(ensureAuthenticated);

logsRouter.get('/', async (request, response) => {
  const logsRepository = getRepository(Log);
  const logs = await logsRepository.find({ order: { created_at: "DESC" }});

  return response.json(logs);
});

logsRouter.get('/logController', async (request, response) => {
  const logsRepository = getRepository(Log);
  const logs = await logsRepository.findOne({ 
    description: Like('%vel%'),
    type_log: "BAM-Controller",
  },
  {
    order: { created_at: "DESC" }
  }
  );

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
