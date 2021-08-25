import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("movie_credit", { schema: "public" })
export class MovieCredit {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'movie_id'})
  movie_id: number;

  @Column('character varying', { name: 'title', length: 1000 })
  title: string;

  @Column('jsonb', { name: 'cast', nullable: true })
  cast: object | null;
  
  @Column('jsonb', { name: 'crew', nullable: true })
  crew: object | null;

}
