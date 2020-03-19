
import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class ChatMessage {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    content: string;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @ManyToOne(type => Chat, chat => chat.messages)
    @JoinColumn()
    chat: Chat;
}
