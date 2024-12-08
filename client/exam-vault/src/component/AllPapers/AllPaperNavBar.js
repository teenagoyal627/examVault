// import React from 'react'
// import { Link } from 'react-router'

// const AllPaperNavBar = () => {
//   return (
//     <div>
//       <nav>
//         <ul>
//             <li><Link to='/all_paper'>Home</Link></li>
//             <li><Link to='/upload_paper'>Upload Papers</Link></li>
//             <li><Link to='/my_paper'>MyPapers</Link></li>
//             <li><Link to='/stats'>Stats</Link></li>

//         </ul>
//       </nav>
//     </div>
//   )
// }

// export default AllPaperNavBar

// import {
//     Navbar, 
//     NavbarBrand, 
//     NavbarContent, 
//     NavbarItem, 
//     NavbarMenuToggle,
//     NavbarMenu,
//     NavbarMenuItem
//   } from "@nextui-org/navbar";
// // import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/navbar";
// import { Link } from "react-router";

// export default function AllPaperNavBar() {
//   return (
//     <Navbar
//       classNames={{
//         item: [
//           "flex",
//           "relative",
//           "h-full",
//           "items-center",
//           "data-[active=true]:after:content-['']",
//           "data-[active=true]:after:absolute",
//           "data-[active=true]:after:bottom-0",
//           "data-[active=true]:after:left-0",
//           "data-[active=true]:after:right-0",
//           "data-[active=true]:after:h-[2px]",
//           "data-[active=true]:after:rounded-[2px]",
//           "data-[active=true]:after:bg-primary",
//         ],
//       }}
//     >
//       <NavbarBrand>
//         <p className="font-bold text-inherit">Exam Vault</p>
//       </NavbarBrand>
//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <NavbarItem>
//           <Link color="foreground" to='/'>
//             Features
//           </Link>
//         </NavbarItem>
//         <NavbarItem isActive>
//           <Link aria-current="page" href="#">
//             Customers
//           </Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Link color="foreground" href="#">
//             Integrations
//           </Link>
//         </NavbarItem>
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem className="hidden lg:flex">
//           <Link href="#">Login</Link>
//         </NavbarItem>
//         <NavbarItem>
//           <Button as={Link} color="primary" href="#" variant="flat">
//             Sign Up
//           </Button>
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
//   );
// }

