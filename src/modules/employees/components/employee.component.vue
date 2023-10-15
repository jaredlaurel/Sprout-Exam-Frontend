<template>
  <v-col cols="12" sm="12" md="6" lg="4" xl="3">
    <v-card class="mx-auto" :style="{ background: config.vuetify.theme.themes[theme].colors.surface }" :flat="config.vuetify.theme.flat">
      <v-card-title>{{ item.first_name }} {{ item.last_name }}</v-card-title>
      <v-card-subtitle>{{ item.email }}</v-card-subtitle>
      <v-card-subtitle>{{ item.type }}</v-card-subtitle>
      <v-card-actions v-if="isLoggedIn">
        <div class="flex-grow-1"></div>
        <v-btn color="success" v-if="item.id" :to="`/employee/${item.id}`" icon>
          <v-icon icon="fa-solid fa-eye"></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
/**
 * Module dependencies.
 */
import { mapGetters } from 'vuex';
/**
 * Export default
 */
export default {
  name: 'employeeComponent',
  props: ['item'],
  computed: {
    ...mapGetters(['isLoggedIn', 'theme']),
  },
};
</script>
