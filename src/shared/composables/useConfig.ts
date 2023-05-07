import {ref} from "vue";

const offline = ref(JSON.parse(localStorage.getItem("offline") ?? "false") as boolean)
export const useConfig = () => {

  return {
    offline,

    toggleOffline(){
      localStorage.setItem("offline", !offline.value + "")
      offline.value = !offline.value
    }
  }
}
