import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";
// Views
import Dashboard from './views/Dashboard';
import Pages from "./views/Pages/Index";
import Posts from "./views/Posts/Index";
import Media from "./views/Media/Index";
import Components from "./views/Components/Index";
import Style from "./views/Style/Index";
import Settings from "./views/Settings/Index";
import EditComponent from "./views/EditComponent/Index";
import EditPage from "./views/EditPage/Index";


const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/pages" element={<Pages />}></Route>
          <Route path="/posts/:name" element={<Posts />}></Route>

          <Route path="/media" element={<Media />}></Route>
          <Route path="/components" element={<Components />}></Route>
          <Route path="/style" element={<Style />}></Route>
          <Route path="/settings" element={<Settings />}></Route>

          <Route path="/editpage/:_id" element={<EditPage />}></Route>
          <Route path="/editcomponent/:_id" element={<EditComponent />}></Route>
        </Routes>
    </Router>
  );
}

export default App;