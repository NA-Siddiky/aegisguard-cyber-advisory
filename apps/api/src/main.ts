import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for Vite frontend and Google Sites embedding
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`======================================================`);
  console.log(` AegisGuard Cyber Advisory API running on port ${port}`);
  console.log(` Endpoints:`);
  console.log(`  - GET /api/profile`);
  console.log(`  - GET /api/assets`);
  console.log(`  - GET /api/threats`);
  console.log(`  - GET /api/threats/dfd`);
  console.log(`  - GET /api/nist`);
  console.log(`  - GET /api/controls`);
  console.log(`  - GET /api/roadmap`);
  console.log(`======================================================`);
}
bootstrap();
