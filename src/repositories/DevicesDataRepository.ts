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

  public async lastTemperatures(): Promise<number[] | null> {
    const findDeviceData = await this.find({
      select: ["temperature"],
      order: {
          created_at: "DESC"
          },
      skip: 0,
      take: 20
    });

    var temperatures = [];
    temperatures.push(20);

    findDeviceData.map((deviceData) => (
      temperatures.push(Number(deviceData.temperature))
    ));

    return temperatures || [];
  }

  public async lastUmidity(): Promise<number[] | null> {
    const findDeviceData = await this.find({
      select: ["umidity"],
      order: {
          created_at: "DESC"
          },
      skip: 0,
      take: 20
    });

    var umidity = [];
    umidity.push(40);

    findDeviceData.map((deviceData) => (
      umidity.push(Number(deviceData.umidity))
    ));

    return umidity || [];
  }
}

export default DevicesDataRepository;
