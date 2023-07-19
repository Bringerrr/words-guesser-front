import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { TOKEN_LOCALSTORAGE_KEY } from '../const/localstorage';

export const createHubConnectionBuider = (gameId: string) => {
    return (
        new HubConnectionBuilder()
            // eslint-disable-next-line no-template-curly-in-string
            .withUrl(`http://localhost:5000/chat?gameId=${gameId}`, {
                accessTokenFactory: () => localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)!,
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()
    );
};
