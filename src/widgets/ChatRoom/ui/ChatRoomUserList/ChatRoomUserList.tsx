import { Box, List, ListItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getGameRoomPlayers } from '@/entities/Game/model/selectors/gameSelectors';

export const ChatRoomUserList = () => {
    const players = useSelector(getGameRoomPlayers);

    return (
        <Box height="100%">
            <List>
                {players.map((p) => (
                    <ListItem key={p.displayName}>
                        <Box display="flex" gap="10px">
                            <Box width="20px" height="20px">
                                <img width="100%" src={p.image} alt="" />
                            </Box>
                            <Typography>{p.displayName}</Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
