import { Router } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import DeviceData from '../models/DeviceData';
import CreateDeviceDataService from '../services/CreateDeviceDataService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import DevicesDataRepository from '../repositories/DevicesDataRepository';

const devicesDataRouter = Router();

//devicesDataRouter.use(ensureAuthenticated);

devicesDataRouter.get('/', async (request, response) => {
  const devicesDataRepository = getRepository(DeviceData);
  const devicesData = await devicesDataRepository.find({ order: { created_at: "DESC" }});

  return response.json(devicesData);
});

devicesDataRouter.get('/averageTemperature', async (request, response) => {
  const devicesDataRepository = getCustomRepository(DevicesDataRepository);
  const devicesData = await devicesDataRepository.temperatureAverage();

  return response.json(devicesData);
});

devicesDataRouter.get('/lastTemperatures', async (request, response) => {
  const devicesDataRepository = getCustomRepository(DevicesDataRepository);
  const devicesData = await devicesDataRepository.lastTemperatures();

  return response.json(devicesData);
});

devicesDataRouter.get('/lastUmidity', async (request, response) => {
  const devicesDataRepository = getCustomRepository(DevicesDataRepository);
  const devicesData = await devicesDataRepository.lastUmidity();

  return response.json(devicesData);
});

devicesDataRouter.post('/', async (request, response) => {
  const { device_id, temperature, umidity} = request.body;

  const createDeviceData = new CreateDeviceDataService();

  const deviceData = await createDeviceData.execute({
    device_id,
    temperature,
    umidity
  });

  return response.json(deviceData);
});

export default devicesDataRouter;
