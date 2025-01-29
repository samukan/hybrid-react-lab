import {BrowserRouter, Route, Routes} from 'react-router';
import Home from './views/Home';
import Upload from './views/Upload';
import Profile from './views/Profile';
import './App.css';
import Layout from './components/Layout';
import Single from './views/Single';
import Login from './views/login';

const App = () => {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/single" element={<Single />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
