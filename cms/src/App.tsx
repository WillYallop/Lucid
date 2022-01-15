import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// Views
import Home from './views/Home';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
    </Router>
  );
}

export default App;