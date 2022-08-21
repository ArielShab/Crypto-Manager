import "./App.css";
import { Routes, Route } from "react-router-dom";
import Coins from "./components/coins";
import About from "./components/about";
import Home from "./components/home";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import SignOut from "./components/signout";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Favorites from "./components/favorites";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100 bg-dark">
      <ToastContainer />
      <header>
        <Navbar />
      </header>
      <main className="flex-fill text-light">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signin" element={<SignIn redirect="/" />} />
          <Route path="/signup" element={<SignUp redirect="/signin" />} />
          <Route path="/signout" element={<SignOut redirect="/" />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
