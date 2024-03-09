import Layout from '../components/layout'
import React from 'react'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NotificationPage = () => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/get-all-notification',
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            dispatch(hideLoading())
            message.error("something went wrong")
        }
    }
    const handleDeleteAllRead = async (req, res) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/delete-all-notification',
                { userId: user._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            dispatch(hideLoading())
            message.error("something went wrong")
        }
    }
    return (
        <Layout>
            <h4 className='m-3 text-center'>Notification</h4>
            <Tabs>
                <Tabs.TabPane tab="unRead" key={0}>
                    <div className="d-flex justify-content-end">
                        <h6 className='p-2' onClick={() => {
                            handleMarkAllRead()
                        }}
                            style={{ cursor: "pointer" }}
                        >Mark All Read</h6>
                    </div>
                    {
                        <div>Total unread: {user?.notification.length}
                        </div>

                    }
                    {
                       
                        user?.notification.map((notificationMsg) => (
                            <div className="card"
                                onClick={() => navigate(notificationMsg.onClickPath)} style={{ cursor: "pointer" }}>
                                <div className="card-text">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                       
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        <h6 className='p-2' onClick={() => {
                            handleDeleteAllRead()
                        }}
                        style={{ cursor: "pointer" }}
                        >Delete All Read</h6>
                    </div>
                    {

                        user?.seennotification.map((notificationMsg) => (
                            <div className="card"
                                onClick={() => navigate(notificationMsg.onClickPath)} style={{ cursor: "pointer" }}>
                                <div className="card-text">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>

            </Tabs>



        </Layout>

    )
}

export default NotificationPage