import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "../assets/sidebar.css";

const Sidebar = () => {
  return (
    <div>
      <CDBSidebar className="sidebar min-vh-100 d-flex">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/admin/bookings"
            className="text-decoration-none title"
            style={{ color: "inherit" }}
          >
            Forever Barbershop
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink exact="true" to="/admin/bookings" className="nav-link">
              <CDBSidebarMenuItem icon="fas fa-coins">
                Bookings
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/admin/sessions" className="nav-link">
              <CDBSidebarMenuItem icon="fas fa-clock">
                Sesion
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/admin/users" className="nav-link">
              <CDBSidebarMenuItem icon="fas fa-users">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/admin/capsters" className="nav-link">
              <CDBSidebarMenuItem icon="fas fa-user-tie">
                Capsters
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/admin/services" className="nav-link">
              <CDBSidebarMenuItem icon="fas fa-scissors">
                Services
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/admin/testimonies" className="nav-link">
              <CDBSidebarMenuItem icon="fas fa-comments">
                Testimonies
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
          <hr />
          <CDBSidebarMenu>
            <NavLink exact="true" to="/signout" className="nav-link">
              <CDBSidebarMenuItem icon="fas fa-sign-out-alt">
                Sign Out
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="sidebar-footer">
          <div>
            Made with <span className="footer-love">&#10084;</span> by
          </div>
          <a
            href="https://www.instagram.com/bagusnataa/"
            target="_blank"
            rel="noreferrer"
          >
            Bagus Nata
          </a>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
