import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AmbienceRepository from '../repositories/AmbienceRepository';

import AppError from '../errors/AppError';
import Ambience from '../models/Ambience';


interface Request {
  title: string;
  start_at: string;
  end_at: string;
  temperature: string;
  umidity: string;
}

class CreateAmbienceService {
  public async execute({ title, start_at, end_at, temperature, umidity }: Request): Promise<Ambience> {
    const ambienceRepository = getCustomRepository(AmbienceRepository);

    const checkAmbienceExists = await ambienceRepository.findOne({
      where: { title },
    });

    if (checkAmbienceExists) {
      throw new AppError('Ambience title already exists');
    }

    const ambienceDateStart = parseISO(start_at);
    const ambienceDateEnd = parseISO(end_at);

    const findAmbienceInSameDate = await ambienceRepository.findByDate(
      ambienceDateStart,
      ambienceDateEnd,
    );

    // if (findAmbienceInSameDate?.length > 0) {
    //   throw new AppError('This ambience already configured');
    // }

    const ambience = ambienceRepository.create({
      title,
      start_at,
      end_at,
      temperature,
      umidity
    });

    await ambienceRepository.save(ambience);

    return ambience;
  }
}
export default CreateAmbienceService;
