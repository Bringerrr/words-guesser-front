import {memo, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Button from "@mui/material/Button";
import { Page } from '@/widgets/Page';
import { GameList } from '@/features/GameList';
import {
    selectedGame,
} from '@/entities/Game/model/selectors/gameSelectors';
import { SelectedGamePreview } from '@/features/SelectedGamePreview';
import {createGameHubConnectionBuilder} from "@/shared/config/createGameHubConnection";
import {useInitialEffect} from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import {getUserAuthData} from "@/entities/User";

let hubConnection: any = null;

export const GamesPage = memo(() => {
    const currentGame = useSelector(selectedGame);
    const user = useSelector(getUserAuthData);
    const [games, setGames] = useState();

    const createHubConnection = () => {
        hubConnection = createGameHubConnectionBuilder();
        hubConnection.start();

        hubConnection.on('LoadGames', (loadedGames: any) => {
            setGames(loadedGames);
        });

        hubConnection.on('ReceiveGames', (games: any) => {
            setGames(games);
        });
    };

    const stopHubConnection = () => {
        hubConnection.stop().catch((error: any) => console.log(error));
    };

    useInitialEffect(() => {
        createHubConnection();
    });

    useEffect(() => () => stopHubConnection(), []);

    const createGame = async () => {
        await hubConnection.invoke('CreateGame', user?.userName);
    }

    return (
        <Page>
            <Box display="flex">
                {games && (
                    <GameList
                        gamesList={games}
                        activeGameId={currentGame?.id}
                    />
                )}
                {currentGame && <SelectedGamePreview game={currentGame} />}
            </Box>
            <Button onClick={createGame}>Create Game</Button>
        </Page>
    );
});
