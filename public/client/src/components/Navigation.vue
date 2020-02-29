<template>
  <v-content>
    <v-container>
      <v-card elevation="0">
        <v-toolbar color="white" elevation="0" class="pl-5">
          <v-toolbar-title class="pa-0 ma-0">
            <router-link to="/">
              <v-img
                width="130"
                src="http://localhost:5000/images/logo.png"
              ></v-img>
            </router-link>
          </v-toolbar-title>

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
            class="ml-10 d-none d-sm-flex"
            hide-details
            single-line
            outlined
            dense
            label="Search for anything"
            v-model="query"
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

          <v-btn v-if="!isAuthenticated" outlined color="primary" to="/login">
            Login
          </v-btn>
          <v-divider v-if="!isAuthenticated" class="mx-4" vertical></v-divider>
          <v-btn
            outlined
            color="primary"
            v-if="!isAuthenticated"
            to="/register"
          >
            Register
          </v-btn>

          <v-btn outlined color="primary" v-if="isAuthenticated" to="/browse">
            Browse Camps
          </v-btn>
          <v-divider v-if="isAuthenticated" class="mx-4" vertical></v-divider>
          <v-btn
            outlined
            color="primary"
            v-if="isAuthenticated"
            @click="logout"
          >
            Logout
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isUserLoggedIn;
    }
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
      drawer: null,
      links: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="stylus"></style>
