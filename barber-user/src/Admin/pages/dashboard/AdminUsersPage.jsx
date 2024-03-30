import Sidebar from "../../components/Sidebar";
import UsersContent from "../../components/UsersContent";

const AdminUsersPage = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <UsersContent />
    </div>
  );
};

export default AdminUsersPage;
