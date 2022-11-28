import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
    
  public async make(password: string, length: number = 12) {
    return await hash(password, length);
  }

  public async compare(password1: string, password2: string){
    const isPasswordMatching = await compare(password1, password2);
    return isPasswordMatching;
  }

}
