import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: "3.1.0",
        info: {
            title: 'MisCuentasApp',
            version: '1.0.0',
            description: "Documentación de los endpoints disponobles para la autenticación del usuario de MisCuentasApp",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            }
        },
        servers: [
            {
                url: "http://localhost:8080",
                description: "Local server"
            },
        ],
    },
    apis: ['./src/routes/*.ts'],

};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;