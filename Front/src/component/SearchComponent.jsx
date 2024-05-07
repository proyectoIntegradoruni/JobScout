import React, { useState} from 'react';
import "./App5.css";
import Card from "./tarjeta";
import { Grid } from '@mui/material';



const SearchComponent = () => {
  // Set up state for users and search term
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [cards,setcards] = useState([
    {
     
    
      id: 3,
      title: "Card 3",
      content : "Somos un BPO y nos encontramos en busca de personal apasionado. Perfil Académico: Bachiller. Experiencia Laboral: Experiencia mínima 3 meses en servicio al cliente, Funciones: Brindar asesoría comercial y de servicio a los clientes, realizar proceso de retención de acuerdo a las metricas establecidas por la campana. Devolver oportunamente las llamadas a los clientes cuando se presente corte o caída antes de la finalización o cierre del contacto. Horario: : Lunes a viernes de 7:45 am a 7:30 pm - sábados de 8 am a 1pm 47 horas semanales DOMINGOS Y FESTIVOS NO SE LABORAN Salario: 1.300.000 + Comisiones 650.000 techo + incentivos de internos de aproximadamente $350.000 con prestaciones de Ley + 162.000 Aux transporte legal) con prestaciones de Ley. Sede: Carvajal- cerca al portal el dorado de TransMilenio Seminario/Capa: 15 días presenciales - todos los días son pagos a $15.000 Contrato: Obra labor",
     
      url: "https://example.com/card3",
    },
    {
    id: 4,
    title: "Card 3",
    content : "",
    
    url: "https://example.com/card3",
  },
  {
    id: 3,
    title: "Card 3",
    content : "cdshbcjd cgiysdgc uisdcgids cguis gch9su7 gc7lsicg7lsic gisyc g7syi cgisycgh isuc guisc hyscg sylic gslyic gslicysgcgs8c ngsujgc sycu gscl snbcgsl9 csfcs8cbs csciscgs8c igsvc7sliychbsgcysw",
   
    url: "https://example.com/card3",
  }
  ]);
  
 

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setSearch2(e.target.value);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    if( search == "")
    {
      alert("Debes poner un criterio a buscar")
    }
    else
    {
    try {
      const response = await fetch('http://localhost:4000/api/webScaping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search })
      });
  
      const data = await response.json(); 
      setcards(data)     

      
    } catch (error) {
      console.error('Error en la busqueda:', error);
      alert('Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
    }
  }
  };
  // Render the component
  return (
    <div >
     
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="80" height="30">
        <path fill="#7ED957" d="M224 512c35.3 0 64-28.7 64-64H160c0 35.4 28.7 64 64 64zm215.4-149.7c-19.3-20.8-55.5-52-55.5-154.3 0-77.7-54.5-139.9-127.9-155.2V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v20.8C118.6 68.1 64.1 130.3 64.1 208c0 102.3-36.2 133.5-55.5 154.3-6 6.5-8.7 14.2-8.6 21.7 .1 16.4 13 32 32.1 32h383.8c19.1 0 32-15.6 32.1-32 .1-7.6-2.6-15.3-8.6-21.7z"/>
        </svg>

    <input
    value={search}
    type="text"
    placeholder="Cargo"
    className="form-control rounded-pill" 
    onChange={handleInputChange}
    style={{ marginRight: '10px' }}
    />


    <input
    value={search2}
    type="text"
    placeholder="Lugar"
    className="form-control rounded-pill" 
    onChange={handleInputChange2}
    style={{ marginRight: '10px' }}
    />

    <button  className="boton2" type="submit"    style={{ margin: '50px', padding: 0 }} onClick={handleBuscar}>Buscar</button>

    <div className="d-flex justify-content-center align-items-center h-100">
    <Grid container spacing={3}>
    {cards.map(({ title, content, url, id }) => (
      <Grid item xs={12} sm={6} md={6} lg={6} key={id}> {/* Cambiado a 6 columnas para mostrar 2 en una fila */}
        <Card title={title} content={content} url={url} id={id} />
      </Grid>
    ))}
  </Grid>

    </div>
    </div>
  );
};

export default SearchComponent;
