import React,{useState} from 'react'
import '../styles/style.css'

import SettingsIcon from '@mui/icons-material/Settings';
function Navbar() {
  const [open,setOpen] = useState(false)
  const css = `.setting-icon{
    transform: rotate(-50deg);
  }`
  return (
    <div class='navbar'>
      <div class='setting-icon'>
        <SettingsIcon onClick={() =>setOpen(!open)}/>
        </div>
      {open && <style>
           {css}
        </style>}
        <div class='menu'>
          <div>
          <input type="checkbox" name="" id="" /> Dark Mode
          </div>
          <br />
          <div>
          <input type="checkbox" name="" id="" /> big Letter
          </div>
        </div>
    </div>
  )
}

export default Navbar