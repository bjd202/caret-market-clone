import { User } from "src/auth/user.entity";
import { Post } from "src/post/post.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.favorites, {eager: false})
    user: User;

    @ManyToOne(() => Post, (post) => post.favorites, {eager: false})
    post: Post;
}