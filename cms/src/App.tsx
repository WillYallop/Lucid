import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";
// Views
import Dashboard from './views/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
    </Router>
  );
}

export default App;