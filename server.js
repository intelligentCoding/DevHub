const express  = require('express');

const app = express();
//Just testing if the express server is running.
app.get('/', (req, res) =>res.send('API running'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));