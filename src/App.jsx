import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

// Components
import Header from "./components/ui/header/Header";
import BottomNav from "./components/ui/BottomNav";
import Home from "./components/pages/Home";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import ResultList from "./components/pages/ResultList";
import ItemId from "./components/pages/ItemId";
// import SignIn from './components/auth/SignOut';

// Theme
import theme from "./assets/theme";

const App = () => {
  // [!] placeholder for auth - to do later

  // const [Authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  // 	const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // 	if (currentUser) {
  // 		setAuthenticated(true);
  // 	}
  // }, []);

  // const handleSignOut = () => {
  // 	localStorage.removeItem('currentUser');
  // 	setAuthenticated(false);
  // };

  // [!] IMPORTANT: we need to store on local storage the user's search query and viewed items
  return (
    <ThemeProvider theme={theme}>
      {/* <Header isAuthenticated={Authenticated} handleSignOut={handleSignOut} /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={Authenticated ? <Home /> : <Navigate to="/signin" />} />
					<Route path="/signin" 
						element={!Authenticated ? <SignIn setAuthenticated={setAuthenticated} /> : <Navigate to="/" />} 
						/> */}

        {/* /search route is the first result page */}
        <Route path="/search" element={<SearchResultsPage />} />

        {/* /searchfilter route is the result page after the user has applied filters */}
        <Route path="/searchfilter" element={<ResultList />} />

        {/* permalink for each item */}
        <Route path="/item" element={<ItemId />} />

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      <BottomNav />
    </ThemeProvider>
  );
};

export default App;
