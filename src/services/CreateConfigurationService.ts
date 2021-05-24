import { getRepository } from 'typeorm';
import Configuration from '../models/Configuration';

import AppError from '../errors/AppError';

interface Request {
  configuration_id?: string;
  range_temperature: string;
  delay_cycle: string;
}

class CreateConfigurationService {
  public async execute({ configuration_id, range_temperature, delay_cycle }: Request): Promise<Configuration> {
    const configurationRepository = getRepository(Configuration);

    const configuration = await configurationRepository.findOne(configuration_id);

    if (!configuration) {

      const configurationNew = configurationRepository.create({
        range_temperature,
        delay_cycle
      });

      await configurationRepository.save(configurationNew);
      return configurationNew;
      
    }else{

      configuration.range_temperature = range_temperature;
      configuration.delay_cycle = delay_cycle;
      await configurationRepository.save(configuration);
      return configuration;
      
    }
  }
}
export default CreateConfigurationService;
