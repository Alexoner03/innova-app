import {ref} from "vue";
import DebtService, {IDebt} from "src/shared/services/online/DebtService";

export interface IAdvacementTemp {
  pendiente: number,
  acuenta: number,
  cliente: string,
  serie: string,
}

export interface IDetail {
  cantidad: number;
  producto: string;
  unitario: number;
  importe:  number;
  id:       number;
  estado:   string;
}

const debts = ref<IDebt[]>([])
const tempAdvacementes = ref<IAdvacementTemp[]>([])

export const useDebt = () => {
  return {
    debts,
    tempAdvacementes,

    async listDebts(client: string = "") {
      const result = await DebtService.list(client)

      if(result === null) {
        return false
      }

      debts.value = result
      return true
    },

    addAdvacement(advacement: IAdvacementTemp) {

      if(tempAdvacementes.value.find(item => item.serie === advacement.serie))
      {
        return false;
      }

      tempAdvacementes.value.push(advacement)
      return true
    },

    removeAdvacement(advacement: IAdvacementTemp) {
      tempAdvacementes.value = tempAdvacementes.value.filter(item => item.serie === advacement.serie);
    },

    async sendAdvacements() {
      const result = await DebtService.sendAdvacement(tempAdvacementes.value);

      if(!result) {
        return "ERROR GUARDANDO ADELANTOS"
      }

      debts.value = [];
      tempAdvacementes.value = [];
      return "ADELANTOS GUARDADOS"

    },

    listDetail(serie: string) {
      return DebtService.listDetails(serie)
    }
  }
}
