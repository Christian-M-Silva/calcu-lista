import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { Money3Directive } from "v-money3";

createApp(App)
  .directive("money3", Money3Directive)
  .use(Quasar, quasarUserOptions)
  .use(router)
  .mount("#app");
