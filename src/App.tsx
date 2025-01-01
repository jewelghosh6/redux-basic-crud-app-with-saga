import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsFeed from "./pages/NewsFeed";
import { About } from "./pages/About";
import { UsersList } from "./pages/UsersList";
import { RootLayout } from "./layouts/RootLayout";
import Home from "./pages/Home";
import UserDetails from "./components/UserDetails";

export const  App =() =>{
  return (
      <BrowserRouter>
        <Routes >
          <Route element={<RootLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<NewsFeed />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<UsersList />} />
            <Route path={`/users/:userId`} element={<UserDetails />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
  
}
