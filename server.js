const path = require('path');
const express = require('express');

const app = express();
const config = require('./config');

// serve static assets normally
app.use(express.static(path.join(`${__dirname}/${config.folderOutput}`)));

// handle every other route with index.html
app.get('*', (request, response) => {
  response.sendFile(
    path.resolve(__dirname, config.folderOutput, config.filenameHTML),
  );
});

app.listen(process.env.PORT || config.serverPort);
