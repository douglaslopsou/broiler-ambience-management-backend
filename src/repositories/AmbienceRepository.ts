import { EntityRepository, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import Ambience from '../models/Ambience';

@EntityRepository(Ambience)
class AmbienceRepository extends Repository<Ambience> {
  public async findByDate(date_start: Date, date_end: Date): Promise<Ambience[] | null> {
    
    const findAmbience = await this.query('SELECT * from ambience where ($1, $2) OVERLAPS (start_at , end_at )', [date_start, date_end]);
    
    console.log(findAmbience);

    return findAmbience || null;  
  }
}

export default AmbienceRepository;