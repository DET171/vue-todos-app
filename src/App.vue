<script setup lang="ts">
import Todos from './components/Todos.vue';
</script>

<template>
  <v-app>
    <v-main>
      <Todos />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',

	data() {
		return {
			//
		};
	},
});
</script>
