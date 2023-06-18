import { fastify, FastifyInstance } from 'fastify'
import { Application } from './application.js'
import swagger from './transport/http/plugins/swagger.js'
import { IDictionaryService } from './interfaces/IDictionaryService.js'
import { dictionaryControllersFactory } from './transport/http/controller/dictionaryControllers.js'
import { dictionaryRoutesFactory } from './transport/http/routes/dictionary.js'
import * as dictionarySchemas from './transport/http/schemas/index.js'
import * as ApplicationErrors from './errors/domain/index.js'
import * as HttpErrors from './transport/http/errors/HttpErrors.js'

export class HttpApplication extends Application {
    server: FastifyInstance
    config: {
        host: string
        port: number
    }

    constructor(deps: { dictionaryService: IDictionaryService }, config: { host: string, port: number }) {
        super(deps)
        this.config = config
        this.server = fastify({
            ignoreTrailingSlash: true,
            ignoreDuplicateSlashes: true,
            logger: true,
        })
    }

    dictionaryControllers = dictionaryControllersFactory({ dictionaryService: this.dictionaryService })
    dictionaryRoutes = dictionaryRoutesFactory(dictionarySchemas, this.dictionaryControllers)

    async init() {
        this.server.setErrorHandler((error, request, reply) => {
            const httpError = (() => {
                if (error instanceof ApplicationErrors.InvalidRequestError) return new HttpErrors.BadRequest()
                if (error instanceof ApplicationErrors.InsufficientData) return new HttpErrors.BadRequest()
                if (error instanceof ApplicationErrors.NotFoundError) return new HttpErrors.NotFound()
                return new HttpErrors.InternalServerError()
            })()
            reply.status(httpError.statusCode).send({ message: httpError.message })
        })
        await this.server.register(swagger)
        await this.server.register(this.dictionaryRoutes)
    }

    async start() {
        const address = await this.server.listen({
            port: this.config.port,
            host: this.config.host,
        })
        // this.server.log.info(`HTTP Server listening at ${address}`)
    }

    async stop() {
        this.server.log.info('Stopping HTTP server...')
        await this.server.close()
        this.server.log.info('HTTP Server stopped')
    }
}

declare module 'fastify' {
    interface FastifyInstance {
        dictionasyService: IDictionaryService
    }
}
