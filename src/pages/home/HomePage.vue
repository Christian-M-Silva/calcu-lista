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
            class="w-80"
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
        class="ellipsis glass rounded-t-3xl min-h-[calc(100vh-14.5rem)] pt-5 px-4"
      >
        <q-card class="bg-red-8 mt-4 rounded-borders">
          <q-card-section class="row gap-2">
            <q-checkbox left-label v-model="orange" />
            <q-input
              v-model="text"
              type="text"
              label="Qtd"
              bg-color="white"
              outlined
            />
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
              type="text"
              label="Valor Unidade"
              bg-color="white"
              rounded
              outlined
            />
            <q-input
              v-model="text"
              type="text"
              label="Valor total"
              bg-color="white"
              rounded
              outlined
            />
            <q-btn rounded color="red" icon="delete" @click="onClick" />
          </q-card-section>
        </q-card>
        <q-card class="bg-green-8 mt-4 rounded-borders">
          <q-card-section class="row gap-2">
            <q-checkbox left-label v-model="orange" />
            <q-input
              v-model="text"
              type="text"
              label="Qtd"
              bg-color="white"
              outlined
            />
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
              type="text"
              label="Valor Unidade"
              bg-color="white"
              rounded
              outlined
            />
            <q-input
              v-model="text"
              type="text"
              label="Valor total"
              bg-color="white"
              rounded
              outlined
            />
            <q-btn rounded color="red" icon="delete" @click="onClick" />
          </q-card-section>
        </q-card>
      </main>
      <div
        class="row justify-between items-center fixed left-0 right-0 mx-auto bottom-0 w-1/2 bg-slate-950 gap-2 rounded-t-2xl p-4"
      >
        <span class="">R$ 650,00</span>
        <div class="row gap-2">
          <q-btn
            color="positive"
            icon="upgrade"
            label="Exportar"
            @click="onClick"
          />
          <q-btn
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
