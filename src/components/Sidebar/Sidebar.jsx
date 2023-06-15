import { useEffect, useRef, useState , Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";

const sidebarNavItems = [
  {
    display: "Assistive Chatbot",
    icon: <i className="bx bx-comment-add"></i>,
    to: "/",
    section: "",
  },
  {
    display: "About",
    icon: <i className="bx bx-help-circle"></i>,
    to: "/about",
    section: "about",
  },
  // {
  //   display: "Update",
  //   icon: <i className="bx bx-calendar"></i>,
  //   to: "/update",
  //   section: "update",
  // },
  {
    display: "Integration",
    icon: <i className="bx bx-cog"></i>,
    to: "/integration",
    section: "integration",
  },
  {
    display: "Help & support",
    icon: <i className="bx bx-info-square"></i>,
    to: "/support",
    section: "support",
  },
];

const sidebarNavBottomItems = [
  {
    display: "Chat History",
    icon: <i className="bx bx-history"></i>,
    to: "/chat-history",
    section: "clear",
  },
  {
    display: "Switch Light Mode",
    icon: <i className="bx bx-sun"></i>,
    section: "lightmode",
  },
  {
    display: "FAQs",
    icon: <i className="bx bx-link-external"></i>,
    to: "/faq",
    section: "faq",
  },
  {
    display: "Logout",
    icon: <i className="bx bx-log-out-circle"></i>,
    section: "logout",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sidebarRef = useRef();
  const location = useLocation();

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const getAllConversations = () => {};
  const switchLightMode = () => {
    alert("Switched to light mode.");
  };
  const performLogout = () => {
    alert("Successfully logged out.");
  };

  const handleBottomSidebar = (index) => {
    switch (index) {
      case 0:
        getAllConversations();
        break;
      case 1:
        switchLightMode();
        break;
      case 3:
        performLogout();
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
    <div className="sidebar">
      <div className="sidebar__logo">
        <img
          src="logo.svg"
          alt="AuthentiAI Logo"
          height="30"
          style={{ margin: "5px 10px 5px 0px" }}
        />
        <Link to="/">AuthentiAI</Link>
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
        <div className="sidebar-bottom">
          {sidebarNavBottomItems.map((item, index) => (
            <Link
              to={item.to}
              key={index}
              onClick={() => handleBottomSidebar(index)}
            >
              <div className={`sidebar__menu__item sidebar__menu__item-bottom`}>
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default Sidebar;
