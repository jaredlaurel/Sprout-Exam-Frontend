<template>
  <v-container fluid>
    <v-btn
      :flat="config.vuetify.theme.flat"
      v-if="isLoggedIn"
      icon
      to="/employee"
      color="success"
      style="position: fixed; bottom: 10px; right: 10px; z-index: 9999"
    >
      <v-icon icon="fa-solid fa-plus"></v-icon>
    </v-btn>
    <v-row class="pa-2">
      <employeeComponent v-for="(item, index) in employees" v-bind:item="item" v-bind:index="index" v-bind:key="item.id"></employeeComponent>
    </v-row>
    <v-row v-if="!employees || !employees.length" align="start" justify="center">
      <v-col cols="12">
        <v-card class="ma-6 pa-6" :style="{ background: config.vuetify.theme.themes[theme].colors.surface }" :flat="config.vuetify.theme.flat">
          <h2 class="text-center">No Employees found!</h2>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * Module dependencies.
 */
import { mapGetters } from 'vuex';
import employeeComponent from '../components/employee.component.vue';
/**
 * Export default
 */
export default {
  data: () => ({
    direction: 'bottom',
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: true,
    right: true,
    bottom: false,
    left: false,
    transition: 'slide-y',
  }),
  components: {
    employeeComponent,
  },
  computed: {
    ...mapGetters(['theme', 'isLoggedIn', 'employees']),
  },
  created() {
    this.$store.dispatch('getEmployees');
  },
};
</script>
