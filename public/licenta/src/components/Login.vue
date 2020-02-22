<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="8" lg="4" xl="3">
      <v-card class="elevation-12">
        <v-toolbar color="light-blue darken-3" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid">
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
              :rules="[rules.required]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-container fill-height fluid class="pa-0">
            <v-row align="center" justify="center">
              <v-col cols="12" lg="8" md="6" sm="6" class="text-center pa-1">
                <router-link to="register"
                  >Don't have an account? Register.</router-link
                >
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" lg="8" md="6" sm="4" class="text-center pa-1">
                <router-link to="forgotpassword">Forgot password ?</router-link>
              </v-col>
            </v-row>
            <v-row align="center" justify="center">
              <v-col cols="12" lg="8" md="6" sm="4" class="text-center pa-1">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class=""
                  @click="validate"
                  >Login</v-btn
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
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
      valid: true,
      rules: {
        required: value => !!value || "Required.",
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
        axios
          .post("http://localhost:5000/v1/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            this.$store.dispatch("setToken", response.data.token);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
};
</script>
