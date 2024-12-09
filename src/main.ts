import cluster from 'cluster';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import os from 'os';
import path from 'path';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './generated/routes';
import { initializeDatabase } from './infrastructure/database/typeorm.config';
import { registerDependencies } from './infrastructure/ioc/di.config';
import { httpErrorHandlerMiddleware } from './infrastructure/middlewares/http-error-handler.middleware';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new one...`);
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use(
    '/swagger.json',
    express.static(path.join(__dirname, 'swagger/swagger.json'))
  );
  app.use(
    ['/swagger', '/docs'],
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: '/swagger.json',
      },
    })
  );

  initializeDatabase()
    .then(() => registerDependencies())
    .then(() => {
      RegisterRoutes(app);
      app.use(httpErrorHandlerMiddleware);

      const port = 9001 + (cluster.worker?.id ?? 0);
      app.listen(port, () => {
        console.log(`Worker ${process.pid} started on port ${port}`);
      });
    })
    .catch((err) => {
      console.error('Failed to start server', err);
      process.exit(1);
    });
}
