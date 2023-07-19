import { Box, ListItem, Typography } from '@mui/material';
import { memo } from 'react';

interface ChatRoomMessagesListItemProps {
    id: string;
    userName: string;
    displayName: string;
    image: string;
    content: string;
}

export const ChatRoomMessagesListItem = memo(
    ({
        id,
        userName,
        displayName,
        image,
        content,
    }: ChatRoomMessagesListItemProps) => {
        const isSystem = userName === 'system';
        return (
            <ListItem key={id} sx={{ padding: '5px 10px' }}>
                <Box display="flex" gap="8px">
                    {!isSystem && (
                        <>
                            <Typography color="purple">
                                {displayName} :
                            </Typography>
                            <Box width="20px" height="20px">
                                <img width="100%" src={image} alt="" />
                            </Box>
                        </>
                    )}

                    <Typography
                        fontSize={isSystem ? '14px' : '16px'}
                        fontStyle={isSystem ? 'italic' : 'normal'}
                        color={isSystem ? 'grey' : 'black'}
                    >
                        {content}
                    </Typography>
                </Box>
            </ListItem>
        );
    },
);
