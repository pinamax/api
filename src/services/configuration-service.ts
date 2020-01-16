import fs from 'fs';
import YAML from 'yaml';
import Service from './service';
import ServiceContainer from './service-container';

/**
 * Configuration service class.
 * 
 * This service is used for load / reload configuration files.
 */
export default class ConfigurationService extends Service {

    private _api: APIConfiguration | null;

    /**
     * Creates a new configuration service.
     * 
     * @param container Services container
     */
    public constructor(container: ServiceContainer) {
        super(container);
        this._api = null;
    }

    /**
     * Loads a configuration file.
     * 
     * @param path Path to configuration file
     * @param type Configuration type
     * @async
     */
    public async load<T>(path: string, type: ConfigurationType): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            fs.readFile(path, 'utf-8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                switch (type) {
                    case 'JSON': return resolve(JSON.parse(data));
                    case 'YAML': return resolve(YAML.parse(data));
                    default: throw new Error(`Configuration type "${type}" is not supported`);
                }
            });
        });
    }

    /**
     * Loads a configuration file synchronously.
     * 
     * @param path Path to configuration file
     * @param type Configuration type
     */
    public loadSync<T>(path: string, type: ConfigurationType): T {
        switch (type) {
            case 'JSON': return JSON.parse(fs.readFileSync(path, 'utf-8'));
            case 'YAML': return YAML.parse(fs.readFileSync(path, 'utf-8'));
            default: throw new Error(`Configuration type "${type}" is not supported`);
        }
    }

    public get api(): APIConfiguration {
        if (!this._api) {
            this._api = this.loadSync<APIConfiguration>('config/api.yml', 'YAML');
            console.log('Loaded API configuration');
        }
        return this._api;
    }
}

/**
 * Supported configuration types.
 */
export type ConfigurationType = 'JSON' | 'YAML';

/**
 * Permissions configuration interface.
 */
export interface APIConfiguration {
    requestSizeLimit: string;
}
