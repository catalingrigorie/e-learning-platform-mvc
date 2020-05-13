<template>
  <v-content>
    <v-container>
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
                    Categories
                  </v-btn>
                </template>

                <v-list>
                  <v-list-group v-for="(item, index) in items" :key="index">
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
                      v-for="(subItem, idx) in item.items"
                      :key="idx"
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-arrow-right</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>
                        <v-btn text :to="{ path: '/browse/' + subItem }">
                          {{ subItem }}
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </v-menu>

              <v-divider class="mx-4" vertical></v-divider>

              <v-autocomplete
              
                v-model="searchModel"
                :items="results"
                :loading="isLoading"
                :search-input.sync="search"
                color="primary"
                hide-no-data
                hide-details
                single-line
                dense
                outlined
                item-text="name"
                class="ml-10 hidden-md-and-down"
                item-value="_id"
                @change="redirect($event)"
                label="Search"
                placeholder="Search for anything"
              ></v-autocomplete>

              <v-spacer></v-spacer>

              <v-btn
                v-if="!isAuthenticated"
                class="mr-5"
                outlined
                color="primary"
                to="/login"
              >
                Login
              </v-btn>
              <v-btn color="primary" v-if="!isAuthenticated" to="/register">
                Register
              </v-btn>

              <v-btn
                color="primary"
                class="mr-5"
                v-if="
                  isAuthenticated && getUser != null &&
                    this.$route.path !== '/create' &&
                    getUser.role == 'publisher'
                "
                @click="createCamp"
              >
                Create Camp
              </v-btn>
              <v-menu
                v-model="menu"
                v-if="isAuthenticated"
                :close-on-content-click="false"
                :nudge-width="200"
              >
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon color="#792a5d" size="50"
                      >mdi-account-circle</v-icon
                    >
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
                        <v-list-item-title>{{
                          getUser.name
                        }}</v-list-item-title>
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
                      <v-btn block text>
                        Account
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
                <v-toolbar flat color="">
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
                  <v-list-group v-for="(item, index) in items" :key="index">
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
                      v-for="(subItem, idx) in item.items"
                      :key="idx"
                    >
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
  </v-content>
</template>

<script>
import axios from "axios";
import router from "../../router/index";

export default {
  data() {
    return {
      query: "",
      items: [
        {
          title: "Development",
          items: ["Web Development", "Software Development", "Mobile Apps"]
        },
        {
          title: "Data Science",
          items: [
            "Machine Learning",
            "Data Analysis",
            "Artificial Intelligence"
          ]
        },
        {
          title: "Robotics & Mechatronics",
          items: ["Robotics", "Mechatronics", "Artificial Vision"]
        },
        { title: "Finace & Accounting" },
        { title: "IT & Software" },
        { title: "Design" },
        { title: "Marketing" },
        { title: "Lifestyle" },
        { title: "Photography" }
      ],
      dialog: false,
      menu: false,
      user: null,
      email: null,
      entries: [],
      isLoading: false,
      searchModel: "",
      search: null
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isUserLoggedIn;
    },
    results() {
      return this.entries.map(entry => {
        return Object.assign({}, entry);
      });
    },
    getUser() {
      const user = localStorage.getItem("user");
      const userObj = JSON.parse(user);
      return userObj;
    }
  },
  watch: {
    search(val) {
      if (this.entries.length > 10) return;

      if (this.isLoading) return;

      this.isLoading = true;

      axios
        .get(`http://localhost:5000/api/v1/camps?name=${val}`)
        .then(response => {
          this.entries = response.data.results;
          this.isLoading = false;
          console.log(response.data.results);
        })
        .catch(err => {
          console.log(err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    createCamp() {
      this.$router.push({ path: "/create" });
    },
    redirect() {
      router.push(`/view/${this.searchModel}`);
    }
  }
};
</script>

<style lang="stylus"></style>
