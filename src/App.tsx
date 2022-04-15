import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Dashboard from './components/Dashboard';
import { useSelector } from './hooks/useTypedSelector';
import { userActions } from './store';
import styles from "./App.module.css";
import ErrorPage from './components/ErrorPage';
import { Route, Routes } from 'react-router-dom';
import AddUserPage from './components/AddUserPage';
import NotFound from './components/NotFound';
import EditUserPage from './components/EditUserPage';
import DetailUserPage from './components/UserDetailPage'

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getUsers());
  }, [dispatch]);

  const { loading, error, data } = useSelector(state => state.users);

  if (error && data.length === 0) {
    return (
      <div className={styles.Error}>
        <ErrorPage error={error} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Dashboard loading={loading} user={data} />} />
        <Route path="/add" element={<AddUserPage />} />
        <Route path="/detail/:id" element={<DetailUserPage/>}/>
        <Route path="/edit/:id" element={<EditUserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
