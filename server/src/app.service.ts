import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(req: Response) {
    return req.json({ message: 'Rota Padrão!' });
  }
}
