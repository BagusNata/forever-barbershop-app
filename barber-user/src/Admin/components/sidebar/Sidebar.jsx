import "./sidebar.css";
import { ItemsSidebar } from "./items-sidebar/ItemsSidebar";

export const Sidebar = () => {
  return (
    <div className="sidebar min-vh-100">
      <div className="logo-sidebar">
        <img src="./brand-transparent.webp" alt="Logo" width="130" />
      </div>
      <ItemsSidebar />
    </div>
  );
};
