import { User } from "src/auth/user.entity";
import { Favorite } from "src/favorite/favorite.entity";
import { File } from "src/file/file.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;
     
    @Column()
    category: string;

    @Column()
    number: number;

    @Column()
    description: string;

    @Column()
    views: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.post, {eager: true})
    user: User

    @OneToMany(() => File, (file) => file.post, {eager: true})
    files: File[]

    @OneToMany(() => Favorite, (favorite) => favorite.post, {eager: true})
    favorites: Favorite[];
}