import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage'
import Login from './pages/login'
import Register from './pages/register'
import { useSelector } from 'react-redux'
import Spinner from './components/spinner'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ApplyDoctor from './pages/ApplyDoctor'
import NotificationPage from './pages/NotificationPage'
import Users from './pages/admin/users'
import Doctors from './pages/admin/Doctors'
import Profile from './pages/doctor/Profile'
import BookingPage from './pages/BookingPage'
import Appointments from './pages/Appointments'
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import Ai_tools from './pages/Ai_tools'

function App() {
  const { loading } = useSelector((state) => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? (<Spinner />) :
          (<Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }></Route>
            <Route path='/login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }></Route>
            <Route path='/register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }></Route>
            <Route path='/apply-doctor' element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }></Route>
            <Route path='/notification' element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            }></Route>
            <Route path='/admin/users' element={
              <ProtectedRoute>
                <Users></Users>
              </ProtectedRoute>
            }></Route>
            <Route path='/admin/doctors' element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }></Route>
            <Route path='/doctor/profile/:id' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }></Route>
            <Route path='/doctor/book-appointment/:doctorId' element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }></Route>
            <Route path='/appointments' element={
              <ProtectedRoute>
                <Appointments></Appointments>
              </ProtectedRoute>
            }></Route>
            <Route path='/doctor-appointments' element={
              <ProtectedRoute>
                <DoctorAppointments></DoctorAppointments>
              </ProtectedRoute>
            }></Route>
            <Route path='/ai-tools' element={
              <ProtectedRoute>
                <Ai_tools></Ai_tools>
              </ProtectedRoute>
            }></Route>
          </Routes>)
        }

      </BrowserRouter>
    </>
  );
}

export default App;
