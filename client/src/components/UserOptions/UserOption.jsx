import  {React,useState} from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Backdrop from '@mui/material/Backdrop';
import {useDispatch, useSelector} from "react-redux"
import {logoutUser} from "../../store/reducers/UserReducer"
import {useNavigate} from "react-router-dom"
export default function UserOption({ user }) {
  const [open,setOpen]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const items=useSelector(state=>state.Cart.items)

  const actions = [
    { icon: <ViewListIcon />, name: 'Orders',onClick: () => navigate("/orders")},
    { icon: <PersonIcon />, name: 'Profile',onClick: () => navigate("/account") },  
    {icon:<ShoppingCartIcon style={{color:items.length>0?"tomato":"unset"}}/>,name:`(${items.length}) Cart`,onClick: () => navigate("/cart")},
    {icon:<LogoutIcon/>,name:"Logout", onClick: () => dispatch(logoutUser())},
  ];

  if (user.user.role === 'admin') {
    actions.unshift({ icon: <DashboardIcon />, name: 'DashBoard' });
  }

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1,position: 'fixed', bottom: 16, right: 16,zIndex:"999" }}>
         
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<Avatar alt={user.user.name|| user.user.email} src={user.user.avatar.url} />}
        onOpen={()=>setOpen(true)}
        onClose={()=>setOpen(false)}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}

            tooltipOpen={window.innerWidth<786?true:false}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
