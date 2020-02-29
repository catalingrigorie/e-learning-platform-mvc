<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="8" lg="4" xl="3">
      <v-card tile>
        <v-toolbar color="light-blue darken-3" dark flat>
          <v-toolbar-title>Register an account</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              label="Name"
              v-model="name"
              name="name"
              type="text"
              :rules="[rules.required]"
            />

            <v-text-field
              label="Email"
              v-model="email"
              name="email"
              type="email"
              :rules="[rules.required, rules.email]"
            />

            <v-text-field
              label="Password"
              name="password"
              type="password"
              v-model="password"
              :rules="[rules.required, rules.minLength]"
            />
            <v-radio-group
              class=""
              :rules="[rules.required]"
              v-model="role"
              :mandatory="true"
              label="What are you here for ?"
            >
              <v-radio
                class="mt-2"
                label="I want to find new things to learn!"
                value="user"
              ></v-radio>
              <v-radio
                class="mt-2"
                label="I want to publish courses and teach!"
                value="publisher"
              ></v-radio>
            </v-radio-group>
            <v-alert v-if="checkErorrs" type="error" outlined>
              {{ checkErorrs }}
            </v-alert>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-container fill-height fluid class="pa-0">
            <v-row align="center" justify="center">
              <v-col cols="12" lg="8" md="6" sm="4" class="text-center pa-3">
                <router-link to="login"
                  >Login if you already have an account.</router-link
                >
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" lg="8" md="6" sm="4" class="text-center pa-1">
                <v-btn
                  @click="validate"
                  :disabled="!valid"
                  color="success"
                  class=""
                  >Register</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import loginLayout from "../layouts/loginLayout";

export default {
  name: "Login",
  computed: {
    checkErorrs() {
      return this.$store.getters.checkErorrs;
    }
  },
  data() {
    return {
      password: "",
      email: "",
      name: "",
      role: "",
      valid: true,
      rules: {
        required: value => !!value || "Required.",
        minLength: value =>
          value.length >= 6 || "Minimum 6 characters required",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("register", {
          email: this.email,
          password: this.password,
          role: this.role,
          name: this.name
        });
      }
    }
  },
  created() {
    this.$emit("update:layout", loginLayout);
  }
};
</script>
