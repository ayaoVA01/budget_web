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
      <div className="w-full h-[70vh] text-center ">
        <div className="my-[10%]">
          <Link to='/join' className="">
            <Button className="md:w-[300px] md:h-[200px] sm-max:h-[100px] sm-max:w-[200px]  border m-5 border-blue-600">
              <h1 className="md:text-[30px] sm:text-[20px]">JOIN</h1>
            </Button>
          </Link>
          <Link to='/create' className="">
            <Button className="md:w-[300px] md:h-[200px] sm-max:h-[100px] sm-max:w-[200px] border">
              <PlusCircleFilled className="text-[50px]  text-blue-500"/>
            </Button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home
