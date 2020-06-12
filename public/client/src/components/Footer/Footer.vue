<template>
  <v-container fluid class="pa-0">
    <v-container fluid class="blue lighten-1 pa-0">
      <v-container class="pa-5">
        <v-row class="" no-gutters align="center" justify="center">
          <v-col cols="12" lg="4">
            <h3
              class="title text-uppercase font-weight-bold text-center mb-0 text-lg-right white--text"
            >
              Get our newsletter
            </h3>
          </v-col>
          <v-col cols="8" lg="4">
            <v-text-field
              dark
              outlined
              class="mx-4 px-6"
              label="Email"
              dense
              single-line
              hide-details
              v-model="nlEmail"
            ></v-text-field>
          </v-col>
          <v-col cols="4" lg="4">
            <v-btn @click="signNl()" dark depressed default outlined text
              >SUBSCRIBE</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container fluid class="grey darken-4">
      <v-footer class="grey darken-4" padless>
        <v-container class="grey darken-4 mt-5 mb-5">
          <v-row no-gutters align="center" justify="center">
            <v-col cols="12" lg="5" xl="5">
              <v-card class="pa-10 grey darken-4" elevation="0" text>
                <v-card-title>
                  <router-link to="/">
                    <v-img
                      width="100"
                      class="mb-4"
                      src="http://localhost:5000/images/loho.png"
                    ></v-img>
                  </router-link>
                  <p
                    class="base-body body-1 white--text text--lighten-1 text-left mb-10"
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Illo pariatur quidem, quis modi iure nihil commodi suscipit,
                    corporis dicta adipisci, voluptatum quia cupiditate. Nulla
                    minus voluptatum nostrum deleniti, asperiores facere.
                  </p>
                </v-card-title>
                <v-select
                  @change="languageChanged"
                  :items="langArr"
                  outlined
                  label="Language"
                  class="pa-2"
                  :value="getLang"
                  dark
                ></v-select>
                <v-container class="pa-0">
                  <div class="pt-1 mb-0 d-flex">
                    <div class="base-avatar d-inline-flex mb-3">
                      <div class="v-avatar base-avatar__avatar transparent">
                        <v-icon color="white" size="50px"
                          >mdi-exclamation</v-icon
                        >
                      </div>
                      <div class="ml-6">
                        <h3
                          class="text-uppercase white--text title font-weight-bold mb-3 text-left "
                        >
                          Address
                        </h3>
                        <p
                          class="base-body body-1 mx-auto white--text text--lighten-1 text-left mb-0"
                        >
                          <span
                            >Lorem ipsum dolor sit. <br />
                            Lorem, ipsum dolor.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="pt-1 mb-0 d-flex">
                    <div class="base-avatar d-inline-flex mb-3">
                      <div class="v-avatar base-avatar__avatar transparent">
                        <v-icon color="white" size="50px">mdi-phone</v-icon>
                      </div>
                      <div class="ml-6">
                        <h3
                          class="text-uppercase white--text title font-weight-bold mb-3 text-left "
                        >
                          EMAIL
                        </h3>
                        <p
                          class="base-body body-1 mx-auto white--text text--lighten-1 text-left mb-0"
                        >
                          <span
                            >admin@gmail.com <br />
                            admin@gmail.com
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="pt-1 mb-0 d-flex">
                    <div class="base-avatar d-inline-flex mb-3">
                      <div class="v-avatar base-avatar__avatar transparent">
                        <v-icon color="white" size="50px">mdi-email</v-icon>
                      </div>
                      <div class="ml-6">
                        <h3
                          class="text-uppercase white--text title font-weight-bold mb-3 text-left "
                        >
                          PHONE
                        </h3>
                        <p
                          class="base-body body-1 mx-auto white--text text--lighten-1 text-left mb-0"
                        >
                          <span
                            >01 (800) 433 744 <br />
                            01 (800) 433 744
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </v-container>
              </v-card>
            </v-col>
            <v-col
              cols="12"
              xl="2"
              lg="2"
              class="text-center d-block"
              stlye="height: 100%"
            >
            </v-col>
            <v-col cols="12" lg="5" xl="5">
              <v-card
                color="grey darken-4"
                dark
                elevation="0"
                text
                class="pa-10"
              >
                <v-form ref="form" v-model="valid">
                  <v-card-title class="pl-0">
                    MAIL US YOUR MESSAGE
                  </v-card-title>
                  <v-text-field
                    :rules="[rules.required]"
                    outlined
                    label="Name"
                    v-model="name"
                  ></v-text-field>
                  <v-text-field
                    :rules="[rules.email]"
                    outlined
                    label="Email"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    :rules="[rules.required]"
                    outlined
                    label="Subject"
                    v-model="subject"
                  ></v-text-field>
                  <v-textarea
                    :rules="[rules.required]"
                    outlined
                    name="Your Need & Description"
                    label="Your Need & Description"
                    v-model="message"
                  ></v-textarea>
                  <v-btn
                    @click="validate"
                    :disabled="!valid"
                    dark
                    depressed
                    outlined
                    default
                    text
                    >SEND MESSAGE</v-btn
                  >
                </v-form>
              </v-card>
            </v-col>
          </v-row>
          <v-divider dark class="ma-5 pa-5"></v-divider>
          <v-row dense align="center" justify="center">
            <v-col cols="12" class="mt-auto">
              <v-card class="grey darken-4" elevation="0">
                <v-row align="center" justify="center">
                  <v-card-title class="">
                    <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                      <v-icon color="white" size="24px">{{ icon }}</v-icon>
                    </v-btn>
                  </v-card-title>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="grey darken-4" elevation="0">
                <p class="text-center white--text">
                  {{ new Date().getFullYear() }} —
                  <strong>E-Learning Platform</strong>
                </p>
              </v-card>
            </v-col>
          </v-row>
          <v-snackbar dark v-model="snackbar">
            {{ error }}
            <v-btn color="red" text @click="closeSnackBar">
              Close
            </v-btn>
          </v-snackbar>
        </v-container>
      </v-footer>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      snackbar: false,
      error: null,
      langArr: ["Romana", "English"],
      nlEmail: "",
      email: null,
      subject: null,
      message: null,
      name: null,
      valid: true,
      icons: [
        "mdi-facebook",
        "mdi-twitter",
        "mdi-google-plus",
        "mdi-linkedin",
        "mdi-instagram",
      ],
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    languageChanged(e) {
      if (this.getLang == e) return;
      this.$store.dispatch("changeLanguage", e);
      this.$router.go();
    },
    signNl() {
      if (this.rules.email(this.nlEmail) === true) {
        axios
          .post("http://localhost:5000/api/v1/newsletter", {
            email: this.nlEmail,
          })
          .catch((err) => {
            console.log(err.message);
          })
          .finally(() => {
            this.snackbar = true;
            this.error = "Subscribed!";
          });
      } else {
        this.snackbar = true;
        this.error = "Invalid Email";
      }
    },
    async validate() {
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:5000/api/v1/message", {
            name: this.name,
            subject: this.subject,
            email: this.email,
            message: this.message,
          })
          .catch((err) => {
            this.snackbar = true;
            this.error = err.message;
          })
          .finally(() => {
            if (this.error === null) {
              this.snackbar = true;
              this.error = "Message sent!";
              this.$refs.form.reset();
            }
          });
      }
    },
    closeSnackBar() {
      this.snackbar = false;
      this.error = null;
    },
  },
  computed: {
    getLang() {
      return this.$store.getters.getLang;
    },
  },
};
</script>

<style lang="stylus"></style>
