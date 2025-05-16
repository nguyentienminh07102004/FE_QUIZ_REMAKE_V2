import { JwtPayload } from "jwt-decode";

export interface JWTEntity {
	id: string;
	token: string;
	expires: string
}

export interface JWTDecoder extends JwtPayload {
	scope: string;
}