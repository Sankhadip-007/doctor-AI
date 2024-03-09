import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Table, message } from 'antd'
import axios from 'axios'
import moment from 'moment'

const DoctorAppointments = () => {
    const [appoinments, setAppointments] = useState([])
    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/doctor/doctor-appointments', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAppointments()
    }, []
    )
    const handleStatus=async(record,status)=>{
        try {
            const res = await axios.post('/api/v1/doctor/update-status',{
                appoinmentsId:record._id,status
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                message.success(res.data.message)
                getAppointments()
            }
        } catch (error) {
            console.log(error)
            message.error('Something went wrong')
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'name',
            dataIndex: 'doctorId',
            render: (text, record) => (
                <span>
                    {record.doctorId.firstName} {record.doctorId.firstName}
                </span>
            )
        },
        {
            title: 'Date & Time',
            dataIndex: '_id',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} &nbsp;
                    {moment(record.time).format('HH:mm')}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className="d-flex">
                    {record.status==='pending' && (
                        <div className="d-flex">
                            <button className='btn btn-success ms-2'
                            onClick={()=>handleStatus(record,'approved')}
                            >Approve</button>
                            <button className='btn btn-danger ms-2'
                            onClick={()=>handleStatus(record,'rejected')}
                            >Reject</button>
                        </div>
                    )}
                </div>
            )
        },
    ]

  return (
    <Layout>
        <h1>Appointments list (Doctor) </h1>
            <Table
            columns={columns} dataSource={appoinments}>               
            </Table>
    </Layout>
  )
}

export default DoctorAppointments