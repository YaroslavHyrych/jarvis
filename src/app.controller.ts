import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
    private vision: ClientProxy;
    private VISION_TCP_PORT: number = 3005;

    constructor(private readonly appService: AppService) {
        this.vision = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                port: this.VISION_TCP_PORT as any,
            },
        });
    }

    @Get()
    async getData(@Query('token') token: string, @Query('key') key: string, @Res() res: any) {
        const isAllowed: boolean = await this.validate(token);
        if (isAllowed) {
            const data: string = this.appService.getData(key);
            res.status(HttpStatus.OK).json(data);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
        }
    }

    private validate(token: string): Promise<boolean> {
        const pattern: any = { cmd: 'validate' };
        const payload: any = { token };
        return this.vision.send<boolean>(pattern, payload).toPromise();
    }
}
