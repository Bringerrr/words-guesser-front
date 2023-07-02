import { Button } from '@mui/material';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ErrorPage.module.scss';

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.ErrorPage, {}, [className])}>
            <p>Unexpected error</p>
            <Button onClick={reloadPage}>refresh page</Button>
        </div>
    );
};
