import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { User } from '../models/user.interface';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';



@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private authService: AuthService){}

    create(user: User): Observable<User | Object> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.email = user.email;
                newUser.password = passwordHash;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        
                        const { password, ...result } = user;

                        return result;
                        
                    }),
                    catchError(err => throwError(() => err))
                )
            })
        )
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOneBy({id}))
    }

    findByMail(email: string): Observable<User> {
        return from(this.userRepository.findOneBy({email}));
    }
    login(user: User): Observable<string>{
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user){
                    return this.authService.generateJwt(user).pipe(map((jwt: string) => jwt))
                } else {
                    return 'Wrong Credentials!'
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User>{
        return from(this.userRepository.findOne({where: {email}, select: ['password', 'email']})).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if (match) {
                        const {password, ...result} = user;
                        return result;
                    } else {
                        throw Error;
                    }
                })
            ))
        )
    }
    

   
}
