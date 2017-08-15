const speakeasy = require('speakeasy');
const express = require('express');
const QRCode = require('qrcode');

var app = express();

var secret = speakeasy.generateSecret();

app.get('/', (req, res) =>{
  QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
    res.send('<img src="' + data_url + '">');
  });
});

var codigo = null;

setInterval(function() {

var totp = speakeasy.totp({
  secret: secret.ascii
});

if (totp !== codigo)
    console.log('Sua nova senha é: %s', totp);
  codigo = totp;
}, 100);


app.listen(3000, () => {
  console.log('Server up na porta 3000');
});
