import { Controller, Get, Param } from "@nestjs/common";
import { BuscaCepService } from "./app.service";

@Controller('buscacep')
export class BuscaCepController {
  constructor(private readonly buscaCepService: BuscaCepService){}

  @Get('/:cep')
  async findCep(@Param('cep') cep: string) {
    return this.buscaCepService.findCep(cep)
  }
}