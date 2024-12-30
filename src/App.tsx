import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsFeed from "./pages/NewsFeed";
import { About } from "./pages/About";
import { UsersList } from "./pages/UsersList";
import { RootLayout } from "./layouts/RootLayout";

export const  App =() =>{
  return (
      <BrowserRouter>
        <Routes >
          <Route element={<RootLayout />} >
            <Route path="/" element={<NewsFeed />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<UsersList/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
  
}
