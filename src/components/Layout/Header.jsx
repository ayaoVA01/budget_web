
import React from "react";
import {
  Layout,
  Menu,
} from "antd";
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";



const { Header, Footer, Content } = Layout;

const profile = [
  <svg
    data-v-4ebdc598=""
    width="40"
    height="40"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];


const Headers = () => {
  return (
    <div className="top-0 ">
      <Header className="bg-white mt-5 ">

        <div className="header-col header-nav">
          <Menu mode="horizontal" className="justify-between">

            <div className="flex items-center gap-2" >
              <img className="w-[50px] h-[50px] object-cover" src={logo} alt="LOgo" />
              <h1 className="font-bold text-lg">BUDGET</h1>
            </div>

            <Menu.Item  >
              <Link to="/profile">
                {profile}
              </Link>
            </Menu.Item>
          </Menu>
        </div>

      </Header>
    </div>
  )
}

export default Headers
