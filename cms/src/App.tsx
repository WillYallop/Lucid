import React, { useState } from 'react';
import { BrowserRouter as Router, Routes,  Route } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
// Context
import { 
  LoadingContext, defaultLoadingContext,
  ModalContext, defaultModalState
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
import Error404 from './views/404/Index';
// Components
import MainLayout from './layouts/MainLayout';
import BasicLayout from './layouts/BasicLayout';
import AuthLayout from './layouts/AuthLayout';

const App: React.FC = ({}) => {

  // Modal State
  const [ loadingState, setLoadingState ] = useState(defaultLoadingContext.loadingState);
  const [ modalState, setModalState ] = useState(defaultModalState.modalState);


  return (
    <LoadingContext.Provider value={{ loadingState, setLoadingState }}>
      <ModalContext.Provider value={{ modalState, setModalState }}>
        <ToastProvider 
          placement='bottom-right'
          newestOnTop={true}
          autoDismiss={true}>

          <Router>
            <Routes>

                <Route element={<AuthLayout/>}>
                  <Route path="/signin" element={<SignIn/>}></Route>
                </Route>

                <Route element={<BasicLayout/>}>
                  <Route path="/404" element={<Error404/>}></Route>
                </Route>

                <Route>
                  <Route path="/edit/page/:param" element={<Edit mode={'page'} />}></Route>
                </Route>

                <Route element={<MainLayout/>}>
                  <Route path="/" element={<Dashboard />}></Route>
                  <Route path="/pages" element={<Pages />}></Route>
                  <Route path="/posts/:post_name" element={<Posts />}></Route>
                  <Route path="/media" element={<Media />}></Route>
                  <Route path="/components" element={<Components />}></Route>
                  <Route path="/style" element={<Style />}></Route>
                  <Route path="/settings" element={<Settings />}></Route>
                  <Route path="/edit/component/:param" element={<Edit mode={'component'} />}></Route>
                </Route>

            </Routes>
          </Router>
          
        </ToastProvider>
      </ModalContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;