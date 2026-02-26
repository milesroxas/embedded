import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", label: "Key Tester" },
  { to: "/layers", label: "Layer Viewer" },
  { to: "/pot", label: "Pot Monitor" },
];

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Macro Eleven</div>
      <ul className="navbar-links">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
