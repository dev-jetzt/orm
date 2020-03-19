import { ChatMessage } from './ChatMessage';
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { User } from './User';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @OneToMany(type => ChatMessage, chatMessage => chatMessage.chat)
    messages: Promise<ChatMessage[]>;

    @ManyToMany(type => User, user => user.chats)
    @JoinTable()
    users: Promise<User[]>;
}
