import React from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Qrgame = ({ value }) => {

  const secret = "phygitalKey";
  const params = useParams();

  
  const gameEncrypt = CryptoJS.AES.encrypt(params.game,secret).toString();
  const base64Game = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(gameEncrypt));

  const pointsEncrypt = CryptoJS.AES.encrypt(params.points,secret).toString();
  const base64Points = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pointsEncrypt));
  
  const URL = value+base64Game+"/"+base64Points+ "/"
  console.log(URL);
  const URLgood = "https://www.google.com/"

  return (
    <div>
      <QRCode value={URL} />
    </div>
  );
};

export default Qrgame;
