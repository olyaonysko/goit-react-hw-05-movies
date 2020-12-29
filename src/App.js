import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from './components/AppBar';
import Loader from './components/Loader';
import Container from './components/Container';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "homeView" */),
);

const MoviesView = lazy(() =>
  import('./views/MoviesView' /* webpackChunkName: "moviesView" */),
);

const MoviesDetailsView = lazy(() =>
  import(
    './views/MoviesDetailsView' /* webpackChunkName: "MoviesDetailsView" */
  ),
);

function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>

          <Route path="/movies" exact>
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MoviesDetailsView />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={2000} />
    </Container>
  );
}

export default App;
