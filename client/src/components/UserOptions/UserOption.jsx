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
import {useDispatch} from "react-redux"
import {logoutUser} from "../../store/reducers/UserReducer"
export default function UserOption({ user }) {
  const [open,setOpen]=useState(false)
  const dispatch=useDispatch()
  const actions = [
    
    { icon: <ViewListIcon />, name: 'Orders' },
    { icon: <PersonIcon />, name: 'Profile' },  
    {icon:<ShoppingCartIcon/>,name:"Cart"},
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
        icon={<Avatar alt={user.user.email} src={user.user.avatar.url} />}
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
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
