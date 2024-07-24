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
      <div className="w-full h-[70vh] flex items-center px-10">
        <div className="mx-auto lg:flex  gap-2 ">
          <Link to='/join' className="">
            <Button className="w-[300px] h-[200px] border mx-5 border-blue-600">
              <h1>JOIN</h1>
            </Button>
          </Link>
          <Link to='/create'>
            <Button className="w-[300px] h-[200px] border mx-5 lg:mt-0 mt-5">
              <PlusCircleFilled className="text-[50px] text-blue-500"/>
            </Button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home
