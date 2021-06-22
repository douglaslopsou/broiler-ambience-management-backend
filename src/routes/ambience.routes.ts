import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import Ambience from '../models/Ambience';
import CreateAmbienceService from '../services/CreateAmbienceService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AmbienceRepository from '../repositories/AmbienceRepository';

const ambienceRouter = Router();

//devicesRouter.use(ensureAuthenticated);

ambienceRouter.get('/', async (request, response) => {
  const ambienceRepository = getCustomRepository(AmbienceRepository);
  const ambience = await ambienceRepository.find();

  return response.json(ambience);
});

ambienceRouter.get('/ParamsOfAmbience', async (request, response) => {
  const ambienceRepository = getCustomRepository(AmbienceRepository);
  const periodAmbience = await ambienceRepository.paramsOfAmbience();

  return response.json(periodAmbience);
});

ambienceRouter.get('/graphValues', async (request, response) => {
  const ambienceRepository = getCustomRepository(AmbienceRepository);
  const graphValues = await ambienceRepository.graphValues();

  return response.json(graphValues);
});

ambienceRouter.post('/', async (request, response) => {
  const { title, start_at, end_at, temperature, umidity } = request.body;

  const createAmbience = new CreateAmbienceService();

  const ambience = await createAmbience.execute({
    title,
    start_at,
    end_at,
    temperature,
    umidity
  });

  return response.json(ambience);
});

export default ambienceRouter;
