import React, { Component } from "react";
import Headers from "../components/Layout/Header";
import {

  Button,

} from "antd";

import { Link } from "react-router-dom";
import {
  PlusCircleFilled
} from "@ant-design/icons";



const Home = () => {
  return (
    <div>
      <Headers />
      <div className="w-full h-[70vh] flex items-center gap-2 ">
        <div className="mx-auto flex gap-2">
          <Link to='/create'>
            <Button className="w-[100px] h-[100px] border border-blue-600 mx-5">

              <h1>Jion</h1>
            </Button>
          </Link>
          <Link>
            <Button className="w-[100px] h-[100px] border mx-5">

              <PlusCircleFilled />
            </Button>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Home
