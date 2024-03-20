import { useRoutes } from "react-router";
import Home from "./pages/Home";
import Search from "./pages/Search";
import DetailMovie from "./pages/DetailMovie";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/search/:userId", element: <Search /> },
  { path: "/movie/:userId", element: <DetailMovie /> },
];

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

export default AppRoutes;
