import { Router } from 'express';
import { getRepository } from 'typeorm';

import Device from '../models/Device';
import CreateDeviceService from '../services/CreateDeviceService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const devicesRouter = Router();

//devicesRouter.use(ensureAuthenticated);

devicesRouter.get('/', async (request, response) => {
  const devicesRepository = getRepository(Device);
  const devices = await devicesRepository.find();

  return response.json(devices);
});

devicesRouter.post('/', async (request, response) => {
  const { name, ip } = request.body;

  const createDevice = new CreateDeviceService();

  const device = await createDevice.execute({
    name,
    ip
  });

  return response.json(device);
});

export default devicesRouter;
