import { Form, Input, Col, Row, TimePicker, message } from 'antd'
import React from 'react'
import Layout from '../components/layout'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'

const ApplyDoctor = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleFinish = async (values) => {

        try {
            dispatch(showLoading())
            const res = await axios.post(
                '/api/v1/user/apply-doctor', 
                { ...values, userId: user._id,
                    timings:[
                        moment(values.timings[0].format('HH:mm')),
                        moment(values.timings[1].format('HH:mm'))
                    ] }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
            } else {
                message.error("success: false")//
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            dispatch(hideLoading())
            message.error('Somthing went wrong.')
        }
    }
    return (
        <Layout>
            <h1 className='text-center'>Apply doctor</h1>
            <h5>Personal details: </h5>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="firstName" name="firstName"
                            required
                            rules={[{ required: true }]}>
                            <Input type='text' placeholder='your FirstName'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="lastName" name="lastName"
                            required
                            rules={[{ required: true }]}>
                            <Input type='text' placeholder='your Lastname'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="phone" name="phone"
                            required
                            rules={[{ required: true }]}>
                            <Input type='text' placeholder='phone'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="email" name="email"
                            required
                            rules={[{ required: true }]}>
                            <Input type='text' placeholder='email'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="website" name="website">
                            <Input type='text' placeholder='website'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="address" name="address"
                            required
                            rules={[{ required: true }]}>
                            <Input type='text' placeholder='address'></Input>
                        </Form.Item>
                    </Col>
                </Row>

                <h5>Professional details: </h5>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="specialization" name="specialization"
                            required
                            rules={[{ required: true }]}>
                            <Input type='text' placeholder='your specialization'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="experience" name="experience"
                            required
                            rules={[{ required: true }]}>
                            <Input type='text' placeholder='your experience'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="fees" name="fees"
                            required
                            rules={[{ required: true }]}>
                            <Input type='text' placeholder='fees'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="timings" name="timings"
                            required
                            rules={[{ required: true }]}>
                            <TimePicker.RangePicker format="HH:mm"></TimePicker.RangePicker>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end">
                    <button className='btn btn-primary' type='submit' >Submit</button>
                </div>

            </Form>
        </Layout>
    )
}

export default ApplyDoctor