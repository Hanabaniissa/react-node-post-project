import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import {Link} from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {

    return (
        <div className="App container">
            <div className="navbar">
                <Link to="/">Home Page</Link>
                <Link to="/createpost">Create A Post</Link>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
            </div>
            <Routes>
                //exact => it never renders more than one route at the same time
                <Route path="/" exact element={<Home/>}/>
                <Route path="/createpost" element={<CreatePost/>}/>
                <Route path="/post/:id" element={<Post/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>


            </Routes>
        </div>
    );
}

export default App;
