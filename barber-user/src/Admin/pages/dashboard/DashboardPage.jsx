import Sidebar from "../../components/Sidebar";
import DashboardContent from "../../components/DashboardContent";

const DashboardPage = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default DashboardPage;
