import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './views/Home';
import Upload from './views/Upload';
import Profile from './views/Profile';
import './App.css';
import Layout from './components/Layout';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
