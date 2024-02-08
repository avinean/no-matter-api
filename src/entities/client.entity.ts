import { ContactType, Sex } from 'src/types/enums';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { BussinessObjectEntity } from './bussiness-object.entity';

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: Sex,
  })
  sex: Sex;

  @Column()
  birthday: Date;

  @Column()
  source: string;

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  discount: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => ContactEntity, (contact) => contact.client)
  contacts: ContactEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.client)
  @JoinColumn({ name: 'client_booking' })
  bookings: BookingEntity[];

  @ManyToMany(() => BussinessObjectEntity)
  @JoinTable({ name: 'client_bussiness_object' })
  bussinessObjects: BussinessObjectEntity[];
}

@Entity({ name: 'contacts' })
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ContactType,
    default: ContactType.phone,
  })
  type: ContactType;

  @Column({ unique: true })
  value: string;

  @Column({ default: false })
  verified: boolean;

  @ManyToOne(() => ClientEntity, (client) => client.contacts, { eager: true })
  @JoinColumn()
  client: ClientEntity;
}
