import "reflect-metadata";
import {createConnection, Repository} from "typeorm";
import {User} from "./entity/User";
import { ChatMessage } from './entity/ChatMessage';
import { Chat } from './entity/Chat';

const getAllUsers = async (userRepository: Repository<User>): Promise<User[]> => {
    return [];
}

const getChats = async (chatRepository: Repository<Chat>): Promise<Chat[]> => {
    return [];
}

const getMessages = async (chatMessageRepository: Repository<ChatMessage>): Promise<ChatMessage[]> => {
    return [];
}

const getChatsFromUsers = async (chatRepository: Repository<Chat>, users: User[]): Promise<Chat[]> => {
    return [];
}

const getChatThatContainsText = async (chatRepository: Repository<Chat>, text: string): Promise<Chat[]> => {
    return [];
}

const getMessagesFromChatAndUser = async (chatMessageRepository: Repository<ChatMessage>, chat: Chat, user: User): Promise<ChatMessage[]> => {
    return [];
}

const getTotalNumberOfMessagesFromUser = async (chatMessageRepository: Repository<ChatMessage>, user: User): Promise<number> => {
    return 0;
}


createConnection().then(async connection => {

    await connection.dropDatabase();
    
    await connection.runMigrations();

    const userRepository = connection.getRepository(User);
    const chatRepository = connection.getRepository(Chat);
    const chatMessageRepository = connection.getRepository(ChatMessage);
    
    // Finish mapping the entities 
    // Run "npm run migration:generate v2" in the command line, to generate the db migration

    // Insert 3 users into the database

    // Insert 3 chats with a mix of the users

    // Insert 3 chat messages for each chat (TOTAL 9)
    
    const users = await getAllUsers(userRepository);
    console.assert(users.length === 3, 'contains 3 users');

    const chats = await getChats(chatRepository);
    console.assert(chats.length === 3, 'contains 3 chats');

    const messages = await getMessages(chatMessageRepository);
    console.assert(messages.length === 9, 'contains 9 messages');

    const chatsFromUsers = await getChatsFromUsers(chatRepository, []);
    console.assert(chatsFromUsers.length > 0, 'users have chats');

    // search for chats that contain text in the name or that have any chatMessage that contains text in the content
    // replace 'text' with your own partial text, you want to search for, depending on the data you previously created
    const chatWithText = await getChatThatContainsText(chatRepository, 'text');
    console.assert(chatWithText.length > 0, 'chat contains text');

    const messagesFromChatAndUser = await getMessagesFromChatAndUser(chatMessageRepository, {} as Chat, {} as User);
    console.assert(messagesFromChatAndUser.length > 0, 'has messages');

    const totalNumberOfMessagesFromUser = await getTotalNumberOfMessagesFromUser(chatMessageRepository, {} as User);
    console.assert(totalNumberOfMessagesFromUser > 0, 'user has messages');
}).catch(error => console.log(error));
