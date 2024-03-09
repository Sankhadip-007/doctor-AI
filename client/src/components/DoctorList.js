import { Cursor } from 'mongoose'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const DoctorList = ({ doctor }) => {
    const navigate=useNavigate()
    return (
        <div className="card bg-light mb-3 m-2" 
        onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}
        style={{cursor:"pointer"}}>
            <div className="card-header">
                Dr. {doctor.firstName} {doctor.lastName}
            </div>
            <div className="card-body">
                <p>
                    <b>Specialization:</b> {doctor.specialization}
                </p>
                <p>
                    <b>Experience:</b> {doctor.experience}
                </p>
                <p>
                    <b>Fees:</b> {doctor.fees}
                </p>
                <p>
                    <b>Timings:</b> {doctor.timings[0]} to {doctor.timings[1]}
                </p>
            </div>
        </div>
    )
}

export default DoctorList