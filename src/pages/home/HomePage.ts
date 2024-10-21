import { defineComponent } from "vue";
import InputComponent from "@/components/atoms/input/InputComponent.vue";
import { Item } from "@/interfaces/interfaces";
export default defineComponent({
  data() {
    return {
      alert: false,
      confirm: false,
      confirmClearItem: false,
      confirmClearList: false,
      idClear: 0,
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
      search: "",
      isBuyFirst: true,
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

    sort() {
      this.isBuyFirst = !this.isBuyFirst;

      const order = this.isBuyFirst ? -1 : 1;
      this.list.sort((a, b) =>
        a.isBuy === b.isBuy ? 0 : a.isBuy ? order : -order
      );
    },

    calcTotal() {
      this.valueTotal = 0;

      this.list.map((itemMap) => {
        this.valueTotal += itemMap.totalValue;
      });
    },

    showModalConfirmClearItem(id: number) {
      this.idClear = id;
      this.confirmClearItem = true;
    },

    deleteItem() {
      this.list.splice(this.idClear, 1);
      this.calcTotal();
    },

    showModalConfirmClearList() {
      this.confirmClearList = true;
    },

    deleteList() {
      this.list = [
        {
          qtd: null,
          item: "",
          unityValue: null,
          totalValue: 0,
          isBuy: false,
        },
      ];
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

  watch: {
    search(termo) {
      const termoNormalizado = termo.toLowerCase();

      const itensComTermo = this.list.filter((item) =>
        item.item.toLowerCase().includes(termoNormalizado)
      );

      const itensSemTermo = this.list.filter(
        (item) => !item.item.toLowerCase().includes(termoNormalizado)
      );

      // Retorna os itens com o termo primeiro, seguidos pelos demais
      this.list = [...itensComTermo, ...itensSemTermo];
    },
  },
});
