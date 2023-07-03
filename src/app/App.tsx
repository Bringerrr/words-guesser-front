import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData, getUserInited, userActions } from '@/entities/User';
import { AppRouter } from './providers/router';
import { NavBar } from '@/widgets/NavBar';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);
    const auth = useSelector(getUserAuthData);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

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
