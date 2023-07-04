import { User } from '@/entities/User';

export interface Game {
    id: string;
    status: string;
    hostUsername: string;
    players: Partial<User>[];
}

export interface GameSchema {
    isLoading: boolean;
    dataList?: Game[];
    currentData?: Game;
}
