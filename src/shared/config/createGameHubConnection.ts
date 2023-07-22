import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { TOKEN_LOCALSTORAGE_KEY } from '../const/localstorage';

export const createGameHubConnectionBuilder = () => {
    return (
        new HubConnectionBuilder()
            // eslint-disable-next-line no-template-curly-in-string
            .withUrl(`http://localhost:5000/games`, {
                accessTokenFactory: () => localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)!,
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()
    );
};
