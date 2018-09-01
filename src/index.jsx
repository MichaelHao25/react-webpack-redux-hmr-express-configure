

import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";

import configureStore from "./store";

const store = configureStore();

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import App from "./components/App";
import Games from "./components/GamesPage";
import GameFormPage from "./components/GameFormPage";




const Hmr = () => <Provider store={store}>
    <Router>
        <div className="ui container">
            <div className="ui three item menu">
                <NavLink exact to="/" className="item">Home</NavLink>
                <NavLink exact to="/games" className="item">Games</NavLink>
                <NavLink to="/games/new" className="item">Add New Games</NavLink>
            </div>
            <Route exact path="/" component={App} />
            <Route exact path="/games" component={Games} />
            <Route path="/games/new" component={GameFormPage} />
            <Route path="/game/:_id" component={GameFormPage}/>
        </div>
    </Router>
</Provider>


ReactDom.render(
    <Hmr />,
    document.getElementById('app')
)

if (module.hot) {
    module.hot.accept();
}