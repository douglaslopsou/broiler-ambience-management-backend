import { Router } from 'express';
import { getRepository } from 'typeorm';

import Ambience from '../models/Ambience';
import CreateAmbienceService from '../services/CreateAmbienceService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const ambienceRouter = Router();

//devicesRouter.use(ensureAuthenticated);

ambienceRouter.get('/', async (request, response) => {
  const ambienceRepository = getRepository(Ambience);
  const ambience = await ambienceRepository.find();

  return response.json(ambience);
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
