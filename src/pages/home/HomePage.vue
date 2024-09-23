<template>
  <div class="mx-3">
    <div class="row justify-center">
      <div class="rounded-xl bg-primary text-white min-h-screen">
        <header class="bg-black">
          <h2 class="py-5">Calcu-lista</h2>
          <div class="row justify-center gap-7">
            <q-btn color="primary" icon="check" label="OK" @click="onClick" />
            <input-component
              v-model="text"
              type="text"
              placeholder="Busque por um item"
              bg-color="white"
            />
            <q-btn color="primary" icon="check" label="OK" @click="onClick" />
          </div>
        </header>
        <div class="row">
          <q-checkbox left-label v-model="orange" />
          <q-input v-model="text" type="text" label="Qtd" />
          <q-input v-model="text" type="text" label="Item" />
          <q-input v-model="text" type="text" label="Valor Unidade" />
          <q-input v-model="text" type="text" label="Valor total" />
          <q-btn color="primary" icon="check" label="OK" @click="onClick" />
        </div>
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
      </div>
    </div>
  </div>
</template>
<script src="./HomePage.ts"></script>
<style scoped src="./HomePage.css"></style>
