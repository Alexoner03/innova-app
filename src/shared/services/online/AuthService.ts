import axios from "axios";
import {BACKEND_URL} from "src/shared/constants";

export interface IUser {
  id: number
  usuario: string
  cargo: string
  nombre: string
  activo: string
  cumple: string
  celular: string
}

export interface Token {
  expires_in: number
  token_type: string
  access_token: string
}

const AuthService = {
  async login(creds: {user: string, password: string, db: string}){

    try {
      const response = await axios.post<{auth: Token, user: IUser}>(`${BACKEND_URL}/api/auth/login`, {
        usuario: creds.user,
        password: creds.password,
        db: creds.db
      })

      if(response.status !== 200) {
        return null
      }

      return response.data
    }catch (e) {
      return null
    }
  }
}

export default AuthService
