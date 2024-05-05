import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { GoArrowRight } from "react-icons/go";
import { MdSlowMotionVideo } from "react-icons/md";
import { MdOutlineMotionPhotosPause } from "react-icons/md";
import { green } from '@mui/material/colors';
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { LuVideoOff } from "react-icons/lu";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "user"
};

export const WebcamCapture = () => {
    const [image, setImage] = useState('');
    const [urlImg, setUrlImg] = useState('')
    const navigate = useNavigate();
    const handleRegreso = (e) => {
      e.preventDefault();
      navigate('/home');
    };
    const [isCameraActive, setIsCameraActive] = useState(false);
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [capturedImages, setCapturedImages] = useState([]);
    const [imageCaptureIntervalId, setImageCaptureIntervalId] = useState(null);
    const [responseText, setResponseText] = useState('');


    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
       
    
        // Iniciar la grabación de video
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        
        mediaRecorderRef.current.start();
        
        // Capturar imágenes cada 3 segundos
        const imageCaptureInterval = setInterval(() => {
            const imageSrc = webcamRef.current.getScreenshot({ screenshotFormat: 'image/jpeg' });

            
            // Enviar la imagen al backend de Django
            const dataToSend = {
                nombre: 'Ejemplo',
                edad: 25,
                foto: imageSrc,
            };

            
            const url = 'http://localhost:8000/api/ia'
            axios.post(url, dataToSend)
            .then(response => {
                console.log(response.data);
                const responseData = response.data;
                setResponseText(responseData); // Actualiza el estado con el texto de la respuesta
               
                
                // Maneja la respuesta de la vista de Django aquí
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
               
            });
            
            setCapturedImages(prevImages => [...prevImages, imageSrc]);

        }, 6000);
    
            setImageCaptureIntervalId(imageCaptureInterval);
       
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    
    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks],
        ({ data }) => {
            if (data.size > 0) {
                const imageUrl = URL.createObjectURL(data);
                setImage(imageUrl);
            }
        },
        [setImage]
    );

    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setCapturing(false);
            clearInterval(imageCaptureIntervalId); // Limpiar el intervalo de captura de imágenes
            setCapturedImages([]); // Limpiar las imágenes capturadas
        }
    }, [mediaRecorderRef, setCapturing, imageCaptureIntervalId]);
    
    

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const toggleCamera = useCallback(() => {
        setIsCameraActive((prev) => !prev);
        if (!isCameraActive) {
            clearInterval(imageCaptureIntervalId); // Limpiar el intervalo de captura de imágenes
            setCapturedImages([]); // Limpiar las imágenes capturadas
        }
    }, []);

    return (
        <div className="webcam-container" style={{ height: '100%', backgroundColor: '#D2D8D9',  }}>
             <header className="Inicio-arriba">
            <div className="superior-izquierdo">
            <div style={{ display: 'flex', alignItems: 'center',right: '30px' }}>
                    
                    <img src={"/logo.png"} alt="Placeholder" style={{ width: '5vw', height: '10vh', marginLeft: '10px' }} />
                    <p>AEVA</p>
                </div>

                
            </div>
            
            <div className="Superior-derecho">
            <div
                    style={{
                        backgroundColor: '#ffffff',
                        padding: '10px', 
                        borderRadius: '100%', 
                        position: 'absolute',
                        top: '10px',
                        right: '30px'
                    }}
                >
                    <GoArrowRight onClick={handleRegreso}
                        style={{
                            color: '#000000',
                            fontSize: '30px'
                        }}
                    />
                </div>
            </div>
        </header>
        {isCameraActive ? (
                <Webcam
                    audio={true}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    style={{ width: '65%', height: '85%', padding: "30px" }}
                />
            ) : (
                <LuVideoOff   style={{ width: window.innerWidth * 0.6,
                    height: window.innerHeight * 0.75,
                    padding: "30px",
                 border: "2px solid black" }} />

            )}
            <div >
            {isCameraActive ? (
                    <BsFillCameraVideoOffFill onClick={toggleCamera} style={{ fontSize: '50px', color: '#000000' }} />
                ) : (
                    <BsFillCameraVideoFill   onClick={toggleCamera} style={{ fontSize: '50px', color: '#000000' }}  />
                )}
                {capturing ? (
                     <MdOutlineMotionPhotosPause  onClick={handleStopCaptureClick}   style={{
                        color: '#000000',
                        fontSize: '50px'
                    }} />
                   
                ) : (
                    <MdSlowMotionVideo  onClick={handleStartCaptureClick}  style={{
                        color: '#000000',
                        fontSize: '50px'
                    }} />

                  
                )}
                {recordedChunks.length > 0 && (
                    
                    <FaDownload  onClick={handleDownload}  style={{
                        color: '#000000',
                        fontSize: '50px'
                    }} />
                )}


            </div>
            <div>

    </div>

        </div>
    );
};