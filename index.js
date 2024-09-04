const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to check working hours (Monday to Friday, 9 to 17)
app.use((req, res, next) => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const hour = currentDate.getHours();

    // Check if it's Monday to Friday and between 9:00 and 17:00
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('Sorry, the web application is only available from Monday to Friday, 9:00 to 17:00.');
    }
});

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });

    
