import { EntityRepository, Repository } from 'typeorm';

import DeviceData from '../models/DeviceData';

@EntityRepository(DeviceData)
class DevicesDataRepository extends Repository<DeviceData> {
  public async findByDate(date: Date): Promise<DeviceData | null> {
    const findDeviceData = await this.findOne({
      where: { date },
    });

    return findDeviceData || null;
  }

  public async temperatureAverage(): Promise<DeviceData | null> {
    const findDeviceData = await this.findOne({ order: { created_at: "DESC" }});

    return findDeviceData || null;
  }
}

export default DevicesDataRepository;
