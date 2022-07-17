import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./jwt.constants";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(
        private authService: AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                    return request.cookies.Authentication;
                }
            ]),
            // ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any): Promise<any> {
        console.log(payload);
        // return {username: payload.username};
        const paramUser: User = {id: 0, username: payload.username, password: ''};
        return this.authService.findOne(paramUser);
    }
}