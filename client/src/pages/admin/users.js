import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import axios from 'axios'
import { message, Table } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import { showLoading, hideLoading } from '../../redux/features/alertSlice'

const Users = () => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    try {
      const res = await axios.get(
        '/api/v1/admin/getAllUsers',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
      if (res.data.success) {
        setUsers(res.data.data)
      } 
    } catch (error) {
      console.log(error)
    }
  }//
  // antd table column
  const columns=[
    {
      title:"Name",
      dataIndex:"name",
    },
    {
      title:"Email",
      dataIndex:"email",
    },
    {
      title:"Doctor",
      dataIndex:"isDoctor",
      render:(text,record)=>(
        <span>{record.isDoctor?"Yes":"No"}</span>
      )
    },
    {
      title:"Actions",
      dataIndex:'actions',
      render:(text,record)=>(
        <div className="d-flex">
        <button className='btn btn-danger'>Block</button>
        </div>
      )
    }
  ]
  useEffect(()=>{
    getUsers()
  },[])
  return (
    <Layout>
      <h2 className='m-2'>Users</h2>
      <Table columns={columns} dataSource={users}></Table>
    </Layout>
  )
}

export default Users;