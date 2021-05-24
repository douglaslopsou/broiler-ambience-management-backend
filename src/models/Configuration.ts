import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('configuration')
class Configuration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  range_temperature: string;

  @Column()
  delay_cycle: string;
}

export default Configuration;
