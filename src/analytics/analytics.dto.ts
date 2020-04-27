import { IsString, IsArray } from "class-validator";

export class ExerciseDto {
  @IsString()
  public username: string;

  @IsArray()
  public analytics: Array<any>;
}
