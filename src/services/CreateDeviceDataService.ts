import { getRepository } from 'typeorm';
import DeviceData from '../models/DeviceData';

import AppError from '../errors/AppError';

interface Request {
  device_id: string;
  temperature: string;
  umidity: string;
}

class CreateDeviceDataService {
  public async execute({ device_id, temperature, umidity }: Request): Promise<DeviceData> {
    const devicesDataRepository = getRepository(DeviceData);

    const deviceData = devicesDataRepository.create({
      device_id,
      temperature,
      umidity
    });

    await devicesDataRepository.save(deviceData);

    return deviceData;
  }
}
export default CreateDeviceDataService;
