import { Router } from 'express';
import { getRepository } from 'typeorm';

import Configuration from '../models/Configuration';
import CreateConfigurationService from '../services/CreateConfigurationService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const configurationRouter = Router();

//devicesRouter.use(ensureAuthenticated);

configurationRouter.get('/', async (request, response) => {
  const configurationRepository = getRepository(Configuration);
  const configurations = await configurationRepository.findOne();

  return response.json(configurations);
});

configurationRouter.post('/', async (request, response) => {
  const { range_temperature, delay_cycle } = request.body;

  const createConfiguration = new CreateConfigurationService();

  const configuration = await createConfiguration.execute({
    range_temperature,
    delay_cycle
  });

  return response.json(configuration);
});

export default configurationRouter;
