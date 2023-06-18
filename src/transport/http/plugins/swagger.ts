import fastifySwagger from '@fastify/swagger'
import fp from 'fastify-plugin'

export default fp(async fastify => {
    fastify.register(fastifySwagger, {
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'Dictionary',
                description: 'Dictionary mgmt',
                version: '0.0.x',
            },
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
        exposeRoute: true,
    })
})
