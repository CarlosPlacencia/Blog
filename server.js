if(process.env.NODE_ENV !== 'production'){require('dotenv').config()}

const expressLayouts = require( 'express-ejs-layouts' );
const methodOverride = require( 'method-override' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const express = require( 'express' );
const app = express();

// Router Routes
const indexRouter = require( './routes/index' ); 
const articleRouter = require( './routes/articles' ); 

// app.set
app.set( 'views', __dirname + '/views' );
app.set( 'layout', 'layouts/layout');
app.set( 'view engine', 'ejs' );

// app.use
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( methodOverride( '_method' ) ) ;
app.use( express.static( 'public' ) );
app.use( expressLayouts );

// Mongoose Database Connection
mongoose.connect( process.env.DATABASE_URL, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
});


// app.use routes
app.use( '/', indexRouter);
app.use( '/articles', articleRouter);

// app.listen
app.listen( process.env.PORT || 3000, () => {  
    console.log( "Server is running" );
});