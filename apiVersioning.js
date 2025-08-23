// Example: URI Path Versioning
const express = require('express');
const app = express();

// Version 1 routes
const v1UserRoutes = require('./routes/v1/users');
app.use('/api/v1/users', v1UserRoutes);

// Version 2 routes with new features
const v2UserRoutes = require('./routes/v2/users');
app.use('/api/v2/users', v2UserRoutes);

app.listen(8080);