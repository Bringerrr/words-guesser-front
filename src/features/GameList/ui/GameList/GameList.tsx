import { useCallback } from 'react';
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Game } from '@/entities/Game/model/types/GameSchema';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { GameActions } from '@/entities/Game/model/slices/GameSlice';
import { joinGame } from '@/entities/Game/model/services/joinGame';
import { useNavigate } from 'react-router-dom';
import { getRouteChatRoom } from '@/shared/const/router';

interface GameListProps {
    gamesList: Game[];
    activeGameId?: string;
}

export const GameList = ({ gamesList, activeGameId }: GameListProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSelect = useCallback(
        (game: Game) => () => {
            dispatch(GameActions.selectGame(game));
        },
        [dispatch],
    );

    const onJoinGame = useCallback(
        (gameId: string) => async () => {
            // const response = await dispatch(joinGame(gameId));
            // console.log('resp', response);

            navigate(getRouteChatRoom(gameId));
        },
        [navigate],
    );

    return (
        <Box borderRadius="12px 0 0 12px" overflow="hidden" bgcolor="white">
            <Box overflow="hidden">
                <TableContainer component={Paper}>
                    <Table aria-label="status table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell>Hostname</TableCell>
                                <TableCell>Players</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gamesList?.map((game) => (
                                <TableRow key={game.id}>
                                    <TableCell>{game.status}</TableCell>
                                    <TableCell>{game?.hostUsername}</TableCell>
                                    <TableCell>
                                        <AvatarGroup max={4}>
                                            {game.players?.map((player) => (
                                                <Avatar
                                                    key={player.id}
                                                    alt="Remy Sharp"
                                                    src={player?.image || ''}
                                                />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={onJoinGame(game.id)}
                                            variant="contained"
                                        >
                                            Join
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};
