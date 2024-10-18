import { defineComponent } from "vue";
import InputComponent from "@/components/atoms/input/InputComponent.vue";
export default defineComponent({
  data() {
    return {
      alert: false,
      confirm: false,
      list: [
        {
          qtd: 0,
          item: "",
          unityValue: 0,
          totalValue: 0,
          isBuy: false,
        },
      ],
    };
  },
  components: { InputComponent },
  methods: {
    calcTotal(item: any, id: number) {
      this.list[id].totalValue = item.unityValue * item.qtd;
    },
    addItem() {
      this.list.push({
        qtd: 0,
        item: "",
        unityValue: 0,
        totalValue: 0,
        isBuy: false,
      });
    },
  },
});
