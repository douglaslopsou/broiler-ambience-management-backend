import { getRepository } from 'typeorm';
import Log from '../models/Log';

import AppError from '../errors/AppError';

interface Request {
  type_log: string;
  description: string;
}

class CreateLogService {
  public async execute({ type_log, description }: Request): Promise<Log> {
    const logsRepository = getRepository(Log);

    const log = logsRepository.create({
      type_log,
      description
    });

    await logsRepository.save(log);

    return log;
  }
}
export default CreateLogService;
