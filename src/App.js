import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./screens/Login"
import Signup from "./screens/Signup"
import Profile from './screens/Profile';
import Homepage from './screens/HomePage';
import UploadPage from './screens/UploadPage';
// import Footer from './screens/Footer';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/upload" element={<UploadPage />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
