import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LeftMenu from './components/LeftMenu';
import Home from './pages/Home';
import Internate from './pages/Internate';
import Setting from './pages/Setting';
import Help from './pages/Help';

import './App.scss';

export default function App() {
  return (
    <Router>
      <LeftMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="internate" element={<Internate />} />
        <Route path="setting" element={<Setting />} />
        <Route path="help" element={<Help />} />
      </Routes>
    </Router>
  );
}
