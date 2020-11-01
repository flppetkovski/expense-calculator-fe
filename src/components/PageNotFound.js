import { Translate } from '@material-ui/icons';
import React, {useState} from 'react'
import { Redirect } from "react-router-dom";
import Magnifying from "../img/magnifying-glass.png"
function PageNotFound() {
   const [login, setLogin] = useState(false)

 return (
  <div  style={{height:"100vh", width: "100vw", display: "flex", justifyContent:"center", alignItems:"center", backgroundColor:"0000CD" }}>
  <div style={{ backgroundColor:"#0000CD", height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center" }}  >
    <div style={{fontSize: "1.5rem" , color:"#fff"}}>OOOOOOOPSSSSSSS!</div>
  <div style={{ fontSize: "1.5rem", color:"#fff"}}>PAGE NOT FOUND - 404</div>
  <img src={Magnifying} style={{height: 350, width: 350, marginTop: 50}} />

   <div className="a404" style={{ color:"#fff"}} onClick={()=>{setLogin(true)}}>GO BACK</div>
   </div>
            {login && <Redirect to={"/"}/>}
  </div>
 )
}

export default PageNotFound
