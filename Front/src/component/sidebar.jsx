import React, { useState } from "react";

import {FaBars} from "react-icons/fa"
import { NavLink } from "react-router-dom";

import "./sidebar.css"
import { BiVideoRecording } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";

const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  
  const menuItem = [
   
    {
      path: "/camara",
      name: "Reconocer Emociones",
      icon:<BiVideoRecording />
    },
    {
      path: "/history",
      name: "Historial de emociones",
      icon:<MdPeopleAlt />

    }
  ]
  return (
    <div className="container">
      <div style={{width: isOpen ? "300px" : "90px"}} className="sidebar">
        <div className="top_section">
          <h1 style={{display: isOpen ? "block" : "none"}} className="logo">  
          <img src={"/logo.png"} alt="imagen" style={{ width: '5vw', height: '10vh', marginLeft: '10px' }} />

           </h1>
          <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
            <FaBars onClick={toggle}/>
          </div>  
        </div>
        {
            menuItem.map((item,index) => (
              <NavLink to={item.path} key={index} 
              className="link" activeclassName="active">
                <div className="icon">{item.icon} </div>
                <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name} </div>
              </NavLink>
            ))
          }
      </div>
      <div style={{ width: isOpen ? "calc(100% - 300px)" : "calc(100% - 90px)" }} className="top_sectionp">
    <h3 style={{ fontSize: '40px', color: '#88DFF2' }}>Bienvenidos a AEVA</h3>
            <h3 className='Descripcion'>Analizador de Emociones Visuales </h3> 
            <h3 className='Conten'>Con AEVA podras reconocer las emociones<br></br>
             o expresiones faciales de los demás en <br></br>
             tiempo real. </h3>
             
             <h3 className='Conten'>En la parte izquierda encontras el Historial de emociones que reconocemos y la camara para que practiques. </h3> </div> 

      <main>{children} </main>
    </div>
  );
}

export default Sidebar;