// src/config/swagger.ts
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'E-Commerce API',
    version: '1.0.0',
    description: 'API documentation for the E-Commerce project',
  },
  servers: [
    {
      url: `http://localhost:5000`, // You can use process.env here if you prefer
    },
  ],
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          price: { type: 'number' },
          category_name: { type: 'string' },
        },
      },
    },
  },
};

export default swaggerDefinition;