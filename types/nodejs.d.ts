declare namespace NodeJS {

    export interface ProcessEnv {
        API_PORT: string;
        DB_HOST: string;
        DB_PORT: string;
        DB_NAME: string;
        REQUEST_SIZE_LIMIT: string;
    }
}
