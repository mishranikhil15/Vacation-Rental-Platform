import React from 'react'
import HostLogin from '../Components/HostLogin'
import { Route, Routes } from 'react-router-dom'
import HostForm from '../Components/HostForm'
import HostUpdate from '../Components/HostUpdate'
import PropertyForm from '../Components/PropertyForm'
import PropertyList from '../Components/UpdateProperty'
import GuestForm from '../Components/GuestForm'
import GuestLogin from '../Components/GuestLogin'
import GuestUpdate from '../Components/GuestUpdate'
import BookingPropertyList from '../Components/BookingPropertyList'
import BookingForm from '../Components/BookingForm'
import GuestDetails from '../Components/GuestDetail'
import Home from '../Components/Home'



export const AllRoute = () => {
  return (
    <Routes >
        <Route path="/register" element = {<HostForm/>} ></Route>
        <Route path="/login" element = {<HostLogin/>} ></Route>
        
        <Route path="/HostUpdate" element = {<HostUpdate/>} ></Route>
        <Route path="/addProperty" element = {<PropertyForm/>} ></Route>
        <Route path="/updateProperty" element = {<PropertyList/>} ></Route>
        <Route path="/guestRegister" element = {<GuestForm/>} ></Route>
        <Route path="/guestLogin" element = {<GuestLogin/>} ></Route>
        <Route path="/guestUpdate" element = {<GuestUpdate/>} ></Route>
        <Route path="/allProperty" element = {<BookingPropertyList/>} ></Route>
        <Route path="/bookingform" element = {<BookingForm/>} ></Route>
        <Route path="/fetchbooking" element = {<GuestDetails/>} ></Route>
        <Route path="/" element = {<Home/>} ></Route>
       
    </Routes>
  )
}
