import { Box, Button, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Game } from '@/entities/Game/model/types/GameSchema';
import {
    currenUesrInSlectedGame,
    selectedGame,
} from '@/entities/Game/model/selectors/gameSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteChatRoom } from '@/shared/const/router';

interface SelectedGamePreviewProps {
    game: Game;
}

export const SelectedGamePreview = ({ game }: SelectedGamePreviewProps) => {
    const currentUserInGame = useSelector(currenUesrInSlectedGame);
    const currentGame = useSelector(selectedGame);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onJoinGame = useCallback(() => {
        if (currentGame) {
            navigate(getRouteChatRoom(currentGame.id));
        }
    }, [currentGame, navigate]);

    const onJoinRoom = useCallback(
        (id?: string) => () => {
            if (id) {
                navigate(getRouteChatRoom(id));
            }
        },
        [navigate],
    );

    return (
        <Box bgcolor="grey.300" p="16px" borderRadius="0 12px 12px 0">
            <Box mb="16px">
                <Typography>Id: {game.id}</Typography>
                <Typography>Status: {game.status}</Typography>
            </Box>
        </Box>
    );
};
