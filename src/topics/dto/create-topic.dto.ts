import { IsEnum, IsNotEmpty, IsString, NotEquals } from 'class-validator';
import { NotEqualsProperty } from 'src/core/decorators/not-equals-prop.decorator';
import { Langs } from 'src/core/enums/langs.enum';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Langs)
  langFrom: Langs;

  @IsEnum(Langs)
  @NotEqualsProperty('langFrom', {
    message: 'langTo must not be equal to langFrom'
  })
  langTo: Langs;
}
