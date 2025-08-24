// Example: Swagger Documentation
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'A simple Express User API'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server'
            }
        ]
    },
    apis: ['./routes/*.js'] // Path to the API routes folders
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
* @swagger
* /api/users:
* get:
* summary: Returns a list of users
* description: Retrieve a list of all users
* responses:
* 200:
* description: A list of users
* content:
* application/json:
* schema:
* type: array
* items:
* type: object
* properties:
* id:
* type: integer
* name:
* type: string
* email:
* type: string
*/
app.get('/api/users', (req, res) => {
    // Handler implementation
});

app.listen(8080);