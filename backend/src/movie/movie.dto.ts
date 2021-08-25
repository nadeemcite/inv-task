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

export class MovieObject{

  id:number;

  @IsNotEmpty()
  original_title:string;

  @IsNotEmpty()
  meta_data:object;
}
