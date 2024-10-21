<template>
  <div class="row justify-center bg-image bg-no-repeat bg-cover bg-center">
    <div :class="`${$q.screen.lt.md ? '' : 'rounded-xl'} text-white`">
      <header class="pt-4">
        <h2 class="py-8">Calcu-lista</h2>
        <div class="row justify-center gap-7 pb-9">
          <q-btn
            text-color="white"
            icon="vertical_align_bottom"
            @click="onClick"
            outline
            rounded
          />
          <q-input
            v-model="text"
            type="text"
            placeholder="Busque por um item"
            bg-color="white"
            rounded
            class="gt520:w-80 w-52"
            outlined
          >
            <template v-slot:append>
              <q-avatar>
                <q-icon name="search" size="2rem" />
              </q-avatar>
            </template>
          </q-input>

          <q-btn
            text-color="white"
            icon="import_export"
            @click="onClick"
            outline
            rounded
          />
        </div>
      </header>
      <main
        class="flex flex-col ellipsis max-gt520:w-screen glass rounded-t-3xl min-h-[calc(100vh-14.5rem)] py-5 px-4 max-gt520:mb-6 gap-2"
      >
        <q-btn
          v-if="$q.screen.width < 520"
          color="grey"
          icon="clear_all"
          label="Limpar lista"
          @click="onClick"
        />
        <q-card v-for="(item, id) in list" :key="id" class="rounded-borders">
          <q-card-section
            :class="item.isBuy ? 'bg-green-8' : 'bg-red-8'"
            class="grid grid-cols-1 gt520:flex gap-2"
          >
            <div class="flex gap-2 justify-between items-center">
              <q-checkbox size="lg" left-label v-model="item.isBuy" />
              <q-input
                v-model="item.qtd"
                class="max-gt520:w-48"
                rounded
                type="number"
                label="Qtd"
                bg-color="white"
                outlined
                @update:model-value="calcTotalItem(item, id)"
              />
              <q-btn
                v-if="$q.screen.width < 520"
                rounded
                color="red"
                icon="delete"
                :disable="list.length == 1"
                @click="showModalConfirm(id)"
              />
            </div>
            <q-input
              v-model="item.item"
              type="text"
              label="Item"
              bg-color="white"
              rounded
              outlined
            />
            <q-input
              v-model="item.unityValue"
              type="number"
              label="Valor Unidade"
              bg-color="white"
              rounded
              outlined
              @update:model-value="calcTotalItem(item, id)"
            />
            <q-input
              v-model="item.totalValue"
              type="number"
              label="Valor total"
              bg-color="white"
              rounded
              disable
              outlined
            />
            <q-btn
              v-if="$q.screen.width > 520"
              rounded
              color="red"
              icon="delete"
              :disable="list.length == 1"
              @click="showModalConfirm(id)"
            />
          </q-card-section>
        </q-card>
        <q-btn color="primary" icon="add" @click="addItem" />
      </main>
      <footer
        class="px-1 text-center"
        :class="$q.screen.width < 520 ? 'mb-24' : 'fixed right-0 bottom-0'"
      >
        <a
          href="https://github.com/Christian-M-Silva"
          target="_blank"
          class="bg-red-500 font-bold shadow-lg shadow-red-500/50 rounded-md p-2"
          >DEVELOPED 🎮 <span class="text-red-700">CHRISTIAN</span></a
        >
      </footer>
      <div
        class="row justify-between items-center fixed left-0 right-0 mx-auto bottom-0 bg-slate-950 gap-2 rounded-t-2xl p-4 gt520:w-[48%]"
      >
        <span class="gt520:text-xl text-lg">R$ {{ valueTotal }}</span>
        <div class="row gap-1">
          <q-btn
            color="positive"
            icon="upgrade"
            label="Exportar"
            :size="$q.screen.width < 520 ? '12px' : ''"
            @click="onClick"
          />
          <q-btn
            color="blue"
            icon="save"
            label="Salvar"
            :size="$q.screen.width < 520 ? '12px' : ''"
            @click="onClick"
          />
          <q-btn
            v-if="$q.screen.width > 520"
            color="grey"
            icon="clear_all"
            label="Limpar lista"
            @click="onClick"
          />
        </div>
      </div>
    </div>
    <q-dialog v-model="alert">
      <q-card class="shadow-lg rounded-lg bg-dark">
        <q-card-section class="bg-gray-900 text-white py-4 px-6 rounded-t-lg">
          <div class="font-bold text-2xl">Atenção</div>
        </q-card-section>

        <q-card-section
          class="bg-gray-900 py-4 px-6 text-gray-300 text-base leading-relaxed"
        >
          Os dados estão sendo salvos localmente no seu navegador. No entanto,
          caso o histórico ou os dados de navegação sejam limpos, essas
          informações poderão ser perdidas. Para ter os dados salvos sugerimos a
          exportação dos dados.
        </q-card-section>

        <div class="bg-gray-900 pl-2 py-2 flex items-center">
          <q-checkbox v-model="orange" />
          <span class="text-gray-400 font-medium">Não mostrar novamente</span>
        </div>

        <q-card-actions align="right" class="bg-gray-900 py-2 px-6">
          <q-btn
            flat
            label="Entendido"
            color="white"
            class="text-gray-400"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm">
      <q-card class="shadow-lg rounded-lg bg-dark">
        <q-card-section class="bg-gray-900 text-white py-4 rounded-t-lg">
          <div class="font-bold gt520:text-2xl text-lg">
            Deseja apagar todos os itens da lista?
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-gray-900 py-2 px-6">
          <q-btn label="SIM" color="green" text-color="black" v-close-popup />
          <q-btn label="NÃO" color="red" text-color="black" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmClearItem">
      <q-card class="shadow-lg rounded-lg bg-dark">
        <q-card-section class="bg-gray-900 text-white py-4 rounded-t-lg">
          <div class="font-bold gt520:text-2xl text-lg">
            Confirme a exclusão do item {{ list[idClear].item }}
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-gray-900 py-2 px-6">
          <q-btn
            label="Confirmar"
            color="green"
            text-color="black"
            @click="deleteItem"
            v-close-popup
          />
          <q-btn
            label="cancelar"
            color="red"
            text-color="black"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script src="./HomePage.ts"></script>
<style scoped src="./HomePage.css"></style>
