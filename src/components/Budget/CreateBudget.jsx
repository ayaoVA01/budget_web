import React from 'react'
import {
  Button,
  Form,
  Input,
} from "antd";
const CreateBuget = () => {
  return (
    <div>
     
        <div>
          <h1 className="text-3xl font-bold ">Create your new Budget.</h1>
        </div>
        <div>
          <Form>
            <Form.Item>

              <Input />

            </Form.Item>

          </Form>
        </div>
      
    </div>
  )
}

export default CreateBuget
