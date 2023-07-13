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
import { useSelector } from 'react-redux';
import { currenUesrInSlectedGame } from '@/entities/Game/model/selectors/gameSelectors';
import { getUserAuthData } from '@/entities/User';

interface GameListProps {
    gamesList: Game[];
    activeGameId?: string;
}

export const GameList = ({ gamesList, activeGameId }: GameListProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const curentUser = useSelector(getUserAuthData);

    const onSelect = useCallback(
        (game: Game) => () => {
            dispatch(GameActions.selectGame(game));
        },
        [dispatch],
    );

    const onJoinGame = useCallback(
        (game: Game) => async () => {
            const currentUserInGame = game.players.some(
                (player) => player.email === curentUser?.email,
            );

            if (!currentUserInGame) {
                await dispatch(joinGame(game.id));
            }

            navigate(getRouteChatRoom(game.id));
        },
        [curentUser?.email, dispatch, navigate],
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
                                            onClick={onJoinGame(game)}
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
