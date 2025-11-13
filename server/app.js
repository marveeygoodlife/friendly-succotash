'use strict';
const express = require("express");
const helmet = require("helmet");
const cors = require('cors');
const path = require("path");

//import routes
const formRoutes = require("./routes/formRoutes");

//import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

//security middlewares
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                // only allow self for scripts (we serve all site JS locally)
                scriptSrc: ["'self'"],
                scriptSrcElem: ["'self'"],
                styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],  // Allow Font Awesome CDN
                 fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'],  // Allow Font Awesome fonts
                imgSrc: ["'self'", 'data:', 'https://avatar.iran.liara.run'],
                // allow fetch/XHR connections to known CDNs we use (Google Fonts, Font Awesome CDN)
                connectSrc: ["'self'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],  // Allow Font Awesome CDN
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    })
);


app.use(cors());

//serve static files
app.use(express.static(path.join(__dirname, '../client')));

//serve fonts files

//body parsing middleware 
app.use(express.json({
    limit: '10mb' //limit body to 10mb
}));
app.use(express.urlencoded({ extended: true }));


//API Routes
app.use('/api', formRoutes);

//serve client for any other route
// Use a middleware fallback to serve the client for any non-API route.
// This avoids passing a wildcard string to path-to-regexp and is the
// simplest, most compatible fallback across Express/router versions.
app.use((req, res, next) => {
    // If the request is for an API path, pass through to next handlers
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// error handling
app.use(errorHandler);

module.exports = app;