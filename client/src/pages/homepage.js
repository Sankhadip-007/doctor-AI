import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/layout'
import {Row,Col} from 'antd'
import DoctorList from '../components/DoctorList'

const Homepage = () => {
  const [doctors,setDoctors]=useState([])
  // login user data
  const getUserData = async () => {
   try{
    const res = await axios.get('/api/v1/user/getAllDoctors',{
      headers:{
        Authorization:"Bearer "+localStorage.getItem('token')
      }
    })
      if(res.data.success){
        setDoctors(res.data.data)
      }
   }catch(err){
    console.log(err)
   }
  }
  useEffect(() => {
    getUserData()
  }
    , [])
  return (
    <Layout>
      <h1 className='m-2'>HomePage</h1>
      <Row>
        {doctors && doctors.map(doctor =>(
          <DoctorList doctor={doctor}/>
          
        ) )}
      </Row>
    </Layout>
  )
}

export default Homepage