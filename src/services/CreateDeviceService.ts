import { getRepository } from 'typeorm';
import Device from '../models/Device';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  ip: string;
}

class CreateDeviceService {
  public async execute({ name, ip }: Request): Promise<Device> {
    const devicesRepository = getRepository(Device);

    const checkDeviceExists = await devicesRepository.findOne({
      where: { name },
    });

    if (checkDeviceExists) {
      throw new AppError('Device already used');
    }

    const checkIpExists = await devicesRepository.findOne({
      where: { ip },
    });

    if (checkIpExists) {
      throw new AppError('IP already used');
    }

    const device = devicesRepository.create({
      name,
      ip
    });

    await devicesRepository.save(device);

    return device;
  }
}
export default CreateDeviceService;
