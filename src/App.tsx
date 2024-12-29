import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsFeed from "./pages/NewsFeed";
import { About } from "./pages/About";
import { UsersList } from "./pages/UsersList";

export const  App =() =>{
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<UsersList/>} />
        </Routes>
      </BrowserRouter>
  )
  
}
