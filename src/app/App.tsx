import { Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData, getUserInited, userActions } from '@/entities/User';
import { AppRouter } from './providers/router';
import { NavBar } from '@/widgets/NavBar';
import 'react-toastify/dist/ReactToastify.css';
import { authUser } from '@/entities/User/model/services/authUser';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

function App() {
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const auth = useSelector(getUserAuthData);

    const initApp = useCallback(async () => {
        await dispatch(authUser());
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    useInitialEffect(() => {
        initApp();
    });

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                {auth && <NavBar />}
                <div className="content-page">{inited && <AppRouter />}</div>
            </Suspense>
            <ToastContainer />
        </div>
    );
}

export default App;
