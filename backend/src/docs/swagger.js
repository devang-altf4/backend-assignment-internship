const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'REST API with authentication and role based access control'
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Dev server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'] },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['todo', 'in-progress', 'done'] },
            priority: { type: 'string', enum: ['low', 'medium', 'high'] },
            user: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    },
    paths: {
      '/api/v1/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'john@example.com' },
                    password: { type: 'string', example: 'password123' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'User registered successfully' },
            400: { description: 'Validation error or email already exists' }
          }
        }
      },
      '/api/v1/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'john@example.com' },
                    password: { type: 'string', example: 'password123' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Login successful, returns JWT token' },
            401: { description: 'Invalid credentials' }
          }
        }
      },
      '/api/v1/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current logged in user',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Current user data' },
            401: { description: 'Not authorized' }
          }
        }
      },
      '/api/v1/users': {
        get: {
          tags: ['Users'],
          summary: 'Get all users (admin only)',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of all users' },
            403: { description: 'Not authorized (admin only)' }
          }
        }
      },
      '/api/v1/users/{id}': {
        delete: {
          tags: ['Users'],
          summary: 'Delete a user (admin only)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'User deleted' },
            404: { description: 'User not found' }
          }
        }
      },
      '/api/v1/tasks': {
        get: {
          tags: ['Tasks'],
          summary: 'Get all tasks for current user',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of user tasks' }
          }
        },
        post: {
          tags: ['Tasks'],
          summary: 'Create a new task',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title'],
                  properties: {
                    title: { type: 'string', example: 'Finish project' },
                    description: { type: 'string', example: 'Complete the backend' },
                    status: { type: 'string', enum: ['todo', 'in-progress', 'done'] },
                    priority: { type: 'string', enum: ['low', 'medium', 'high'] }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Task created' },
            400: { description: 'Validation error' }
          }
        }
      },
      '/api/v1/tasks/all': {
        get: {
          tags: ['Tasks'],
          summary: 'Get all tasks from all users (admin only)',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'All tasks' },
            403: { description: 'Admin only' }
          }
        }
      },
      '/api/v1/tasks/{id}': {
        get: {
          tags: ['Tasks'],
          summary: 'Get single task by id',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'Task data' },
            404: { description: 'Task not found' }
          }
        },
        put: {
          tags: ['Tasks'],
          summary: 'Update a task',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'string', enum: ['todo', 'in-progress', 'done'] },
                    priority: { type: 'string', enum: ['low', 'medium', 'high'] }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Task updated' },
            404: { description: 'Task not found' }
          }
        },
        delete: {
          tags: ['Tasks'],
          summary: 'Delete a task',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'Task deleted' },
            404: { description: 'Task not found' }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
