import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const JARVIS_HTTP_PORT: number = 3003;
    const JARVIS_TCP_PORT: number = 3006;
    const app: INestApplication = await NestFactory.create(AppModule);
    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            port: JARVIS_TCP_PORT,
            retryAttempts: 5,
            retryDelay: 3000,
        },
    });
    await app.startAllMicroservicesAsync();
    await app.listen(JARVIS_HTTP_PORT, () =>
        console.log(`Jarvis is started on ${JARVIS_HTTP_PORT}/${JARVIS_TCP_PORT}`)
    );
}
bootstrap();
