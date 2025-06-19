import { NavLink } from "react-router";
import { HeaderLinks } from "../config/layout";

function Navigation() {
  return (
    <div>
      <nav className="navigation-bar py-3 pr-3 d-flex justify-content-end gap-3">
        {HeaderLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => {
              const names = ["nav-link"];
              if (isActive) {
                names.push("active");
              }
              return names.join(" ");
            }}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export { Navigation };
