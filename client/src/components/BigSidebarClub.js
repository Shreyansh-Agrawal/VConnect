import { useAppContext } from "../context/appContext";
import NavLinksClub from "./NavLinksClub";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";

const BigSidebarClub = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinksClub />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebarClub;
