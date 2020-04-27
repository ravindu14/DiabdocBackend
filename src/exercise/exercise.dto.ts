import { IsString } from "class-validator";

export class ExerciseDto {
  @IsString()
  public username: string;

  public exercises: object;
}
