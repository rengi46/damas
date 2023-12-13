import React from 'react';
import QRCode from 'qrcode.react';
import { useNavigate, useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Qrgame = ({ value }) => {

  const navigate = useNavigate();

  const secret = "phygitalKey";
  const params = useParams();

  
  const gameEncrypt = CryptoJS.AES.encrypt(params.game,secret).toString();
  const base64Game = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(gameEncrypt));

  const pointsEncrypt = CryptoJS.AES.encrypt(params.points,secret).toString();
  const base64Points = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pointsEncrypt));
  
  const URL = value+base64Game+"/"+base64Points+ "/"

  setTimeout(() => {
    navigate("/")
  }, 30000);

  const handleOnClick = () => {
    navigate("/")
  }

  console.log(URL);
  return (
    <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <QRCode value={URL} />
      <h2>Regístrate para conseguir un regalo</h2>
      <button onClick={handleOnClick}>Volver</button>
    </div>
  );
};

export default Qrgame;
