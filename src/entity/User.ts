import {Entity, PrimaryGeneratedColumn} from "typeorm";
import { Chat } from './Chat';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    username: string;

    firstName: string;

    lastName: string;

    chats: Promise<Chat[]>;
}
