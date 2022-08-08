import { User } from "src/auth/user.entity";
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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.post, {eager: false})
    user: User

    @OneToMany(() => File, (file) => file.post)
    files: File[]
}