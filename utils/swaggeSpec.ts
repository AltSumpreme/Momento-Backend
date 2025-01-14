export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Momento API Documentation",
    version: "1.0.0",
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
      User: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
        },
        required: ["name", "email", "password"],
      },
      LoginCredentials: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", format: "password" },
        },
        required: ["email", "password"],
      },
    },
  },
  paths: {
    "/auth/signup": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        responses: {
          "200": {
            description: "Signup successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "User login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginCredentials" },
            },
          },
        },
        responses: {
          "200": {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    token: { type: "string" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        summary: "User logout",
        responses: {
          "200": {
            description: "Logout successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/public": {
      get: {
        summary: "Public route",
        responses: {
          "200": {
            description: "Success",
            content: {
              "text/plain": {
                schema: { type: "string" },
              },
            },
          },
        },
      },
    },
    "/secure": {
      get: {
        summary: "Protected route",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    user: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
