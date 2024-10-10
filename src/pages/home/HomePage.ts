import { defineComponent } from "vue";
import InputComponent from "@/components/atoms/input/InputComponent.vue";
export default defineComponent({
  data() {
    return {
      alert: true,
    };
  },
  components: { InputComponent },
});
