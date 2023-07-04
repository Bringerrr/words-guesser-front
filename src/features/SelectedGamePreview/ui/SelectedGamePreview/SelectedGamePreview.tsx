import { Box, Button, Typography } from '@mui/material';
import { Game } from '@/entities/Game/model/types/GameSchema';

interface SelectedGamePreviewProps {
    game: Game;
}

export const SelectedGamePreview = ({ game }: SelectedGamePreviewProps) => {
    return (
        <Box bgcolor="grey.300" p="16px" borderRadius="0 12px 12px 0">
            <Box mb="16px">
                <Typography>Id: {game.id}</Typography>
                <Typography>Status: {game.status}</Typography>
            </Box>

            <Button color="secondary" variant="contained">
                Join
            </Button>
        </Box>
    );
};
