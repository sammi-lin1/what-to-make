import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ReactDOM from "react-dom/client";
import StrictMode from "react";
import "./index.css";
import HomePage from "./screens/HomePage";
import BrowsePage from "./screens/BrowsePage";
import RecipePage from "./screens/RecipePage";
import AboutPage from "./screens/AboutPage";
import { RecipeProvider } from "./RecipeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecipeProvider>
    <BrowserRouter>
      <header>
        <nav className="nav-container">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          {/* <NavLink className="nav-link" to="/browse">
            Browse
          </NavLink> */}
          {/* TODO: Bring Browsing to v2 of this website */}
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<HomePage />}></Route>
          {/* <Route path="/browse" element={<BrowsePage />}></Route> */}
          <Route path="/recipe/:id" element={<RecipePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  </RecipeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
