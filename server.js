const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const routes = require('./routes');
const PORT = process.env.PORT || 3001;

const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(routes);


sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening at http://locathost:${PORT}`)
    });
});