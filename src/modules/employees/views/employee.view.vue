<!-- eslint-disable -->
<template>
  <v-container fluid>
    <!-- Header -->
    <v-row class="pa-2" justify="center">
      <v-col cols="12" sm="12" md="6" lg="8" xl="9">
        <v-card class="pa-6" :style="{ background: config.vuetify.theme.themes[theme].colors.surface }" :flat="config.vuetify.theme.flat">
         <v-row class="mx-2 my-1">
            <!-- <v-icon class="ma-2" icon="fa-solid fa-check"></v-icon> -->
            <h2 class="my-1 text-capitalize">Employee</h2>
            <v-spacer></v-spacer>
            <v-btn color="light" class="mr-4" @click="goBack">Back</v-btn>
            <v-btn v-if="!id" :disabled="!valid" color="success" class="mr-4" @click="create">Submit</v-btn>
            <v-btn v-if="id" @click="remove" color="error" class="mr-4">
              <!-- <v-icon icon="fa-solid fa-trash"></v-icon> -->
              Delete
            </v-btn>
            <v-btn v-if="id" @click="update" color="success" class="mr-4">
              <!-- <v-icon icon="fa-solid fa-save"></v-icon> -->
              Update
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- Form -->
    <v-row class="pa-2" justify="center">
      <v-col cols="12" sm="12" md="6" lg="8" xl="9">
        <v-card class="pa-6" :style="{ background: config.vuetify.theme.themes[theme].colors.surface }" :flat="config.vuetify.theme.flat">
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="firstname" :rules="[rules.required]" label="Firstname" required></v-text-field>
                <v-text-field v-model="lastname" :rules="[rules.required]" label="Lastname" required></v-text-field>
                <v-text-field v-model="email" :rules="[rules.required, rules.mail]" label="Email"></v-text-field>
                <v-select
                  v-model="type"
                  label="Type"
                  :items="['Regular', 'Contractual']"
                  @update:modelValue="changeType"
                ></v-select>
                <v-text-field
                  v-if="showRegularFields"
                  v-model="numberOfLeaves"
                  label="Number of Leaves"
                  type="number"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-if="showRegularFields"
                  v-model="benefits"
                  label="Benefits"
                ></v-text-field>
                <v-text-field
                  v-if="showContractualFields"
                  v-model="contractEndDate"
                  type="date"
                ></v-text-field>
                <v-text-field
                  v-if="showContractualFields"
                  v-model="project"
                  label="Project"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
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

/**
 * Export default
 */
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const formattedDate = `${yyyy}-${mm}-${dd}`;
export default {
  data() {
    return {
      // vue
      id: this.$route.params.id ? this.$route.params.id : null,
      save: null,
      // Description
      valid: false,
      rules: {
        required: (v) => !!v || 'Required',
        mail: (v) => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
      },
      // request
      loading: false,
      showRegularFields: true,
      showContractualFields: false,

      firstname: '',
      lastname: '',
      email: '',
      type: 'Regular',
      numberOfLeaves: 0,
      benefits: '',
      contractEndDate: formattedDate,
      project: '',
    };
  },
  components: {},
  computed: {
    ...mapGetters(['theme', 'result', 'employee']),
  },
  watch: {
    employee: {
      handler() {
        this.save = true;
      },
      deep: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    changeType() {
      if (this.type === 'Regular') {
        this.showRegularFields = true;
        this.showContractualFields = false;
      } else if (this.type === 'Contractual') {
        this.showRegularFields = false;
        this.showContractualFields = true;
      }
    },
    async create() {
      const form = await this.$refs.form.validate();
      if (form.valid) {
        const params = {
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          type: this.type,
          number_of_leaves: this.numberOfLeaves,
          benefits: this.benefits,
          contract_end_date: this.contractEndDate,
          project: this.project,
        };
        this.$store
          .dispatch('createEmployee', params)
          .then(() => {
            this.save = false;
            this.$router.push('/employees');
          })
          .catch((err) => console.log(err));
      }
    },
    async update() {
      const form = await this.$refs.form.validate();
      if (form.valid) {
        const toUpdate = {
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          type: this.type,
          number_of_leaves: this.numberOfLeaves,
          benefits: this.benefits,
          contract_end_date: this.contractEndDate,
          project: this.project,
        };
        this.$store
          .dispatch('updateEmployee', { id: this.id, params: toUpdate })
          .then(() => {
            this.save = false;
            this.$router.push('/employees');
          })
          .catch((err) => console.log(err));
      }
    },
    async remove() {
      const form = await this.$refs.form.validate();
      if (form.valid) {
        this.$store
          .dispatch('deleteEmployee', { id: this.id })
          .then(() => {
            this.$router.push('/employees');
          })
          .catch((err) => console.log(err));
      }
    },
  },
  created() {
    if (this.id) {
      this.$store
        .dispatch('getEmployee', { id: this.id })
        .then((data) => {
          this.firstname = data.first_name;
          this.lastname = data.last_name;
          this.email = data.email;
          this.type = data.type;
          this.numberOfLeaves = data.number_of_leaves;
          this.benefits = data.benefits;
          this.contractEndDate = data.contract_end_date;
          this.project = data.project;
          this.save = false;
          this.changeType();
        })
        .catch((err) => console.log(err));
    }
  },
};
</script>
