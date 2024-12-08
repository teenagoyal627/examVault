import React from 'react'
import {  createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Login from './component/Authentication/Login/Login'
import FrontPage from './component/FrontPage/FrontPage'
import TeacherRegistration from './component/Authentication/Registration/Forms/RegistrationForms/TeacherRegistration'
import StudentRegistration from './component/Authentication/Registration/Forms/RegistrationForms/StudentRegistration'
import AllPaper from './component/AllPapers/AllPaper'


const router=createBrowserRouter([
  {
   path:'/',
   element:<FrontPage/>
  },
  {
    path:'/teacher_form',
    element:<TeacherRegistration/>
  },
  {
    path:'/student_form',
    element:<StudentRegistration/>
  },
  {
    path:'/login_form',
    element:<Login/>
  },
  {
    path:'/all_paper',
    element:<AllPaper/>
  }

])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
