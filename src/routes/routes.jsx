// src/routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/Default";
import CustomLayout from "../layouts/CustomLayout";
import Dashboard from "../pages/Dashboard";
import Songs from "../pages/Songs";
import Albums from "../pages/Albums";
import Artists from "../pages/Artists";
import Playlists from "../pages/Playlists";
import Genres from "../pages/Genres";
import MyAccount from "../pages/MyAccount";
import FAQs from "../pages/FAQs";
import Landing from "../pages/Landing";
import Error404 from "../pages/Error404";

export const routes = [
  {
    path: "/",
    element: <CustomLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        title: "Welcome - PlayTrix",
      },
      {
        path: "*", // This will match all undefined routes
        element: <Error404 />, // Render the Error404 component
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        title: "Dashboard - PlayTrix",
      },
      {
        path: "songs",
        element: <Songs />,
        title: "Songs - PlayTrix",
      },
      {
        path: "albums",
        element: <Albums />,
        title: "Albums - PlayTrix",
      },
      {
        path: "artists",
        element: <Artists />,
        title: "Artists - PlayTrix",
      },
      {
        path: "playlists",
        element: <Playlists />,
        title: "Playlists - PlayTrix",
      },
      {
        path: "genres",
        element: <Genres />,
        title: "Genres - PlayTrix",
      },
      {
        path: "myaccount",
        element: <MyAccount />,
        title: "My Account - PlayTrix",
      },
      {
        path: "faqs",
        element: <FAQs />,
        title: "FAQs - PlayTrix",
      },
      // Remove the error route from here
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
