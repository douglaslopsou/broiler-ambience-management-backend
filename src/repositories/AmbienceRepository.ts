import { EntityRepository, Repository, getRepository } from 'typeorm';

import Ambience from '../models/Ambience';
import Configuration from '../models/Configuration';
import DeviceData from '../models/DeviceData';

interface Params {
  ambience?: Ambience;
  configuration?: Configuration;
  deviceData?: DeviceData;
}

@EntityRepository(Ambience)
class AmbienceRepository extends Repository<Ambience> {
  public async findByDate(date_start: Date, date_end: Date): Promise<Ambience[] | null> {
    
    const findAmbience = await this.query('SELECT * from ambience where ($1, $2) OVERLAPS (start_at , end_at )', [date_start, date_end]);

    return findAmbience || null;  
  }

  public async paramsOfAmbience(): Promise<Params> {
    const findPeriodAmbience = await this.query('SELECT * from ambience where current_date between start_at AND end_at');
    
    const configurationRepository = getRepository(Configuration);
    const configurations = await configurationRepository.findOne();

    const devicesDataRepository = getRepository(DeviceData);
    const findDeviceData = await devicesDataRepository.findOne({ order: { created_at: "DESC" }});

    const params: Params = { ambience: findPeriodAmbience, configuration: configurations, deviceData: findDeviceData};

    return params || null;
  }
}

export default AmbienceRepository;