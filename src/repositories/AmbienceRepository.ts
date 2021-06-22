import { EntityRepository, Repository, getRepository, getCustomRepository } from 'typeorm';

import Ambience from '../models/Ambience';
import Configuration from '../models/Configuration';
import DeviceData from '../models/DeviceData';
import DevicesDataRepository from './DevicesDataRepository';

interface Params {
  ambience?: Ambience;
  configuration?: Configuration;
  deviceData?: DeviceData;
}

interface PeriodAmbience {
  id: string;
  title: string;
  start_at: string;
  end_at: string;
  temperature: string;
  umidity: string;
}

interface GraphValues {
  idealTemperature?: number[];
  maxTemperature?: number[];
  lastTemperatures?: number[] | null;
  lastUmidity?: number[] | null;
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

  public async graphValues(): Promise<GraphValues> {
    const findPeriodAmbience:PeriodAmbience[] = await this.query('SELECT * from ambience where current_date between start_at AND end_at');
    
    //CONFIGURATION
    const configurationRepository = getRepository(Configuration);
    const configurations = await configurationRepository.findOne();

    //TEMPERATURA MAXIMA
    var maxTemperature = [];
    maxTemperature.push(20);

    for(let i=1; i <=21; i++){
      maxTemperature.push(Number(findPeriodAmbience[0].temperature) + Number(configurations?.range_temperature));
    }
    //TEMPERATURA IDEAL
    var idealTemperature = [];
    idealTemperature.push(20);

    for(let i=1; i <=21; i++){
      idealTemperature.push(Number(findPeriodAmbience[0].temperature));
    }

    //LASTTEMPERATURE
    const devicesDataRepository = getCustomRepository(DevicesDataRepository);
    const lastTemperatures = await devicesDataRepository.lastTemperatures();
    const lastUmidity = await devicesDataRepository.lastUmidity();

    //OBJETO COM OS ARRAYS
    const graphValues: GraphValues = { idealTemperature, maxTemperature, lastTemperatures, lastUmidity };

    return graphValues || null;
  }
}

export default AmbienceRepository;