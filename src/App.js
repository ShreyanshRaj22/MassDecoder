import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./screens/Home"
import Login from "./screens/Login"
import Signup from "./screens/Signup"
// import Footer from './screens/Footer';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          {/* <Route exact path="/footer" element={<Footer />}></Route> */}
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
