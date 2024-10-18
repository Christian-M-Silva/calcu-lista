import { defineComponent } from "vue";
import InputComponent from "@/components/atoms/input/InputComponent.vue";
import { Item } from "@/interfaces/interfaces";
export default defineComponent({
  data() {
    return {
      alert: false,
      confirm: false,
      list: [
        {
          qtd: null,
          item: "",
          unityValue: null,
          totalValue: 0,
          isBuy: false,
        },
      ],
      pendingReload: false,
      valueTotal: 0,
    };
  },
  components: { InputComponent },
  methods: {
    calcTotalItem(item: Item, id: number) {
      if (item.unityValue && item.qtd) {
        this.list[id].totalValue = item.unityValue * item.qtd;
        this.calcTotal();
      }
    },
    addItem() {
      this.list.push({
        qtd: null,
        item: "",
        unityValue: null,
        totalValue: 0,
        isBuy: false,
      });
    },

    calcTotal() {
      this.valueTotal = 0;

      this.list.map((itemMap) => {
        this.valueTotal += itemMap.totalValue;
      });
    },

    deleteItem(id: number) {
      this.list.splice(id, 1);
      this.calcTotal();
    },

    handleBeforeUnload(event: BeforeUnloadEvent) {
      if (this.pendingReload) return; // Se o reload foi confirmado, não mostra o aviso novamente

      event.preventDefault(); // Interrompe o evento padrão
    },
  },

  mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },
});
