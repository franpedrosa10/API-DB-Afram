import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AFRAM GROUP API",
      version: "1.0.0",
      description:
        "Afram Group is the final project for the degree in Programming. Developed by Agustina Hourcade, Agustin Meikle Echeverria, Francisco Pedrosa, and Mateo Vaccaro, this API focuses on providing essential functionalities for account, user, product and transaction management. <br> Token para pruebas: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicmVhbF9uYW1lIjoiSnVhbiBQZXJleiIsIm5hbWVfdXNlciI6Imp1YW5wZXJleiIsImxhc3RfbmFtZSI6IlBlcmV6IiwiZW1haWwiOiJqdWFuLnBlcmV6QGV4YW1wbGUuY29tIiwiZG5pIjoiMTIzNDU2NzgiLCJwaG9uZSI6IjEyMzQ1Njc4OTAiLCJ1c2VyX3R5cGUiOiJhZG1pbiIsImlzX0FjdGl2ZSI6dHJ1ZSwiaWF0IjoxNzM0MTQyNDAwfQ.ww3kWqsBCzJKEDyxrSFgSkx9A-s9X3BGvUFalQwsWiE - ID 1 - ADMIN",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Account: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The unique identifier for the account",
            },
            balance: {
              type: "number",
              format: "double",
              description: "The current balance of the account",
            },
            opening_date: {
              type: "string",
              format: "date",
              description: "The date the account was opened",
            },
            closing_date: {
              type: "string",
              format: "date",
              nullable: true,
              description: "The date the account was closed (if any)",
            },
            cbu: {
              type: "string",
              description: "The unique identifier for interbank transactions",
            },
            alias: {
              type: "string",
              description: "A custom alias for the account",
            },
            account_type: {
              type: "string",
              enum: ["Checking", "Savings"],
              description: "The type of account",
            },
            overdraft_limit: {
              type: "number",
              format: "double",
              description: "The overdraft limit for the account",
            },
            user_id: {
              type: "integer",
              description: "The ID of the user who owns the account",
            },
            currency: {
              type: "string",
              enum: ["ars", "usd"],
              description: "The currency of the account",
            },
          },
        },
        Address: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID of the address",
            },
            street: {
              type: "string",
              description: "Street name",
            },
            address_number: {
              type: "integer",
              description: "Address number",
            },
            floor: {
              type: "string",
              description: "Floor number or level",
            },
            apartment: {
              type: "string",
              description: "Apartment number or identifier",
            },
            city: {
              type: "string",
              description: "City name",
            },
            postal_code: {
              type: "string",
              description: "Postal or ZIP code",
            },
            country: {
              type: "string",
              description: "Country name",
            },
            user_id: {
              type: "integer",
              description: "ID of the user associated with the address",
            },
          },
          example: {
            id: 1,
            street: "123 Main St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA",
          },
        },
        Card: {
          type: "object",
          properties: {
            card_id: {
              type: "integer",
              description: "Unique identifier for the card",
            },
            card_number: {
              type: "string",
              maxLength: 16,
              minLength: 16,
              description: "The card number, exactly 16 digits",
            },
            cardholder_name: {
              type: "string",
              maxLength: 30,
              description: "The cardholder's first name",
            },
            cardholder_last_name: {
              type: "string",
              maxLength: 30,
              description: "The cardholder's last name",
            },
            issue_date: {
              type: "string",
              format: "date",
              description: "The date the card was issued",
            },
            expiration_date: {
              type: "string",
              format: "date",
              description: "The date the card expires",
            },
            cvv: {
              type: "string",
              maxLength: 3,
              minLength: 3,
              description: "The 3-digit CVV number on the card",
            },
            card_type: {
              type: "string",
              enum: ["credit", "debit"],
              description: "The type of card (credit or debit)",
            },
            is_active: {
              type: "string",
              enum: ["yes", "no"],
              description: "Indicates whether the card is active or not",
            },
            user_id: {
              type: "integer",
              description: "The ID of the user who owns the card",
            },
            account_id: {
              type: "integer",
              description: "The ID of the account associated with the card",
            },
          },
        },
        FixedTerm: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique identifier for the fixed term",
            },
            account_id: {
              type: "integer",
              description:
                "The ID of the account associated with the fixed term",
            },
            invested_amount: {
              type: "number",
              format: "decimal",
              description: "The amount invested in the fixed term",
              example: 10000.0,
            },
            start_date: {
              type: "string",
              format: "date",
              description: "The start date of the fixed term",
            },
            expiration_date: {
              type: "string",
              format: "date",
              description: "The expiration date of the fixed term",
            },
            interest_rate_id: {
              type: "integer",
              description:
                "The ID of the interest rate associated with the fixed term",
            },
            interest_earned: {
              type: "number",
              format: "decimal",
              description: "The interest earned on the fixed term",
              example: 500.0,
            },
            is_paid: {
              type: "string",
              enum: ["yes", "no"],
              description: "Indicates whether the fixed term has been paid",
            },
          },
          required: [
            "id",
            "account_id",
            "invested_amount",
            "start_date",
            "expiration_date",
            "interest_rate_id",
            "interest_earned",
            "is_paid",
          ],
        },
        InterestRate: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique identifier for the interest rate record",
            },
            loan_interest_rate: {
              type: "number",
              format: "float",
              description: "Interest rate for the loan",
            },
            fixed_term_interest_rate: {
              type: "number",
              format: "float",
              description: "Interest rate for the fixed term",
            },
            last_updated: {
              type: "string",
              format: "date",
              description: "Date when the record was last updated",
            },
          },
        },
        Loan: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The unique identifier for the loan",
            },
            amount: {
              type: "integer",
              description: "The total amount of the loan",
            },
            paid: {
              type: "integer",
              description: "The amount already paid on the loan",
            },
            expiration_date: {
              type: "string",
              format: "date",
              description: "The expiration date of the loan",
            },
            request_date: {
              type: "string",
              format: "date",
              description: "The date the loan was requested",
            },
            account_id: {
              type: "integer",
              description: "The ID of the associated account",
            },
            interest_rate_id: {
              type: "integer",
              description:
                "The ID of the interest rate associated with the loan",
            },
            return_amount: {
              type: "number",
              format: "decimal",
              description: "The total amount to be returned (loan + interest)",
            },
          },
        },
        Notification: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique identifier for the notification",
            },
            title: {
              type: "string",
              maxLength: 100,
              description: "Title of the notification",
            },
            message: {
              type: "string",
              maxLength: 100,
              description: "Message content of the notification",
            },
            is_read: {
              type: "string",
              enum: ["yes", "no"],
              description:
                "Status indicating whether the notification has been read",
            },
            created_at: {
              type: "string",
              format: "date",
              description: "Creation date of the notification",
            },
            user_id: {
              type: "integer",
              description: "ID of the user associated with the notification",
            },
          },
        },
        SupportMessage: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique identifier for the support message",
            },
            thread_id: {
              type: "integer",
              description: "ID of the thread to which the message belongs",
            },
            sender_type: {
              type: "string",
              enum: ["user", "support"],
              description: "Type of the sender (either 'user' or 'support')",
            },
            message: {
              type: "string",
              maxLength: 140,
              description: "Content of the support message",
            },
            created_at: {
              type: "string",
              format: "date",
              description: "Creation date of the support message",
            },
          },
        },
        SupportThread: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique identifier for the support thread",
            },
            user_id: {
              type: "integer",
              description: "ID of the user who created the support thread",
            },
            support_subject: {
              type: "string",
              maxLength: 100,
              description: "Subject of the support thread",
            },
            created_at: {
              type: "string",
              format: "date",
              description: "Creation date of the support thread",
            },
            support_status: {
              type: "string",
              enum: ["open", "closed"],
              description: "Current status of the support thread",
            },
          },
        },
        Transaction: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique identifier for the transaction",
            },
            amount: {
              type: "number",
              format: "decimal",
              description:
                "Amount of the transaction, with up to 2 decimal places",
            },
            transaction_date: {
              type: "string",
              format: "date-time",
              description: "Date and time when the transaction was made",
            },
            source_account_id: {
              type: "integer",
              description: "ID of the source account for the transaction",
            },
            destination_account_id: {
              type: "integer",
              description: "ID of the destination account for the transaction",
            },
            transaction_type: {
              type: "string",
              enum: ["transfer", "fixed term", "loan", "exchange"],
              description: "Type of the transaction",
            },
            is_paid: {
              type: "string",
              enum: ["yes", "no"],
              description: "Indicates whether the transaction has been paid",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Unique identifier for the user",
            },
            real_name: {
              type: "string",
              maxLength: 30,
              description: "User's real name",
            },
            name_user: {
              type: "string",
              maxLength: 30,
              description: "Username for the user",
            },
            last_name: {
              type: "string",
              maxLength: 30,
              description: "User's last name",
            },
            email: {
              type: "string",
              maxLength: 30,
              description: "User's email address",
            },
            hashed_password: {
              type: "string",
              maxLength: 60,
              description: "User's hashed password",
            },
            dni: {
              type: "string",
              maxLength: 10,
              description: "User's DNI (Document National Identity)",
            },
            phone: {
              type: "string",
              maxLength: 20,
              description: "User's phone number",
            },
            user_type: {
              type: "string",
              enum: ["admin", "user"],
              description: "Type of user (admin or user)",
            },
            is_Active: {
              type: "string",
              enum: ["yes", "no"],
              description: "Indicates whether the user is active",
            },
            reset_token: {
              type: "integer",
              description: "Reset token for password recovery",
            },
            login_attempts: {
              type: "integer",
              description: "Number of login attempts made by the user",
            },
          },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  servers: [{ url: "http://localhost:3000" }],
  apis: ["./src/tables/**/**/*Routes.js"], // Ruta a los archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, PORT) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `📚 Documentación disponible en http://localhost:${PORT}/api-docs`
  );
};

export default swaggerDocs;
