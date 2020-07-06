<template>
  <v-card>
    <v-toolbar dark flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Panou de control</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-sheet v-if="bootcamps == null" class="height text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-sheet>
    <v-tabs-items v-else v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-data-table
          v-if="item == 'Bootcamps'"
          :headers="headers"
          :items="bootcamps"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>{{ item }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <EditCamp :camp="item" />
            <DeleteCamp :campId="item._id" />
            <DeleteCourse :courses="item.courses" />
          </template>
        </v-data-table>
        <v-data-table
          v-if="item == 'Courses'"
          :headers="coursesHeaders"
          :items="courses"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>{{ item }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <DeleteCourse :courses="item" />
          </template>
        </v-data-table>
        <v-data-table
          v-if="item == 'Reviews'"
          :headers="reviewsHeaders"
          :items="reviews"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>{{ item }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn color="primary" flat @click="deleteReview(item)"
              >Delete</v-btn
            >
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import {
  CampsService,
  CoursesService,
  ReviewsService,
} from "../../services/api";
import EditCamp from "../Camps/EditCamp";
import DeleteCamp from "../Camps/DeleteCamp";
import DeleteCourse from "../Camps/DeleteCourse";

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
      { text: "Actions", value: "actions", sortable: false, width: 100 },
    ],
    coursesHeaders: [
      {
        text: "Courses",
        align: "start",
        sortable: false,
        value: "title",
        width: 100,
      },
      { text: "Added on", value: "createdAt" },
      { text: "Created By", value: "user.name" },
      { text: "Pdf", value: "pdf" },
      { text: "Bootcamp", value: "bootcamp.name" },
      { text: "Actions", value: "actions", sortable: false, width: 100 },
    ],
    reviewsHeaders: [
      {
        text: "Reviews",
        align: "start",
        sortable: false,
        value: "title",
        width: 100,
      },
      { text: "Added on", value: "createdAt" },
      { text: "Bootcamp", value: "bootcamp.name" },
      { text: "Created By", value: "user.name" },
      { text: "Title", value: "title" },
      { text: "Rating", value: "rating" },
      { text: "Text", value: "text" },
      { text: "Actions", value: "actions", sortable: false, width: 100 },
    ],
    dates: null,

    bootcamps: null,
    courses: null,
    reviews: null,
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

  computed: {
    // getDates() {
    //   const camps = this.bootcamps;
    //   return camps.map((el) => {
    //     return {
    //       name: el.name,
    //       createdAt: el.createdAt,
    //       user: el.user,
    //       enrolledUsers: el.enrolledUsers.length,
    //     };
    //   });
    // },
  },

  created() {
    this.initialize();
  },
  components: {
    EditCamp,
    DeleteCamp,
    DeleteCourse,
  },

  methods: {
    async initialize() {
      let camps = (await CampsService.getCamps()).data.results;
      let courses = (await CoursesService.getCourses()).data.results;
      let reviews = (await ReviewsService.getReviews()).data.results;

      let coursesArr = courses.map((el) => {
        return {
          _id: el._id,
          title: el.title,
          createdAt: new Date(el.createdAt).toISOString().substring(0, 10),
          user: el.user,
          bootcamp: el.camp,
          pdf: el.pdf,
        };
      });

      let reviewsArr = reviews.map((el) => {
        return {
          _id: el._id,
          rating: el.rating,
          title: el.title,
          user: el.user,
          bootcamp: el.camp,
          text: el.text,
          createdAt: new Date(el.createdAt).toISOString().substring(0, 10),
        };
      });

      let campsArr = camps.map((el) => {
        return {
          _id: el._id,
          name: el.name,
          createdAt: new Date(el.createdAt).toISOString().substr(0, 10),
          user: el.user,
          courses: el.courses,
          enrolledUsers: el.enrolledUsers,
          startDate: new Date(el.startDate).toISOString().substr(0, 10),
          averageRating: el.averageRating,
          email: el.email,
          phone: el.phone,
          description: el.description,
          careers: el.careers,
          jobAssistance: el.jobAssistance,
          website: el.website,
        };
      });

      this.bootcamps = campsArr;
      this.courses = coursesArr;
      this.reviews = reviewsArr;
    },

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
.height {
  height: 500px;
}
</style>
