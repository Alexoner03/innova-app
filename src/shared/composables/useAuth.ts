import AuthService, {IUser} from "src/shared/services/online/AuthService";
import {ref} from "vue";

const user = ref<IUser | null>(null);

export const useAuth = () => {
  return  {
    user,
    async login(_user:string, password: string, db: string) {
      const result = await AuthService.login({user: _user, password, db})

      if(result !== null) {
          user.value = result.user
          localStorage.setItem("token", result.auth.access_token)
          localStorage.setItem("user", JSON.stringify(result.user))
      }

      return result
    },

    closeSession() {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      user.value = null
    },

    reload() {
      if(localStorage.getItem("user")) {
        user.value = JSON.parse(localStorage.getItem("user")!) as IUser
        return true
      }

      return false;
    }
  }
}
