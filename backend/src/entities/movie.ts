import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("movie", { schema: "public" })
export class Movie {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'original_title', length: 100 })
  original_title: string;

  @Column('jsonb', { name: 'meta_data', nullable: true })
  meta_data: object | null;

}
