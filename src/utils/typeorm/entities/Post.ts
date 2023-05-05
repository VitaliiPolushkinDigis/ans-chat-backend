import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imgUrl?: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  likes: number;

  @Column('text', { array: true })
  comments: string[];

  @ManyToOne(() => Profile, (profile) => profile.posts)
  profile: Profile;
}
