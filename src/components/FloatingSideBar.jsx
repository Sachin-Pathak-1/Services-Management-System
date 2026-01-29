import "./FloatingSideBar.css";

export function FloatingSideBar() {
  return (
    <div className="floating-sidebar">
      <ul className="sidebar-list">
        <li>
          <a href="#home" className="sidebar-link">Profile</a>
        </li>
        <li>
          <a href="#services" className="sidebar-link">Services</a>
        </li>
        <li>
          <a href="/customers" className="sidebar-link">Clients</a>
        </li>
        <li>
          <a href="#contact" className="sidebar-link">Appointments</a>
        </li>
      </ul>
    </div>
  );
}
