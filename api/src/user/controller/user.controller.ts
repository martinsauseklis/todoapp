import { Body, Controller, Get, Headers, Post, Req, Request, Response, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { from, map, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { JwtStrategy } from 'src/auth/guards/jwt-strategy';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';

@Controller('auth')
export class UserController {
    constructor(private userService: UserService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get('status')
    status(@Request() req) {
      const user = req.user.user;
      

      
        return this.userService.findOne(user.id).pipe(
          map((user: User) => {
            
            return {
              email: user.email
            }
          })
        )
      
    }

    @Post('register')
    register(@Body() user: User): Observable<User>{
        return this.userService.create(user)
    }

    
    @Post('signin')
    signin(@Body() user: User): Observable<Object> {
      

       return this.userService.login(user).pipe(
         map((jwt: string) => {return {access_token: jwt}})
       )
    }

 
}
