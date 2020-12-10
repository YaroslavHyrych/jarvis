import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
    private data: {} = {
        name: 'yureev',
        age: 28,
    };

    constructor() {}

    getData(key: string): string {
        return this.data[key];
    }
}
