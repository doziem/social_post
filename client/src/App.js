import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import { Container } from 'semantic-ui-react'

import "./App.css"


import MenuBar from "./components/MenuBar";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import AuthRoute from "./util/AuthRoute";


const App = () => {

  return (
    <BrowserRouter >
      <Container>
        <MenuBar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route element={<AuthRoute />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path="/posts/:postId" element={<SinglePost />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
