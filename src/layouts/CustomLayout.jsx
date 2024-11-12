// src/layouts/CustomLayout.jsx
import { Outlet } from "react-router-dom";

const CustomLayout = () => {
  return (
    <main>
      <Outlet /> {/* This renders the Landing page */}
    </main>
  );
};

export default CustomLayout;
