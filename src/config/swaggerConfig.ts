import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    swaggerDefinition: {
        openapi: "3.1.0",
        info: {
            title: 'User API Service',
            version: '1.0.0',
            description: "Documentación de los endpoints disponobles para la autenticación del usuario",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            }
        }
    },
    apis: ['./src/routes/*.ts'],

};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;