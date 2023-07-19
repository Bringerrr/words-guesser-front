import { StateSchema } from '@/app/providers/StoreProvider';

export const selectedGame = (state: StateSchema) => state.game?.currentData;
export const currenUesrInSlectedGame = (state: StateSchema) =>
    state.game?.currentData?.players.some((player) => player.email === state.user.authData?.email);
export const gameList = (state: StateSchema) => state.game?.dataList;

export const getGameRoomPlayers = (state: StateSchema) => state.game?.currentData?.players || [];
export const getGameRoomPlayersIds = (state: StateSchema) => state.game?.currentData?.players.map((p) => p.id) || [];
