import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'AFRAM GROUP API',
        version: '1.0.0',
        description: 'Afram Group is the final project for the degree in Programming. Developed by Agustina Hourcade, Agustin Meikle Echeverria, Francisco Pedrosa, and Mateo Vaccaro, this API focuses on providing essential functionalities for account, user, product and transaction management.'
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
          Account: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                description: 'The unique identifier for the account',
              },
              balance: {
                type: 'number',
                format: 'double',
                description: 'The current balance of the account',
              },
              opening_date: {
                type: 'string',
                format: 'date',
                description: 'The date the account was opened',
              },
              closing_date: {
                type: 'string',
                format: 'date',
                nullable: true,
                description: 'The date the account was closed (if any)',
              },
              cbu: {
                type: 'string',
                description: 'The unique identifier for interbank transactions',
              },
              alias: {
                type: 'string',
                description: 'A custom alias for the account',
              },
              account_type: {
                type: 'string',
                enum: ['Checking', 'Savings'],
                description: 'The type of account',
              },
              overdraft_limit: {
                type: 'number',
                format: 'double',
                description: 'The overdraft limit for the account',
              },
              user_id: {
                type: 'integer',
                description: 'The ID of the user who owns the account',
              },
              currency: {
                type: 'string',
                enum: ['ars', 'usd'],
                description: 'The currency of the account',
              },
            },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: [
        { url: 'http://localhost:3000' },
      ],
    },
    apis: ["./src/tables/**/**/*Routes.js"], // Ruta a los archivos de rutas
  };

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, PORT) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📚 Documentación disponible en http://localhost:${PORT}/api-docs`);
};

export default swaggerDocs;
