import Sidebar from "../../components/Sidebar";
import BookingsContent from "../../components/BookingsContent";

const AdminBookingsPage = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <BookingsContent />
    </div>
  );
};

export default AdminBookingsPage;
