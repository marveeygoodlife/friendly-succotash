// Configure Helmet with a Content Security Policy that allows the Google Fonts
// CDN and the Font Awesome Kit used in the client. This keeps a restrictive
// default-src while permitting the known external resources the app needs.
/* app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                // only allow self for scripts (we serve all site JS locally)
                scriptSrc: ["'self'"],
                scriptSrcElem: ["'self'"],
                styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
                // We host fonts locally where possible. Keep Google Fonts (static)
                fontSrc: ["'self'", 'https://fonts.gstatic.com'],
                imgSrc: ["'self'", 'data:', 'https://avatar.iran.liara.run'],
            // allow fetch/XHR connections to known CDNs we use (Google Fonts)
            connectSrc: ["'self'", 'https://fonts.googleapis.com'],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    })
); */