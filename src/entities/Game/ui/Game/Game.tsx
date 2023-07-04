import { memo } from 'react';
import { Box } from '@mui/material';
import { Game } from '../../model/types/GameSchema';

interface GameListItemProps {
    game: Game;
    isActive?: boolean;
}

export const GameListItem = memo(({ game, isActive }: GameListItemProps) => {
    return (
        <Box
            display="flex"
            borderBottom={isActive ? '1px solid red' : undefined}
        >
            <Box>{game.id}</Box>
        </Box>
    );
});
