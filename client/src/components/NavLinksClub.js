import { linksClub } from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinksClub = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {linksClub.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinksClub;
