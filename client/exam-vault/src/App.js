import React from 'react'
import {  createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Login from './component/Authentication/Login/Login'
import FrontPage from './component/FrontPage/FrontPage'
import TeacherRegistration from './component/Authentication/Registration/Forms/RegistrationForms/TeacherRegistration'
import StudentRegistration from './component/Authentication/Registration/Forms/RegistrationForms/StudentRegistration'
import AllPaper from './component/AllPapers/AllPaper'
import UploadPapers from './component/AllPapers/UploadPaper/UploadPapers'
import MyPaper from './component/AllPapers/MyPaper/MyPaper'
import CommunityPaper from './component/AllPapers/CommunityPaper/CommunityPaper'

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
    element:<AllPaper/>,
    children:[

      {
        path:'home',
        element:<CommunityPaper/>
      },
      {
        path:'upload_paper',
        element:<UploadPapers/>
      },
      {
        path:'my_paper',
        element:<MyPaper/>
      }
    ]
  },


])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
