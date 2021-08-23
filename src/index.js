import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LandingPage from "./pages/LandingPage";
import PlatformPage from "./pages/PlatformPage";
import {BrowserRouter, Route} from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <div>
                <Route exact path="/l-v-l">
                    <LandingPage/>
                </Route>
                <Route exact path="/l-v-l/platform">
                    <PlatformPage/>
                </Route>
            </div>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
