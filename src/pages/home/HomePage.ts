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
    calcTotal(item: Item, id: number) {
      if (item.unityValue && item.qtd) {
        this.list[id].totalValue = item.unityValue * item.qtd;
        this.valueTotal = 0;
        this.list.map((item) => {
          this.valueTotal += item.totalValue;
        });
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
