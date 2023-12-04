const typeorm = require("typeorm");
const path = require("path");

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "carlsjr",
    synchronize: true,
    entities: [path.join(__dirname, ".", "entities/**/*.js")]
});

module.exports = dataSource;