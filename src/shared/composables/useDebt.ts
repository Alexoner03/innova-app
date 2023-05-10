import {ref} from "vue";
import DebtService, {IDebt} from "src/shared/services/online/DebtService";

const debts = ref<IDebt[]>([])

export const useDebt = () => {
  return {
    debts,
    async listDebts(client: string = "") {
      const result = await DebtService.list(client)

      if(result === null) {
        return false
      }

      debts.value = result
      return true
    }
  }
}
