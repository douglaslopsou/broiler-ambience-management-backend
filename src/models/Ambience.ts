import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { uuid } from 'uuidv4';

@Entity('ambience')
class Ambience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn()
  start_at: Date;

  @UpdateDateColumn()
  end_at: Date;

  @Column()
  temperature: string;

  @Column()
  umidity: string;
}

export default Ambience;
