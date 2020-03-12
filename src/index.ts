import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import { ChatMessage } from './entity/ChatMessage';
import { Chat } from './entity/Chat';

createConnection().then(async connection => {

    await connection.dropDatabase();
    
    await connection.runMigrations();

    const userRepository = connection.getRepository(User);
    const chatRepository = connection.getRepository(Chat);
    const chatMessageRepository = connection.getRepository(ChatMessage);

    // Insert 3 users into the database

    // Insert 3 chats with a mix of the users

    // Insert 3 chat messages for each chat

    const [users, totalUsers] = await userRepository.findAndCount();
    console.assert(totalUsers === 3, 'db contains 3 users');
    console.assert(users.length === 3, 'query returns 3 users');

    const [chats, totalChats] = await chatRepository.findAndCount();
    console.assert(totalChats === 3, 'db contains 3 chats');
    console.assert(chats.length === 3, 'query returns 3 chats');

    const [messages, totalMessages] = await chatMessageRepository.findAndCount();
    console.assert(totalMessages === 9, 'db contains 9 messages');
    console.assert(messages.length === 9, 'query returns 9 messages');

    users.forEach(async user => {
        console.assert((await user.chats).length > 0, 'user is in chats');
    });

    chats.forEach(async chat => {
        console.assert((await chat.messages).length === 3, 'chat contains 3 messages');
        console.assert((await chat.users).length > 0, 'chat contains users');
    });

    messages.forEach(async message => {
        console.assert(message.chat !== null, 'message belongs to a chat');
        console.assert(message.user !== null, 'message belongs to a user');
    });


}).catch(error => console.log(error));
