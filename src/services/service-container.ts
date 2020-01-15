import EnvironmentService from './environment-service';
import ExpressService from './express-service';
import ControllerService from './controller-service';
import DatabaseService from './database-service';
import ServerService from './server-service';

/**
 * Services container class.
 * 
 * The services container is used to access all services in the code, particulary in controllers or in services themselves.
 * A service is loaded when it is accessed for the first time.
 * 
 * When a service is created, it must be registered here.
 */
export default class ServiceContainer {

    private static INSTANCE: ServiceContainer;

    /**
     * Returns the instance of the services container.
     * 
     * @returns Instance of the services container
     */
    public static getInstance(): ServiceContainer {
        if (!ServiceContainer.INSTANCE) {
            ServiceContainer.INSTANCE = new ServiceContainer();
        }
        return ServiceContainer.INSTANCE;
    }

    private _env: EnvironmentService;
    private _express: ExpressService;
    private _controllers: ControllerService;
    private _db: DatabaseService;
    private _srv: ServerService;

    /**
     * Creates a new services container.
     */
    private constructor() {
        this.env.load(); // Autoload environment
    }

    public get env(): EnvironmentService {
        if (!this._env) {
            this._env = new EnvironmentService(this);
            console.log('Loaded environment service');
        }
        return this._env;
    }

    public get express(): ExpressService {
        if (!this._express) {
            this._express = new ExpressService(this);
            console.log('Loaded Express service');
        }
        return this._express;
    }

    public get controllers(): ControllerService {
        if (!this._controllers) {
            this._controllers = new ControllerService(this);
            console.log('Loaded controllers service');
        }
        return this._controllers;
    }

    public get db(): DatabaseService {
        if (!this._db) {
            this._db = new DatabaseService(this);
            console.log('Loaded database service');
        }
        return this._db;
    }

    public get srv(): ServerService {
        if (!this._srv) {
            this._srv = new ServerService(this);
            console.log('Loaded server service');
        }
        return this._srv;
    }
}
