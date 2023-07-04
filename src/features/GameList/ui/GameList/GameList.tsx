import { useCallback } from 'react';
import { Box, List, ListItem } from '@mui/material';
import { Game } from '@/entities/Game/model/types/GameSchema';
import { GameListItem } from '@/entities/Game/ui/Game/Game';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { GameActions } from '@/entities/Game/model/slices/GameSlice';

interface GameListProps {
    gamesList: Game[];
    activeGameId?: string;
}

export const GameList = ({ gamesList, activeGameId }: GameListProps) => {
    const dispatch = useAppDispatch();

    const onSelect = useCallback(
        (game: Game) => () => {
            dispatch(GameActions.selectGame(game));
        },
        [dispatch],
    );

    return (
        <Box borderRadius="12px 0 0 12px" overflow="hidden" bgcolor="white">
            <Box overflow="hidden">
                <List sx={{ padding: '0' }}>
                    {gamesList?.map((game) => {
                        const isActive = game.id === activeGameId;
                        return (
                            <ListItem
                                onClick={onSelect(game)}
                                sx={{
                                    background: 'white',
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <GameListItem game={game} isActive={isActive} />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );
};
