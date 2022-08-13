import { Favorite } from "src/favorite/favorite.entity";
import { Post } from "src/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({nullable: true})
    currentHashedRefreshToken?: string;

    @OneToMany(() => Post, (post) => post.user, {eager: false})
    post: Post[]

    @OneToMany(() => Favorite, (favorite) => favorite.user, {eager: false})
    favorites: Favorite[];
}