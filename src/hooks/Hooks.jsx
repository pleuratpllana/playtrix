import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useDocumentTitle = (routes) => {
  const location = useLocation();

  useEffect(() => {
    if (!Array.isArray(routes)) {
      console.error("useDocumentTitle: 'routes' is not an array.");
      return;
    }

    const findTitleByPath = (routes, currentPath) => {
      for (const route of routes) {
        // Check if the route path matches the current path
        if (
          (route.path && currentPath.endsWith(route.path)) ||
          (route.index && currentPath === "/")
        ) {
          if (route.title) return route.title;
        }
        // Check child routes recursively
        if (Array.isArray(route.children)) {
          const childTitle = findTitleByPath(route.children, currentPath);
          if (childTitle) return childTitle;
        }
      }
      return null;
    };

    // Get the current title based on the location
    const title = findTitleByPath(routes, location.pathname);
    if (title) {
      document.title = title;
    }
  }, [location, routes]);
};

export default useDocumentTitle;
