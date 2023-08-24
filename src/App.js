import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Pagenotfound from "./Pagenotfound";
import Addmovie from "./Components/Addmovie";
import Web from "./Components/Mainweb";
import Moviepage from "./Components/Moviepage";
import Signup from "./Components/Signup";
import Search from "./Components/Search";

function App() {
  return (
    <div className="App">
      <Routes scrollRestoration={false}>
        <Route
          scrollRestoration={true}
          path="/"
          element={
            <div>
              <Web />
            </div>
          }
        />
        <Route
          scrollRestoration={false}
          path="/moviedetails/:id"
          element={<Moviepage />}
        />
        <Route
          scrollRestoration={false}
          path="/search/:id"
          element={<Search />}
        />
        <Route scrollRestoration={false} path="/search" element={<Search />} />
        <Route scrollRestoration={false} path="/login" element={<Login />} />
        <Route scrollRestoration={false} path="/signup" element={<Signup />} />
        <Route scrollRestoration={false} path="*" element={<Pagenotfound />} />
        <Route
          scrollRestoration={false}
          path="/admin404"
          element={<Addmovie />}
        />
      </Routes>
    </div>
  );
}

export default App;
