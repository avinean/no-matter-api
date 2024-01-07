import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'auth_urls' })
export class AuthUrlsEntity {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ unique: true })
  email: string;
}
