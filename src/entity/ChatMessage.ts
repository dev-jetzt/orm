
import {Entity, PrimaryGeneratedColumn} from "typeorm";
import { User } from './User';
import { Chat } from './Chat';

@Entity()
export class ChatMessage {
    @PrimaryGeneratedColumn()
    id: number;
    
    content: string;

    user: User;

    chat: Chat;
}
