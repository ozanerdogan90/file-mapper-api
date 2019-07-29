const fs = require('fs');
const path = require('path');
const j2s = require('joi-to-swagger');
const routings = require("../dist/components");
let endpoints = routings.routings;

const FILEPATH = path.join(__dirname, '/v1.json');

const responsesSchema = {
    200: {
        title: 'Successful response',
        type: 'object',
        properties: {
            statusCode: {
                type: 'Integer',
                description: 'Internal parameter',
                example: 200
            },
            errorMessage: {
                type: 'string',
                description: 'Internal parameter',
                example: 'OK'
            }
        }
    },
    400: {
        title: 'Bad Request',
        type: 'object',
        properties: {
            ok: {
                type: 'boolean',
                description: 'Internal parameter',
                example: false
            },
            status: {
                type: 'Integer',
                description: 'Internal parameter',
                example: 400
            },
            error: {
                type: 'string',
                description: 'Internal parameter',
                example: 'ValidationError'
            },
            message: {
                type: 'string',
                description: 'Internal parameter',
                example: 'Error in body parameters.'
            }
        }
    },
    403: {
        title: 'Forbidden',
        type: 'object',
        properties: {
            ok: {
                type: 'boolean',
                description: 'Internal parameter',
                example: false
            },
            status: {
                type: 'Integer',
                description: 'Internal parameter',
                example: 500
            },
            error: {
                type: 'string',
                description: 'Internal parameter',
                example: 'Error'
            },
            message: {
                type: 'string',
                description: 'Internal parameter',
                example: 'OK'
            }
        }
    },
    404: {
        title: 'Not Found response',
        type: 'object',
        properties: {
            statusCode: {
                type: 'Integer',
                description: 'Internal parameter',
                example: 200
            },
            errorMessage: {
                type: 'string',
                description: 'Internal parameter',
                example: 'OK'
            }
        }
    },
    500: {
        title: 'Internal Server Error',
        type: 'object',
        properties: {
            ok: {
                type: 'boolean',
                description: 'Internal parameter',
                example: false
            },
            status: {
                type: 'Integer',
                description: 'Internal parameter',
                example: 500
            },
            error: {
                type: 'string',
                description: 'Internal parameter',
                example: 'Error'
            },
            message: {
                type: 'string',
                description: 'Internal parameter',
                example: 'OK'
            }
        }
    }
};

const swaggerSchema = {
    openapi: '3.0.1',
    info: {
        title: 'File Mapper Api',
        description: 'Map your csv and excel files',
        version: '1.0',
        termsOfService: '',
        contact: {
            name: 'File Mapper Api'
        }
    },
    paths: {},
    components: {
        schemas: responsesSchema,
        securitySchemes: {
            Bearer: {
                type: 'http',
                description: 'API key to authorize requests.',
                scheme: 'bearer',
                bearerFormat: 'Bearer',
                name: 'appid',
                in: 'header'
            }
        }
    },
    security: [
        {
            Bearer: []
        }
    ],
    externalDocs: {
        description: 'API Documentation',
        url: '/swagger',
    }
};

function renameRoute(route) {
    const routeParts = route.split('/');
    const modifiedRouteParts = routeParts.map((part) => {
        if (!part.length) {
            return '';
        }
        if (part[0] === ':') {
            return '/{' + part.substr(1) + '}';
        }
        return '/' + part;
    });
    return modifiedRouteParts.join('');
}

function getTag(route) {
    const routeParts = route.split('/');
    if (/^v[0-9]+$/.test(routeParts[1])) {
        return routeParts[2];
    }
    return 'root';
}

function schemaPostProcess(schema) {
    if (schema && schema.pattern) {
        delete schema.pattern;
    }
}

const actionNameSet = new Set();
const counter = {};
for (let endpoint of endpoints) {
    const { route, method, description, action, schema } = endpoint;
    const parameters = [];
    const modifiedRoute = renameRoute(route);
    const tag = getTag(route);
    if (!counter[action.name]) {
        counter[action.name] = 1;
    }

    if (!swaggerSchema.paths[modifiedRoute]) {
        swaggerSchema.paths[modifiedRoute] = {};
    }
    swaggerSchema.paths[modifiedRoute][method] = {
        description,
        operationId: tag + '_' + action.name + (actionNameSet.has(action.name) ? counter[action.name]++ : ''),
    };
    actionNameSet.add(action.name);

    if (schema && schema.body) {
        const result = j2s(schema.body);
        schemaPostProcess(result.swagger);
        swaggerSchema.paths[modifiedRoute][method].requestBody = {
            content: {
                'application/json': {
                    schema: result.swagger
                }
            }
        };
    }
    if (schema && schema.params) {
        Object.keys(schema.params).forEach((key) => {
            const field = schema.params[key];
            const result = j2s(field);
            schemaPostProcess(result.swagger);
            parameters.push({
                name: key,
                in: 'path',
                schema: result.swagger,
            })
        });
    }
    if (schema && schema.query) {
        Object.keys(schema.query).forEach((key) => {
            const field = schema.query[key];
            const result = j2s(field);
            schemaPostProcess(result.swagger);
            parameters.push({
                name: key,
                in: 'query',
                schema: result.swagger,
            })
        });
    }

    swaggerSchema.paths[modifiedRoute][method].tags = [tag];
    swaggerSchema.paths[modifiedRoute][method].parameters = parameters;
    swaggerSchema.paths[modifiedRoute][method].responses = responsesSchema;
}

fs.writeFileSync(FILEPATH, JSON.stringify(swaggerSchema, null, 2));

console.log('swagger> swagger schema was created!', FILEPATH);
