import { NavLink } from "react-router";
import { HeaderLinks } from "../config/layout";

function Navigation() {
  return (
    <div>
      <nav className="bg-[#141d2f] py-4 pr-4 flex justify-end gap-4">
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
