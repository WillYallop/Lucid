import React, { ReactElement, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";
// Context
import { 
  LoadingContext, defaultLoadingContext,
  ModalContext, defaultModalState,
  defaultPageNotificationState, PageNotificationContext 
} from './helper/Context';
// Views
import Dashboard from './views/Dashboard';
import Pages from "./views/Pages/Index";
import Posts from "./views/Posts/Index";
import Media from "./views/Media/Index";
import Components from "./views/Components/Index";
import Style from "./views/Style/Index";
import Settings from "./views/Settings/Index";
import Edit from './views/Edit';

import SignIn from './views/SignIn/Index';
// Components
import MainLayout from './layouts/MainLayout';


const App: React.FC = () => {

  // Modal State
  const [ loadingState, setLoadingState ] = useState(defaultLoadingContext.loadingState);
  const [modalState, setModalState] = useState(defaultModalState.modalState);
  const [ notifications, setNotifications ] = useState(defaultPageNotificationState.notifications);



  return (
    <LoadingContext.Provider value={{ loadingState, setLoadingState }}>
      <ModalContext.Provider value={{ modalState, setModalState }}>
        <PageNotificationContext.Provider value={{ notifications, setNotifications }}>

          <Router>
            <Routes>

              <Route>
                <Route path="/signin" element={<SignIn/>}></Route>
              </Route>

                <Route element={<MainLayout/>}>
                  <Route path="/" element={<Dashboard />}></Route>
                  <Route path="/pages" element={<Pages />}></Route>
                  <Route path="/posts/:name" element={<Posts />}></Route>
                  <Route path="/media" element={<Media />}></Route>
                  <Route path="/components" element={<Components />}></Route>
                  <Route path="/style" element={<Style />}></Route>
                  <Route path="/settings" element={<Settings />}></Route>

                  <Route path="/edit/:mode/:_id" element={<Edit />}></Route>
                </Route>

            </Routes>
          </Router>
          
        </PageNotificationContext.Provider>
      </ModalContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;