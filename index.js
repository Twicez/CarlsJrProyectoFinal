const express = require("express");
const dataSource = require("./src/libs/bd_config");
const cookieParser = require('cookie-parser');
const routes = require("./src/routes/routes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src/pages')));
app.use(cookieParser())
app.use(routes);

app.listen(3000, () => {
    console.log("Server funcionando en el puerto 3000");
});

dataSource.initialize().then(() => {
    console.log("Conectado a la base de datos");
}).catch((err) => {
    console.log(err);
});
