import { StateSchema } from '@/app/providers/StoreProvider';

export const selectedGame = (state: StateSchema) => state.game?.currentData;
export const gameList = (state: StateSchema) => state.game?.dataList;
