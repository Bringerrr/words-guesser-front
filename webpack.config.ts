import webpack from 'webpack';
import path from 'path';
import dotEnv from 'dotenv';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildMode, BuildPaths } from './config/build/types/config';

function getApiUrl(mode: string, apiUrl?: string) {
    if (apiUrl) {
        return apiUrl;
    }
    if (mode === 'production') {
        return '/api';
    }

    return 'http://localhost:8000';
}

export default ({ mode }: { mode: BuildMode }) => {
    const envPath = mode === 'production' ? '.env.production' : './.env';

    dotEnv.config({ path: envPath });

    const envFile = process.env;

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const PORT = envFile?.APP_PORT || '3000';
    const apiUrl = getApiUrl(mode, envFile?.APP_API);

    const isDev = mode === 'development';

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    });

    return config;
};
