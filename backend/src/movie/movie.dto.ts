import { IsNotEmpty } from 'class-validator';

export class GetMoviesParams {
  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  offset: number;
}

export class MovieIdParam {
  @IsNotEmpty()
  id: number;
}
