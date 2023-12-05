import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../src/pages/homepage/Homepage';
import Profile from '../src/pages/profile/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
