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
        <q-card class="bg-red-8 rounded-borders">
          <q-card-section class="grid grid-cols-1 gt520:flex gap-2">
            <div class="flex gap-2 justify-between items-center">
              <q-checkbox size="lg" left-label v-model="orange" />
              <q-input
                v-model="text"
                class="max-gt520:w-48"
                rounded
                type="number"
                label="Qtd"
                bg-color="white"
                outlined
              />
              <q-btn
                v-if="$q.screen.width < 520"
                rounded
                color="red"
                icon="delete"
                @click="onClick"
              />
            </div>
            <q-input
              v-model="text"
              type="text"
              label="Item"
              bg-color="white"
              rounded
              outlined
            />
            <q-input
              v-model="text"
              type="number"
              label="Valor Unidade"
              bg-color="white"
              rounded
              outlined
            />
            <q-input
              v-model="text"
              type="number"
              label="Valor total"
              bg-color="white"
              rounded
              outlined
            />
            <q-btn
              v-if="$q.screen.width > 520"
              rounded
              color="red"
              icon="delete"
              @click="onClick"
            />
          </q-card-section>
        </q-card>
        <q-card class="bg-green-8 rounded-borders">
          <q-card-section class="grid grid-cols-1 gt520:flex gap-2">
            <div class="flex gap-2 justify-between items-center">
              <q-checkbox size="lg" left-label v-model="orange" />
              <q-input
                v-model="text"
                class="max-gt520:w-48"
                rounded
                type="number"
                label="Qtd"
                bg-color="white"
                outlined
              />
              <q-btn
                v-if="$q.screen.width < 520"
                rounded
                color="red"
                icon="delete"
                @click="onClick"
              />
            </div>
            <q-input
              v-model="text"
              type="text"
              label="Item"
              bg-color="white"
              rounded
              outlined
            />
            <q-input
              v-model="text"
              type="number"
              label="Valor Unidade"
              bg-color="white"
              rounded
              outlined
            />
            <q-input
              v-model="text"
              type="number"
              label="Valor total"
              bg-color="white"
              rounded
              outlined
            />
            <q-btn
              v-if="$q.screen.width > 520"
              rounded
              color="red"
              icon="delete"
              @click="onClick"
            />
          </q-card-section>
        </q-card>
      </main>
      <footer
        class="px-1 text-center"
        :class="$q.screen.width < 520 ? 'mb-32' : 'fixed right-0 bottom-0'"
      >
        <a
          href="https://github.com/Christian-M-Silva"
          target="_blank"
          class="bg-red-500 font-bold shadow-lg shadow-red-500/50 rounded-md p-2"
          >DEVELOPED 🎮 <span class="text-red-700">CHRISTIAN</span></a
        >
      </footer>
      <div
        class="row justify-between items-center fixed left-0 right-0 mx-auto bottom-0 bg-slate-950 gap-2 rounded-t-2xl p-4 gt520:w-1/2"
      >
        <span class="gt520:text-xl text-lg">R$ 650,00</span>
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
            label="Salvar temporariamente"
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
  </div>
</template>
<script src="./HomePage.ts"></script>
<style scoped src="./HomePage.css"></style>
