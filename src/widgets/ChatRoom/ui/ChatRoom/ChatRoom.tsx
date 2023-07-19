//

import React, { useEffect, useRef, useState } from 'react';
import { TextField, List, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { getUserDisplayName } from '@/entities/User/model/selectors/userSelectors';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { createHubConnectionBuider } from '@/shared/config/createHubConnection';
import { ChatRoomMessagesListItem } from './ChatRoomMessagesListItem';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getGameById } from '@/entities/Game/model/services/getGameById';
import { getGameRoomPlayersIds } from '@/entities/Game/model/selectors/gameSelectors';
import { ChatRoomUserList } from '../ChatRoomUserList/ChatRoomUserList';

interface ChatProps {
    id?: string;
}

interface ChatMessage {
    id: string;
    content: string;
    createdAt: string;
    userName: string;
    displayName: string;
    image: string;
}

let hubConnection: any = null;

export const ChatRoom = ({ id }: ChatProps) => {
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const chatRef = useRef<HTMLDivElement>(null);
    const playersIds = useSelector(getGameRoomPlayersIds);

    const scrollDown = () => {
        setTimeout(() => {
            const scrollElement = chatRef.current;
            if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
        }, 100);
    };

    const onReciveMsg = (message: ChatMessage) => {
        scrollDown();
        setMessages((previousState) => {
            return [...previousState, message];
        });
        setMessage('');
    };

    const createHubConnection = (gameId: string) => {
        hubConnection = createHubConnectionBuider(gameId);
        hubConnection.start();

        hubConnection.on('LoadMessages', (loadedMessages: any) => {
            setMessages(loadedMessages);
        });

        hubConnection.on('ReceiveWords', (words: any) => {
            console.log('ReceiveWords', words);
        });

        hubConnection.on('ReceiveMessage', (message: ChatMessage) => {
            onReciveMsg(message);
        });
    };

    const stopHubConnection = () => {
        hubConnection.stop().catch((error: any) => console.log(error));
    };

    const addMessage = async (values: any) => {
        try {
            await hubConnection?.invoke('SendMessage', values);
        } catch (error) {
            console.log('While sending message', error);
        }
    };

    useInitialEffect(() => {
        createHubConnection(id!);
        // getGame
        dispatch(getGameById(id!));
    });

    useEffect(() => () => stopHubConnection(), []);

    const currentUserName = useSelector(getUserDisplayName);

    const handleMessageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (currentUserName) {
            await addMessage({ content: message, gameId: id });
            scrollDown();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const startGame = async () => {
        await hubConnection.invoke('StartGame', playersIds);
    };

    return (
        <Box width="100%">
            <Box display="flex" mb="24px" gap="24px" height="350px">
                <Box
                    flex="1"
                    ref={chatRef}
                    bgcolor="white"
                    borderRadius="6px"
                    height="100%"
                    sx={{ overflowY: 'scroll' }}
                >
                    <List>
                        {messages.map((msg) => (
                            <ChatRoomMessagesListItem
                                id={msg.id}
                                key={msg.id}
                                userName={msg.userName}
                                displayName={msg.displayName}
                                image={msg.image}
                                content={msg.content}
                            />
                        ))}
                    </List>
                </Box>
                <Box
                    height="100%"
                    flexBasis="240px"
                    bgcolor="white"
                    borderRadius="6px"
                    sx={{ overflowY: 'scroll' }}
                >
                    <ChatRoomUserList />
                </Box>
            </Box>
            <Box display="flex" gap="18px">
                <TextField
                    fullWidth
                    label="Type a message"
                    variant="outlined"
                    value={message}
                    onChange={handleMessageChange}
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={handleSendMessage} variant="contained">
                    Send
                </Button>
                <Button
                    color="secondary"
                    onClick={startGame}
                    variant="contained"
                >
                    Start
                </Button>
            </Box>
        </Box>
    );
};
