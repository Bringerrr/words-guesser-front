import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserInited, userActions } from '@/entities/User';
import { AppRouter } from './providers/router';

function App() {
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                {/* <Navbar /> */}
                <div className="content-page">{inited && <AppRouter />}</div>
            </Suspense>
        </div>
    );
}

export default App;
