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
          <input-component
            v-model="text"
            type="text"
            placeholder="Busque por um item"
            bg-color="white"
          />
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
        <q-card dark class="bg-grey-9 rounded-borders">
          <q-card-section class="row">
            <q-checkbox left-label v-model="orange" />
            <q-input v-model="text" type="text" label="Qtd" />
            <q-input v-model="text" type="text" label="Item" />
            <q-input v-model="text" type="text" label="Valor Unidade" />
            <q-input v-model="text" type="text" label="Valor total" />
            <q-btn color="primary" icon="check" label="OK" @click="onClick" />
          </q-card-section>
        </q-card>

        <div class="row">
          <span>R$ 650,00</span>
          <q-btn
            color="primary"
            icon="check"
            label="Exportar"
            @click="onClick"
          />
          <q-btn
            color="primary"
            icon="check"
            label="Limpar lista"
            @click="onClick"
          />
        </div>
      </main>
    </div>
  </div>
</template>
<script src="./HomePage.ts"></script>
<style scoped src="./HomePage.css"></style>
