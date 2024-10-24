import { defineComponent } from "vue";
import InputComponent from "@/components/atoms/input/InputComponent.vue";
import { Item } from "@/interfaces/interfaces";
import * as XLSX from "xlsx"; // Importa xlsx-style

export default defineComponent({
  data() {
    return {
      alert: false,
      confirm: false,
      confirmClearItem: false,
      confirmClearList: false,
      confirmResetList: false,
      idClear: 0,
      list: [
        {
          qtd: null,
          item: "",
          unityValue: null,
          totalValue: 0,
          isBuy: false,
        },
      ] as Item[],
      pendingReload: false,
      valueTotal: 0,
      search: "",
      isBuyFirst: true,
    };
  },
  components: { InputComponent },
  methods: {
    triggerFileInput() {
      const input = this.$refs.fileInput as HTMLInputElement | null;
      if (input) {
        input.click(); // Simula o clique no input
      }
    },
    exportExcel() {
      // Converte os objetos para um formato adequado para o SheetJS
      const dados = this.list.map((obj) => ({
        qtd: obj.qtd,
        item: obj.item,
        unityValue: obj.unityValue,
        totalValue: obj.totalValue,
        isBuy: obj.isBuy,
      }));

      // Adiciona uma linha vazia + a linha de total
      dados.push({
        qtd: null,
        item: "Total",
        unityValue: null,
        totalValue: 0,
        isBuy: null,
      });

      // Criação da planilha
      const worksheet = XLSX.utils.json_to_sheet(dados);

      // Adiciona a fórmula de soma para o campo `totalValue`
      const totalRowIndex = dados.length; // Índice da linha de total
      worksheet[`D${totalRowIndex + 1}`] = { f: `SUM(D2:D${totalRowIndex})` };

      const ref = worksheet["!ref"];

      if (ref) {
        const range = XLSX.utils.decode_range(ref);

        // Itera sobre as colunas para definir os nomes dos cabeçalhos
        for (let col = range.s.c; col <= range.e.c; col++) {
          const headerCell = XLSX.utils.encode_cell({ r: 0, c: col });
          switch (Object.keys(this.list[0])[col]) {
            case "qtd":
              worksheet[headerCell].v = "Quantidade";
              break;
            case "item":
              worksheet[headerCell].v = "Item";
              break;
            case "unityValue":
              worksheet[headerCell].v = "Valor unitário";
              break;
            case "totalValue":
              worksheet[headerCell].v = "Valor total";
              break;
            case "isBuy":
              worksheet[headerCell].v = "Comprado";
              break;
          }
        }
      } else {
        console.error("Referência de range não encontrada na planilha.");
      }

      // Cria o workbook e adiciona a worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Lista de Compras");

      // Exporta o arquivo Excel
      XLSX.writeFile(workbook, "lista_compras.xlsx");
    },
    // eslint-disable-next-line
    async importExcel(files: any) {
      const file = (files.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const data = await file.arrayBuffer(); // Lê o arquivo como um buffer
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Pega a primeira aba
      // eslint-disable-next-line
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
        defval: null,
      });

      // Mapeia os dados de volta para o formato esperado
      this.list = jsonData
        .filter((row) => row.Item !== "Total") // Ignora a linha de total
        .map((row) => ({
          qtd: row.Quantidade || 0,
          item: row.Item || "",
          unityValue: row["Valor unitário"] || 0,
          totalValue: row["Valor total"] || 0,
          isBuy: row.Comprado === "Sim",
        }));

      this.calcTotal();
    },
    calcTotalItem(item: Item, id: number) {
      if (item.unityValue !== null && item.qtd !== null) {
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

    resetList() {
      this.list.map((item) => {
        item.unityValue = 0;
        item.totalValue = 0;
        item.isBuy = false;
      });
      this.calcTotal();
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

  computed: {
    formattedValue(): string {
      return this.valueTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
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
