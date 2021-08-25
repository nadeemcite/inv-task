import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InstallationTask } from './installation-task';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || 3000);

  // Installation of movie DB from csv taken from kaggle.
  const installationTask:InstallationTask = new InstallationTask();
  installationTask.createMovieDb();
  installationTask.createMovieCreditsDb(); 
}
bootstrap();
