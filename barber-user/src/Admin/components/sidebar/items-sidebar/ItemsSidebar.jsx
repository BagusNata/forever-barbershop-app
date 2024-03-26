import "./itemsSidebar.css";

export const ItemsSidebar = () => {
  const itemList = [
    { id: 1, name: "Dashboard", class: "fas fa-home-alt" },
    { id: 2, name: "Booking", class: "fas fa-coins" },
    { id: 3, name: "Sesi", class: "fas fa-clock" },
    { id: 4, name: "User", class: "fas fa-users" },
    { id: 5, name: "Capster", class: "fas fa-user-tie" },
    { id: 6, name: "Service", class: "fas fa-scissors" },
    { id: 7, name: "Testimonial", class: "fas fa-comments" },
    { id: 8, name: "Exit", class: "fas fa-sign-out-alt" },
  ];

  return (
    <div className="sidebar-menu flex-grow-1">
      {itemList.map((data) => (
        <a href="#" key={data.id}>
          <i className={data.class}></i> {data.name}
        </a>
      ))}
    </div>
  );
};
