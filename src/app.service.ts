//https://docs.nestjs.com/techniques/http-module
import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import axios, { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";


@Injectable()
export class BuscaCepService {
  private readonly logger = new Logger(BuscaCepService.name)
  constructor(private readonly httpService: HttpService){}
  
  async findCep(cep: string) {
    
    const cleanCep = cep.replace(/\D/g, '');
    
    if (!cleanCep || cleanCep.length !== 8) {
      throw new BadRequestException('CEP deve conter 8 dígitos numéricos');
    }
    
    const URL_VIA_CEP = `https://viacep.com.br/ws/${cleanCep}/json`

    const response = await firstValueFrom(this.httpService.get(URL_VIA_CEP).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(`Erro ao buscar CEP ${cleanCep}:`, error.message)
        throw new BadRequestException('Erro ao buscar CEP. Tente novamente.');
      })
    ))

    return response.data;
  }
}