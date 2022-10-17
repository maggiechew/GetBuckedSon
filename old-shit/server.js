//https://gist.github.com/gregfenton/d0dc5b82feb08bcf5bcf0ea48a92149a

import readlineSync from "readline-sync"
import express from 'express';
const app = express();
const PORT = process.env.PORT || 4000;


app.listen(PORT, function() {
    console.log(`Server listening at port: ${PORT}`);
  })