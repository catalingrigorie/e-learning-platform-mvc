<template>
  <v-card>
    <v-toolbar dark flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Panou de control</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-data-table
          :expanded.sync="expanded"
          :headers="headers"
          :items="bootcamps"
          sort-by="calories"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Bootcamps Panel</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Dessert name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Calories"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Fat (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Carbs (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Protein (g)"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { CampsService } from "../../services/api";
// import router from "../../router/index";
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Bootcamp",
        align: "start",
        sortable: false,
        value: "name",
        width: 100,
      },
      { text: "Added on", value: "createdAt" },
      { text: "Created By", value: "user.name" },
      { text: "Start Date", value: "startDate" },
      { text: "Enrolled Users", value: "enrolledUsers.length" },
      { text: "Courses", value: "courses.length" },
      { text: "Average Rating", value: "averageRating" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    dates: null,

    bootcamps: [],
    tab: null,
    items: [
      "Bootcamps",
      "Courses",
      "Reviews",
      "Messages",
      "NL Email List",
      "Users",
    ],
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }),

  // computed: {
  //   getDates() {
  //     const camps = this.bootcamps;
  //     return camps.map((el) => {
  //       return {
  //         name: el.name,
  //         createdAt: el.createdAt,
  //         user: el.user,
  //         enrolledUsers: el.enrolledUsers.length,
  //       };
  //     });
  //   },
  // },

  //   watch: {
  //     dialog(val) {
  //       val || this.close();
  //     },
  //   },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let camps = (await CampsService.getCamps()).data.results;

      let filtered = camps.map((el) => {
        return {
          _id: el._id,
          name: el.name,
          createdAt: new Date(el.createdAt).toISOString().substr(0, 10),
          user: el.user,
          courses: el.courses,
          enrolledUsers: el.enrolledUsers,
          startDate: new Date(el.startDate).toISOString().substr(0, 10),
          averageRating: el.averageRating,
        };
      });

      this.bootcamps = filtered;
    },

    // editItem(item) {
    //   router.push({ path: `/view/${item._id}` });
    // },

    // async fetch(item) {
    //   try {
    //     this.camps =
    //       item == "Bootcamps"
    //         ? (await CampsService.getCamps()).data.results
    //         : "";
    //   } catch (error) {
    //     console.log(this.tab);
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    deleteItem(item) {
      console.log(item._id);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="css" scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
