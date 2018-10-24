const express = require('express')

const app = express();

const rootDirController = (req, res) => {
    res.send('test udany')
}


app.get('/', rootDirController);

app.listen(3000, () => console.log('App started'));