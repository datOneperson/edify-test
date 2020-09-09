import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface DelayMenuProps {
    delay: 0 | 1 | 2
    updateDelay: (delay: 0 | 1 | 2) => void
}

export default ({delay, updateDelay}: DelayMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<EventTarget & Element | null>(null);
  
    const handleClick = (event: React.MouseEvent) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <div>
        <Button onClick={handleClick}>Open Menu</Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        </div>
    )
}