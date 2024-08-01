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
    <>
      <div className="w-full h-[85vh] mx-auto sm:max-w-[70rem] md:mt-0 xl:p-0">
        <Headers />
        <div className="w-full text-center p-6  bg-white  space-y-4 sm:p-8 rounded-lg border border-b-0 border-r-0 border-l-0 border-gray-200">
          <div className="my-[5%]">
            <Link to='/join' className="">
              <Button className="md:w-[300px] md:h-[150px] sm-max:h-[100px] sm-max:w-[200px]  border m-5 border-blue-600">
                <h1 className="md:text-[30px] sm:text-[20px]">JOIN</h1>
              </Button>
            </Link>
            <Link to='/create' className="">
              <Button className="md:w-[300px] md:h-[150px] sm-max:h-[100px] sm-max:w-[200px] border">
                <PlusCircleFilled className="text-[50px]  text-blue-500" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
