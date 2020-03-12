import { ChatMessage } from './ChatMessage';
import {Entity, PrimaryGeneratedColumn} from "typeorm";
import { User } from './User';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;
    
    name: string;

    messages: Promise<ChatMessage[]>;

    users: Promise<User[]>;
}
