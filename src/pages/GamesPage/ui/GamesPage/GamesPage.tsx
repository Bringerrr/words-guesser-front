import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { Page } from '@/widgets/Page';
import { GameList } from '@/features/GameList';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getGames } from '@/entities/Game/model/services/getGames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    gameList,
    selectedGame,
} from '@/entities/Game/model/selectors/gameSelectors';
import { SelectedGamePreview } from '@/features/SelectedGamePreview';

export const GamesPage = memo(() => {
    const dispatch = useAppDispatch();
    const games = useSelector(gameList);
    const currentGame = useSelector(selectedGame);

    useInitialEffect(async () => {
        await dispatch(getGames());
    });

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
        </Page>
    );
});
