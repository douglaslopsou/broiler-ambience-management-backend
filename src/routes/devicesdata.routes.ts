import { Router } from 'express';
import { getRepository } from 'typeorm';

import DeviceData from '../models/DeviceData';
import CreateDeviceDataService from '../services/CreateDeviceDataService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const devicesDataRouter = Router();

//devicesDataRouter.use(ensureAuthenticated);

devicesDataRouter.get('/', async (request, response) => {
  const devicesDataRepository = getRepository(DeviceData);
  const devicesData = await devicesDataRepository.find();

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
