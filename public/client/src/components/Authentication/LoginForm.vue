<template>
  <v-container fluid class="bg-color">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="8" lg="4" xl="3">
        <v-card elevation="0" class="mt-10 mb-10">
          <v-card-title class="linear-gradient" dark flat>
            Log in to your account
          </v-card-title>
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
              <v-alert v-if="errors" type="error" outlined>
                {{ errors }}
              </v-alert>
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
                  <router-link to="forgotpassword"
                    >Forgot password ?</router-link
                  >
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
  </v-container>
</template>

<script>
import loginLayout from "../../layouts/loginLayout";

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
        },
        validationError: erorrs => !!erorrs || ""
      },
      errors: ""
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password
          });
        } catch (error) {
          this.errors = error.response.data.error;
        }
      }
    }
  },
  created() {
    this.$emit("update:layout", loginLayout);
  }
};
</script>

<style lang="scss">
.height {
  height: 60vh;
}

.linear-gradient {
  background: rgb(251, 63, 63) !important;
  background: linear-gradient(
    14deg,
    rgba(251, 63, 63, 1) 0%,
    rgba(70, 92, 252, 1) 100%
  ) !important;
}
</style>
