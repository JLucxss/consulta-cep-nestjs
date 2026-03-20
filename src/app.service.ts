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
    
    const URL_VIA_CEP = `https://viacep.com.br/ws/${cep}/json`

    const response = await firstValueFrom(this.httpService.get(URL_VIA_CEP).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(error.response?.data)
        throw new BadRequestException('An error happend')
      })
    ))

    console.log(response.data)
    return response.data


  }
}