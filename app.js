/** express est un framework de node js */
const express = require('express'),

/** le module de chemin de node js */
      path = require('path'),

/** pilote mysql (SGBDR) */
      mysql = require('mysql'),

/** permet la connection à la base de donnée */     
      myConnection = require('express-myconnection'),

/** ensemble de middlewares */  
      expressValidator = require('express-validator'),
      
/** gestion de messages de confirmation */  
      flash = require('express-flash'),


const app = express();



/**  importing routes*/
const utilisateurRoutes = require('./routes/utilisateur');
const roleRoutes = require('./routes/role');
const reservationRoutes = require('./routes/reservation');
const typeRoutes = require('./routes/type');
const etatRoutes = require('./routes/etat');
const locationRoutes = require('./routes/location');
const parcoursRoutes = require('./routes/parcours');
const pointsRoutes = require('./routes/points');


/** settings du serveur local */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/** connection à la base de donnée */
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'location_velo'
}, 'single'));
app.use(express.urlencoded({extended: false}));
app.use(expressValidator());
app.use(flash());

/** routes */
app.use('/admin/user', utilisateurRoutes);
app.use('/admin/role', roleRoutes);
app.use('/admin/reservation', reservationRoutes);
app.use('/admin/type', typeRoutes);
app.use('/admin/etat', etatRoutes);
app.use('/admin/location', locationRoutes);
app.use('/admin/parcours', parcoursRoutes);
app.use('/admin/points', pointsRoutes);


/** static files */
app.use(express.static(path.join(__dirname, 'public')));

/** starting the server */
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
