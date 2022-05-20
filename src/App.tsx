import { FC, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserPage from './components/UserPage';
import { useSelector } from './hooks/useTypedSelector';
import { userActions, postActions } from './store';
import styles from "./styles/App.module.css";
import ErrorPage from './components/ErrorPage';
import { Route, Routes } from 'react-router-dom';


import NotFound from './components/NotFound';
import UserDetailPage from './components/UserDetailPage';
import { Layout } from "./layout/index";
import PostPage from './components/PostPage';
import PostDetailPage from './components/PostDetailPage';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getUsers());
    dispatch(postActions.getPosts());
  }, [dispatch]);

  const { loading, error, data } = useSelector(state => state.users);

  const { dataPost } = useSelector(state => state.posts);

  if (error && data.length && dataPost.length === 0) {
    return (
      <div className={styles.Error}>
        <ErrorPage error={error} />
      </div>
    )
  }

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/user" element={<UserPage loading={loading} user={data} />} />
            <Route path="/user/detail/:id" element={<UserDetailPage />} />
            <Route path="/post" element={<PostPage loading={loading} post={dataPost} />} />
            <Route path="/post/detail/:id" element={<PostDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
