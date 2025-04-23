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
import DownloadPaper from './component/AllPapers/MyPaper/DownloadPaper'
import Stats from './component/Stats/Stats'
import NewPaper from './component/AllPapers/NewPapers/NewPaper'
import OpenPaper from './component/AllPapers/NewPapers/OpenPaper'
import Logout from './component/Authentication/Logout/Logout'
import MyProfile from './component/MyProfile/MyProfile'
import HomePage from './HomePage/HomePage'
import UploadNotesForm from './component/AllNotes/UploadNote/UploadNotesForm'
import AllNotes from './component/AllNotes/UplodedNotes/AllNotes'
import MyNotes from './component/AllNotes/MyNotes/MyNotes'

const router=createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
  },
  {
   path:'/registration',
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
    path:'/',
    element:<AllPaper/>,
    children:[

      {
        path:'all_paper',
        element:<CommunityPaper/>
      },
      {
        path:'new_papers',
        element:<NewPaper/>

      },
      {
        path:'new_papers/:id/view_paper',
        element:<OpenPaper/>
    },
      {
        path:'upload_paper/:id?',
        element:<UploadPapers/>
      },
      {
        path:'edit_paper/:id?',
        element:<UploadPapers/>
      },
      {
          path:'all_paper/:id/view_paper',
          element:<DownloadPaper/>
      },
      {
        path:'stats',
        element:<Stats/>

      },
      {
        path:'my_paper',
        element:<MyPaper/>,
        children:[
          {
            path:':id/view_paper',
            element:<DownloadPaper/>
          }
        ]
      },
      {
        path:'my_profile',
        element:<MyProfile/>
      },
      {
        path:'upload_notes',
        element:<UploadNotesForm/>
      },
      {
        path:'all_notes',
        element:<AllNotes/>
      },
      {
        path:'my_notes',
        element:<MyNotes/>,
        children:[
          {
            path:':id/view_paper',
            element:<DownloadPaper/>
          }
        ]
      },
     
     
    ]
  },
  // {
  //   path:"/view_paper",
  //   element:<DownloadPaper/>
  // }
 

])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App


// yogitasharma123@gmail.com yogita123