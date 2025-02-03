import { lazy, Suspense } from "react";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NewsFeed from "./pages/NewsFeed";
const NewsFeed = lazy(() => import('./pages/NewsFeed.js')); // Lazy-loaded for code-splitting
import About from "./pages/About";
const UsersList = lazy(() => import('./pages/UsersList.js'));
// const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

import { RootLayout } from "./layouts/RootLayout";
import Home from "./pages/Home";
import UserDetails from "./components/UserDetails";
import SignIn from "./pages/SignIn";
import { LoadingOverlay } from "@mantine/core";
import VideoPage from "./pages/VideoPage.js";

import Formtest from "./pages/Formtest";
import Formtest2 from "./pages/Formtest2.js";
import TestPage from "./pages/TestPage.js";
export const  App =() =>{
  return (
      <BrowserRouter>
        <Routes >
          <Route element={<RootLayout />} >
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/feed" 
            element={
            <Suspense 
            fallback={
              <LoadingOverlay
                visible={true} // Always visible when Suspense is active
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
              />}
            >
               <NewsFeed /> 
            </Suspense>} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Suspense fallback={<div>Loading...</div>} ><UsersList /> </Suspense>} />
            <Route path={`/users/:userId`} element={<UserDetails />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/form" element={<Formtest />} />
            <Route path="/form2" element={<Formtest2 />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
  
}
