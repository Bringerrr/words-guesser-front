import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Page } from '@/widgets/Page';
import { GameList } from '@/features/GameList';
import { selectedGame } from '@/entities/Game/model/selectors/gameSelectors';
import { SelectedGamePreview } from '@/features/SelectedGamePreview';
import { createGameHubConnectionBuilder } from '@/shared/config/createGameHubConnection';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getUserAuthData } from '@/entities/User';
import { getRouteChatRoom } from '@/shared/const/router';

let hubConnection: any = null;

export const GamesPage = memo(() => {
    const currentGame = useSelector(selectedGame);
    const user = useSelector(getUserAuthData);
    const [games, setGames] = useState();
    const navigate = useNavigate();

    const createHubConnection = () => {
        hubConnection = createGameHubConnectionBuilder();
        hubConnection.start();

        hubConnection.on('LoadGames', (loadedGames: any) => {
            setGames(loadedGames);
            console.log('LoadGames', loadedGames);
        });
    };

    const stopHubConnection = () => {
        hubConnection.stop().catch((error: any) => console.log(error));
    };

    useInitialEffect(() => {
        createHubConnection();
    });

    useEffect(() => () => stopHubConnection(), []);

    const navigateToChatRoom = (id: string) => {
        navigate(getRouteChatRoom(id));
    };

    const createGame = async () => {
        const resp = await hubConnection.invoke('CreateGame', user?.userName);
        navigateToChatRoom(resp.value);
    };

    return (
        <Page>
            <Box display="flex" gap="16px">
                <Box display="flex">
                    {games && (
                        <GameList
                            gamesList={games}
                            activeGameId={currentGame?.id}
                        />
                    )}
                    {currentGame && <SelectedGamePreview game={currentGame} />}
                </Box>
                <Button
                    sx={{ alignSelf: 'flex-start', mt: '16px' }}
                    variant="contained"
                    onClick={createGame}
                >
                    Create Game
                </Button>
            </Box>
        </Page>
    );
});
