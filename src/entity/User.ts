import {Entity, PrimaryGeneratedColumn, ManyToMany, Column} from "typeorm";
import { Chat } from './Chat';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToMany(type => Chat, chat => chat.users)
    chats: Promise<Chat[]>;
}
