import React from "react";
import "../styles/LayoutStyle.css";
import { adminMenu, userMenu } from "./../Data/Data";
import { useSelector, useDispatch } from "react-redux"
import { message, Avatar, Badge, Space } from 'antd'
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";



const Layout = ({ children }) => {
  const { user } = useSelector(state => state.user)
  const location = useLocation();
  const navigate = useNavigate()
  //logout func
  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully')
    navigate("/login")
  }


  // doctor menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "AI Tools",
      path: `/ai-tools`,
      icon: "fa-solid fa-code-branch",
    },

  ];
  // rendering menu
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
      ? doctorMenu : userMenu
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="Login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">Header</div>
            <div className="header-content" style={{ cursor: "pointer" }} >
              <Badge count={user?.notification.length}
                onClick={() => { navigate('/notification') }}

              >
                <i className="fa-solid fa-bell" ></i>
              </Badge>

              <Link to='/profile'>{user?.name}</Link>
            </div>

            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;