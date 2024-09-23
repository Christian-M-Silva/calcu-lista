<template>
  <q-input v-bind="$attrs" rounded outlined>
    <template v-slot:append>
      <q-avatar>
        <q-icon name="search" size="2rem" />
      </q-avatar>
    </template>
  </q-input>
</template>
<script src="./InputComponent.ts"></script>
