import ServiceContainer from '../services/service-container';
import { Router, RequestHandler, NextFunction, Request, Response } from 'express';

/**
 * Base controller class.
 * 
 * Controllers are used to create API endpoints and process them.
 * 
 * To create a controller, simply extends this class and register it in the `ControllerService`.
 */
export default abstract class Controller {

    protected readonly container: ServiceContainer;
    public readonly rootUri: string;
    public readonly router: Router;
    public readonly endpoints: Endpoint[];

    /**
     * Creates a new controller.
     * 
     * @param container Services container
     * @param rootUri Root URI
     */
    public constructor(container: ServiceContainer, rootUri: string) {
        this.container = container;
        this.rootUri = rootUri;
        this.router = Router();
        this.endpoints = [];
    }

    /**
     * Registers an endpoint.
     * 
     * @param endpoint Endpoint to register
     */
    protected registerEndpoint(endpoint: Endpoint): void {
        this.endpoints.push(endpoint);
        this.router[endpoint.method.toLowerCase()](endpoint.uri, this.triggerEndpointHandler, endpoint.handlers);
    }
    
    /**
     * Logs a message when an endpoint is triggered.
     * 
     * This method is a handler.
     * 
     * @param req Express request
     * @param res Express response
     * @param next Next handler
     * @async
     */
    private async triggerEndpointHandler(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log(`${req.ip} > ${req.method} ${req.originalUrl}`);
        return next();
    }
}

/**
 * Endpoint interface.
 */
export interface Endpoint {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    uri: string;
    description?: string;
    handlers: RequestHandler[]
};