import React from "react";
import { NavLink } from "react-router-dom";

import { NAV_ITEMS } from "@/constants/navigation";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="item-row">
        {NAV_ITEMS.map((item) => (
          <li key={item.id} className="relative group">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `text-[12.5px] font-medium px-6 py-2 ${isActive ? "text-primary" : ""}`
              }
              end={true}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
