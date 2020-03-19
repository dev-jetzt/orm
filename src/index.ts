import "reflect-metadata";
import { createConnection, Repository, In, Like } from "typeorm";
import { User } from "./entity/User";
import { ChatMessage } from './entity/ChatMessage';
import { Chat } from './entity/Chat';

const getAllUsers = async (userRepository: Repository<User>): Promise<User[]> => {
    return userRepository.find();
}

const getChats = async (chatRepository: Repository<Chat>): Promise<Chat[]> => {
    return chatRepository.find();
}

const getMessages = async (chatMessageRepository: Repository<ChatMessage>): Promise<ChatMessage[]> => {
    return chatMessageRepository.find();
}

const getChatsFromUsers = async (chatRepository: Repository<Chat>, users: User[]): Promise<Chat[]> => {
    return chatRepository.createQueryBuilder('chat')
        .innerJoin('chat.users', 'user')
        .where('user.id IN (:...userIds)', { userIds: users.map(user => user.id) })
        .getMany();
}

const getChatThatContainsText = async (chatRepository: Repository<Chat>, text: string): Promise<Chat[]> => {
    return chatRepository.createQueryBuilder('chat')
        .leftJoin('chat.messages', 'message')
        .where('chat.name like :text OR message.content like :text', { text: `%${text}%` })
        .getMany();
}

const getMessagesFromChatAndUser = async (chatMessageRepository: Repository<ChatMessage>, chat: Chat, user: User): Promise<ChatMessage[]> => {
    return chatMessageRepository.find({
        where: {
            chat: {
                id: chat.id
            },
            user: {
                id: user.id
            }
        }
    });
}

const getTotalNumberOfMessagesFromUser = async (chatMessageRepository: Repository<ChatMessage>, user: User): Promise<number> => {
    return chatMessageRepository.count({
        where: {
            user: {
                id: user.id
            }
        }
    });
}


createConnection().then(async connection => {

    await connection.dropDatabase();

    await connection.runMigrations();

    const userRepository = connection.getRepository(User);
    const chatRepository = connection.getRepository(Chat);
    const chatMessageRepository = connection.getRepository(ChatMessage);
    
    // Finish mapping the entities 
    // Run "npm run migration:generate v2" in the command line, to generate the db migration

    const exampleMessages = [
        'Hello',
        'See you later',
        'Where have you been?',
        'I will see you tomorrow',
        'Im ok'
    ];

    // Insert 3 users into the database

    const [user1, user2, user3] = await Promise.all([1, 2, 3].map(index => {
        const user = new User();
        user.firstName = `Firstname ${index}`;
        user.lastName = `Lastname ${index}`;
        user.username = `username-${index}`;
        user.chats = Promise.resolve([]);

        return userRepository.save(user);
    }));

    // Insert 3 chats with a mix of the users
    const dbChats = await Promise.all([1, 2, 3].map(async (index) => {
        const chat = new Chat();
        chat.name = `Chat name ${index}`;
        switch (index) {
            case 0:
                chat.users = Promise.resolve([user1, user2]);
                break;
            case 1:
                chat.users = Promise.resolve([user1, user3]);
                break;
            case 1:
                chat.users = Promise.resolve([user2, user3]);
                break;
        }
        
        return chatRepository.save(chat);
    }));

    // Insert 3 chat messages for each chat (TOTAL 9)
    await Promise.all(dbChats.map(async (chat) => {
        const promise = Promise.all([1,2,3].map(async () => {
            const chatMessage = new ChatMessage();
            chatMessage.chat = chat;
            chatMessage.content = exampleMessages[Math.floor(Math.random() * exampleMessages.length)];
            chatMessage.user = await chat.users.then(users => users[Math.floor(Math.random() * 2)]);

            return chatMessageRepository.save(chatMessage);
        }));

        chat.messages = promise;

        return promise;
    }));

    const users = await getAllUsers(userRepository);
    console.assert(users.length === 3, 'contains 3 users');

    const chats = await getChats(chatRepository);
    console.assert(chats.length === 3, 'contains 3 chats');

    const messages = await getMessages(chatMessageRepository);
    console.assert(messages.length === 9, 'contains 9 messages');

    const chatsFromUsers = await getChatsFromUsers(chatRepository, [user1, user3]);
    console.assert(chatsFromUsers.length > 0, 'users have chats');

    // search for chats that contain text in the name or that have any chatMessage that contains text in the content
    // replace 'text' with your own partial text, you want to search for, depending on the data you previously created
    const chatWithText = await getChatThatContainsText(chatRepository, 'you');
    console.assert(chatWithText.length > 0, 'chat contains text');

    const messagesFromChatAndUser = await getMessagesFromChatAndUser(chatMessageRepository, dbChats[0], user1);
    console.assert(messagesFromChatAndUser.length > 0, 'has messages');

    const totalNumberOfMessagesFromUser = await getTotalNumberOfMessagesFromUser(chatMessageRepository, user1);
    console.assert(totalNumberOfMessagesFromUser > 0, 'user has messages');
}).catch(error => console.log(error));
