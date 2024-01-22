import React from 'react';
import "./qrWin.css";
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
    navigate("/Clean%20Ocean")
  }, 30000);

  const handleOnClick = () => {
    navigate("/Clean%20Ocean")
  }

  return (
    <div className='QRWin' style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
      <div className='modalWinQr'>
        <div className='headerWinQr'>
          <div className='startsQrWin'></div>
          <div className='ribbonQrWin'>
            <h3>Felicitaciones</h3>
          </div>


        </div>
        <div className='contentWinQr'>
          <div className='scoreQrWin'>
            <p>Score</p>
            <div>{params.points}</div>
          </div>
          <div className='codeQR'>
            <h4>Pilla tu recompensa</h4>
          <QRCode value={URL} />

          </div>
          <button className='btnWinQR' onClick={handleOnClick}>Volver</button>
        </div>
      </div>  
    </div>
  );
};

export default Qrgame;
