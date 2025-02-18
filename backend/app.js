const express = require("express");
;

// Lancer le serveur
const port=3000;
const app=express();

app.listen(port,() => console.log('API démmarée sur http://localhost:'+port));
