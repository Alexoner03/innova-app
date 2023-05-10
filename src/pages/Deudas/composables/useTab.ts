import {ref} from "vue";

const tab = ref("Pendientes");

export const useTab = () => {
  return {
    tab
  }
}
