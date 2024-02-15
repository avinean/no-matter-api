import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { BusinessObjectEntity } from './business-object.entity';
import { ContactType, Sex } from 'src/types/enums';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ContactEntity, (contact) => contact.client)
  contacts: ContactEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.client)
  bookings: BookingEntity[];

  @ManyToMany(() => BusinessObjectEntity)
  @JoinTable({ name: 'client_business_object' })
  businessObjects: BusinessObjectEntity[];
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

  @ManyToOne(() => ClientEntity, (client) => client.contacts)
  @JoinColumn()
  client: ClientEntity;
}
