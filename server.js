require('dotenv').config();
const app = require('./server/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Server running on port http://127.0.0.1:${PORT}`);
 });