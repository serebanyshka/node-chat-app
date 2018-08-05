const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.POST || 3000;
const app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Start node chat at port ${port}`);
});
