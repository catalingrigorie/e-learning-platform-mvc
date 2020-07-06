<template>
  <v-container style="border-bottom: 1px solid #E0E0E0" fluid>
    <v-row justify="center" no-gutters>
      <v-col cols="12" xl="10">
        <v-card class="hidden-sm-and-down" elevation="0">
          <v-toolbar color="white" elevation="0">
            <router-link to="/">
              <v-img
                width="100"
                src="http://localhost:5000/images/loho.png"
              ></v-img>
            </router-link>

            <v-divider class="mx-4" vertical></v-divider>

            <v-menu
              min-width="350"
              :close-on-content-click="false"
              open-on-hover
              transition="slide-y-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn class="" color="primary" outlined v-on="on">
                  {{ getLang == "Romana" ? "Categorii" : "Categories" }}
                </v-btn>
              </template>

              <v-list>
                <v-list-group
                  v-for="(item, index) in items[getLang]"
                  :key="index"
                >
                  <template v-slot:activator>
                    <v-list-item-icon>
                      <v-icon>mdi-laptop-windows</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item
                    v-for="(subItem, index) in item.items"
                    :key="index"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      <v-btn text :to="{ path: '/browse/' + subItem }">
                        {{ index }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-menu>

            <v-divider class="mx-4" vertical></v-divider>
            <Autocomplete></Autocomplete>
            <v-spacer></v-spacer>

            <v-btn
              v-if="!isAuthenticated"
              class="mr-5"
              outlined
              color="primary"
              to="/login"
            >
              {{ getLang == "Romana" ? "Autentificare" : "Login" }}
            </v-btn>
            <v-btn color="primary" v-if="!isAuthenticated" to="/register">
              {{ getLang == "Romana" ? "Inregistrare" : "Register" }}
            </v-btn>

            <v-btn
              color="primary"
              class="mr-5"
              v-if="
                isAuthenticated &&
                  getUser != null &&
                  this.$route.path !== '/create' &&
                  (getUser.role == 'admin' || getUser.role == 'publisher')
              "
              @click="createCamp"
            >
              {{ getLang == "Romana" ? "Anunt Nou" : "Create" }}
            </v-btn>
            <v-menu
              v-model="menu"
              v-if="isAuthenticated"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-y="200"
            >
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon color="#792a5d" size="50">mdi-account-circle</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <img
                        src="http://localhost:5000/images/profile-image-icon-25.jpg"
                        alt="user"
                      />
                    </v-list-item-avatar>

                    <v-list-item-content v-if="getUser != null">
                      <v-list-item-title>{{ getUser.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        getUser.email
                      }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn class="red--text fav" icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                  <v-list-item>
                    <v-btn
                      v-if="getUser.role != 'admin'"
                      :to="{ path: '/profile/' + getUser.name }"
                      block
                      text
                    >
                      {{ getLang == "Romana" ? "Profilul meu" : "ACCOUNT" }}
                    </v-btn>
                    <v-btn v-else block text :to="{ path: '/dashboard' }">
                      {{
                        getLang == "Romana" ? "Panou de Control" : "Dashboard"
                      }}
                    </v-btn>
                  </v-list-item>

                  <v-list-item>
                    <v-btn block text @click="logout">
                      Logout
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-toolbar>
        </v-card>
        <v-toolbar elevation="0" class="hidden-md-and-up">
          <router-link to="/">
            <v-img
              width="100"
              src="http://localhost:5000/images/loho.png"
            ></v-img>
          </router-link>
          <v-spacer></v-spacer>
          <template v-slot:activator> </template>
          <v-btn icon @click="dialog = true">
            <v-icon>mdi mdi-menu</v-icon>
          </v-btn>
          <v-dialog
            fullscreen
            hide-overlay
            v-model="dialog"
            transition="dialog-bottom-transition"
          >
            <v-card elevation="0">
              <v-toolbar text color="">
                <router-link to="/">
                  <v-img
                    width="70"
                    src="http://localhost:5000/images/loho.png"
                  ></v-img>
                </router-link>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>

              <v-list>
                <v-list-group
                  v-for="(item, index) in items[getLang]"
                  :key="index"
                >
                  <template v-slot:activator>
                    <v-list-item-icon>
                      <v-icon>mdi-laptop-windows</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item v-for="(subItem, idx) in item.items" :key="idx">
                    <v-list-item-icon>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                      {{ subItem }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Autocomplete from "../Navigation/Autocomplete";

export default {
  data() {
    return {
      query: "",
      lang: "",
      items: {
        English: [
          {
            title: "Software Development",
            items: {
              "Mobile Development": "Mobile Development",
              "Web Development": "Web Development",
              "Desktop Applications": "Desktop Applications",
            },
          },
          {
            title: "Robotics & Mechatronics",
            items: {
              Robotics: "Robotics",
              Mechatronics: "Mechatronics",
              "Artificial Vision": "Artificial Vision",
              "Artificial Intelligence": "Artificial Intelligence",
              "Programmable Logic Controller": "Programmable Logic Controller",
            },
          },
          {
            title: "IT & Software",
            items: {
              "Networking & Security": "Networking & Security",
              "Operating Systems": "Operating Systems",
              Hardware: "Hardware",
            },
          },
          {
            title: "Design",
            items: {
              "Web Design": "Web Design",
              "Graphic Design": "Graphic Design",
            },
          },
        ],
        Romana: [
          {
            title: "Dezvoltare Software",
            items: {
              "Aplicatii Mobile": "Mobile Development",
              "Programare Web": "Web Development",
              "Aplicatii Desktop": "Desktop Applications",
            },
          },
          {
            title: "Mecatronica si Robotica",
            items: {
              Robotica: "Robotics",
              Mecatronica: "Mechatronics",
              "Vedere Artificiala": "Artificial Vision",
              "Inteligenta Artificiala": "Artificial Intelligence",
              "Automate Programabile": "Programmable Logic Controller",
            },
          },
          {
            title: "IT si Software",
            items: {
              "Retele si securitate": "Networking & Security",
              "Sisteme de Operare": "Operating Systems",
              Hardwware: "Hardware",
            },
          },
          {
            title: "Design",
            items: {
              "Design Web": "Web Design",
              "Design Grafic": "Graphic Design",
            },
          },
        ],
      },
      dialog: false,
      menu: false,
      user: null,
      email: null,
    };
  },
  components: {
    Autocomplete,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isUserLoggedIn;
    },
    getUser() {
      const user = localStorage.getItem("user");
      const userObj = JSON.parse(user);
      return userObj;
    },
    getLang() {
      return this.$store.getters.getLang;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    createCamp() {
      this.$router.push({ path: "/create" });
    },
  },
};
</script>

<style lang="stylus"></style>
