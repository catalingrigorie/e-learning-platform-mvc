<template>
  <v-content>
    <v-container>
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
          </v-menu>

          <v-divider class="mx-4" vertical></v-divider>

          <v-text-field
            class="ml-10 hidden-md-and-down"
            hide-details
            single-line
            outlined
            dense
            label="Search for anything"
            v-model="query"
            style="width: 50px"
          ></v-text-field>

          <!-- <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="API"
        label="Public APIs"
        placeholder="Start typing to Search"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete> -->

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
            class="mr-5"
            outlined
            color="primary"
            v-if="isAuthenticated"
            to="/browse/camps"
          >
            Browse Camps
          </v-btn>
          <!-- <v-btn
            outlined
            class=""
            color="primary"
            v-if="isAuthenticated"
            @click="logout"
          >
            Logout
          </v-btn> -->
          <v-menu
            v-model="menu"
            v-if="isAuthenticated"
            :close-on-content-click="false"
            :nudge-width="200"
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

                  <v-list-item-content>
                    <v-list-item-title>{{ user }}</v-list-item-title>
                    <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
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
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isUserLoggedIn;
    }
    // user() {
    //   return this.$store.state.user;
    // },
    // email() {
    //   return this.$store.state.email;
    // }
  },
  data() {
    return {
      query: "",
      items: [
        { title: "Development", items: { title: "Web Development" }, icon: "" },
        { title: "Business" },
        { title: "Finace & Accounting" },
        { title: "IT & Software" },
        { title: "Office & Productivity" },
        { title: "Design" },
        { title: "Marketing" },
        { title: "Lifestyle" },
        { title: "Photography" },
        { title: "Health & Fitness" },
        { title: "Music" }
      ],
      dialog: false,
      menu: false,
      user: null,
      email: null
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  created() {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/v1/auth/currentuser", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        this.user = response.data.user.name;
        this.email = response.data.user.email;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="stylus"></style>
