import React from 'react';
import {Router, Route, Link, Redirect, hashHistory} from 'react-router';

const Home = () => <div><h1>Home</h1><Links /></div>;
const About = () => <div><h1>About Us</h1><Links /></div>;
const Contact = () => <div><h1>Contact</h1><Links /></div>;

const Links = () =>
    <nav>
        <Link to="/">Home</Link>
        <Link to="about-us">About Us</Link>
        <Link to="about">About</Link>
        <Link to="contact">Contact</Link>
    </nav>

const App = () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Home}></Route>
            <Route path="/about-us" component={About}></Route>
            <Route path="/contact" component={Contact}></Route>
            <Redirect from="/about" to="/about-us"></Redirect>
        </Router>
    );
}

export default App;
