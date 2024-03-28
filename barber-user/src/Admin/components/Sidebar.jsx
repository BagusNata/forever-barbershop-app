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
            href="/"
            className="text-decoration-none title"
            style={{ color: "inherit" }}
          >
            Forever Barbershop
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink
              exact
              to="/admin/dashboard"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="fas fa-home-alt">
                Dashboard
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/bookings" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-coins">
                Bookings
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/session" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-clock">
                Sesion
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-users">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/capsters" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-user-tie">
                Capsters
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/services" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-scissors">
                Services
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/admin/testimonies"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="fas fa-comments">
                Testimonies
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <hr />
          <CDBSidebarMenu>
            <NavLink exact to="/signout" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-sign-out-alt">
                Sign Out
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
