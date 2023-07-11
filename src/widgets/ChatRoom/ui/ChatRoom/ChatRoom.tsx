//

import React, { useEffect, useState } from 'react';
import {
    TextField,
    List,
    ListItem,
    Button,
    Box,
    Typography,
} from '@mui/material';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useSelector } from 'react-redux';
import { getUserDisplayName } from '@/entities/User/model/selectors/userSelectors';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

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
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const onReciveMsg = (message: ChatMessage) => {
        console.log('messages, message', messages, message);

        setMessages((previousState) => {
            return [...previousState, message];
        });
        setMessage('');
    };

    const createHubConnection = (gameId: string) => {
        console.log(
            'createHubConnection',
            localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)!,
        );

        hubConnection = new HubConnectionBuilder()
            // eslint-disable-next-line no-template-curly-in-string
            .withUrl(`http://localhost:5000/chat?gameId=${gameId}`, {
                accessTokenFactory: () =>
                    localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)!,
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        hubConnection
            .start()
            .catch((error: any) =>
                console.log('Error while connecting', error),
            );

        hubConnection.on('LoadMessages', (loadedMessages: any) => {
            console.log('LoadMessages', loadedMessages);

            setMessages(loadedMessages);
        });

        hubConnection.on('ReceiveMessage', (message: ChatMessage) => {
            onReciveMsg(message);
        });
    };

    const stopHubConnection = () => {
        hubConnection.stop().catch((error: any) => console.log(error));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const clearMessages = () => {
        setMessages([]);
        stopHubConnection();
    };

    const addMessage = async (values: any) => {
        try {
            console.log('values', values);
            await hubConnection?.invoke('SendMessage', values);
        } catch (error) {
            console.log('While sending message', error);
        }
    };

    useInitialEffect(() => {
        createHubConnection(id!);
    });

    useEffect(() => {
        return () => {
            console.log('clear messages');
            clearMessages();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentUserName = useSelector(getUserDisplayName);

    const handleMessageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (currentUserName) {
            await addMessage({ content: message, gameId: id });
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Box width="100%">
            <Box
                // maxWidth="450px"

                bgcolor="white"
                height="350px"
                borderRadius="6px"
                mb="24px"
                sx={{ overflowY: 'scroll' }}
            >
                <List>
                    {messages.map((msg) => (
                        <ListItem key={msg.id} sx={{ padding: '5px 10px' }}>
                            <Box display="flex" gap="8px">
                                <Typography color="purple">
                                    {msg.displayName} :
                                </Typography>
                                <Box width="20px" height="20px">
                                    <img width="100%" src={msg.image} alt="" />
                                </Box>
                                <Typography>{msg.content}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
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
            </Box>
        </Box>
    );
};
