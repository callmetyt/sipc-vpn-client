import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LeftMenu from './components/LeftMenu';
import Home from './pages/Home';
import Internate from './pages/Internate';

import './App.scss';

export default function App() {
  return (
    <Router>
      <LeftMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="internate" element={<Internate />} />
      </Routes>
    </Router>
  );
}
