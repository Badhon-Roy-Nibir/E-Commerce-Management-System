import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private readonly configService: ConfigService){
        const key = configService.get<string>("JWT_SECRET");
        if(!key){
            throw new Error("JWT_SECRET is missing from environment variables");
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: key,
            ignoreExpiration: false
        })
    }
    async validate(payloads: any){
        return {
            id: payloads.id,
            email: payloads.email,
            role: payloads.role
        }
    }
}