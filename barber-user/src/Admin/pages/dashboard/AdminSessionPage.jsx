import Sidebar from "../../components/Sidebar";
import SessionsContent from "../../components/SessionsContent";

const AdminSessionPage = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <SessionsContent />
    </div>
  );
};

export default AdminSessionPage;
