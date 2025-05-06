import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Redirect from '../../pages/Redirect';
import NotFound from '../../pages/NotFound';

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/links/:linkId" element={<Redirect />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
