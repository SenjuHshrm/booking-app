export interface ITokenClaims {
  sub: string;
  access: string[];
  iat: string;
  exp: string;
}