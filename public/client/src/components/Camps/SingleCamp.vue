<template>
  <v-container style="background-color: rgb(236, 236, 236)" fluid>
    <Map
      v-if="this.camp !== '' && this.camp.location.coordinates"
      :lat="Number(this.camp.location.coordinates[1])"
      :lng="Number(this.camp.location.coordinates[0])"
    />
    <div v-if="snackbar" class="text-center">
      <v-btn dark color="orange darken-2"> </v-btn>

      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn color="blue" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="9">
          <v-card class="pa-5" flat elevation="0">
            <v-card-title class="display-2">{{ camp.name }} </v-card-title>
            <v-rating
              class="pl-2"
              readonly
              length="5"
              v-model="camp.averageRating"
            ></v-rating>
            <v-card-text class="headline">
              <p class="body-1 mb-5" style="white-space: pre-line;">
                {{ camp.description }}
              </p>

              <v-tabs>
                <v-tab>
                  Camp
                </v-tab>
                <v-tab-item>
                  <v-card v-if="this.camp !== ''" outlined flat elevation="0">
                    <v-card-text>
                      <v-list dense>
                        <v-divider></v-divider>

                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Publisher
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <span class="body-1">
                              {{ camp.user.name }}
                            </span>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              E-Mail Address
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <span class="body-1">
                              {{ camp.email }}
                            </span>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider
                          v-if="camp.location != undefined"
                        ></v-divider>

                        <v-list-item v-if="camp.location != undefined">
                          <v-list-item-content>
                            <v-list-item-title>
                              Location
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <span class="body-1">
                              {{ camp.location.formattedAddress }}
                            </span>
                          </v-list-item-action>
                        </v-list-item>

                        <v-divider></v-divider>

                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Start Date
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <span class="body-1">
                              {{ getStartDate }}
                            </span>
                          </v-list-item-action>
                        </v-list-item>

                        <v-divider></v-divider>

                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Job Assistance
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn v-if="camp.jobAssistance" icon color="green">
                              <v-icon>
                                mdi-checkbox-marked-circle
                              </v-icon>
                            </v-btn>
                            <v-btn v-else icon color="red">
                              <v-icon>
                                mdi-close-circle
                              </v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider></v-divider>

                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Job Guarantee
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn v-if="camp.jobGuarantee" icon color="green">
                              <v-icon>
                                mdi-checkbox-marked-circle
                              </v-icon>
                            </v-btn>
                            <v-btn v-else icon color="red">
                              <v-icon>
                                mdi-close-circle
                              </v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider></v-divider>

                        <v-list-item v-if="camp.averageRating">
                          <v-list-item-content>
                            <v-list-item-title>
                              Average Rating
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action
                            v-if="camp.averageRating"
                            class="bdoy-1"
                          >
                            <p color="green" class="title ma-0">
                              {{ camp.averageRating }}
                            </p>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider v-if="camp.averageRating"></v-divider>
                        <v-list-item v-if="camp.averageCost">
                          <v-list-item-content>
                            <v-list-item-title>
                              Average Cost
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action
                            v-if="camp.averageCost"
                            class="bdoy-1"
                          >
                            <p color="green" class="title ma-0">
                              {{ camp.averageCost | currency }}
                            </p>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider v-if="camp.averageCost"></v-divider>
                      </v-list>
                    </v-card-text>
                    <v-row align="center" justify="end"> </v-row>
                    <v-card-actions class="pa-5">
                      <v-btn outlined color="primary" text>Visit Website</v-btn>
                      <v-btn
                        outlined
                        color="primary"
                        @click="sendMail"
                        v-if="isAuthenticated && signed == false"
                        :loading="sendingMail"
                        >Sing up</v-btn
                      >
                      <span v-else-if="isAuthenticated == false" class="ml-5">
                        Login or register to enroll in this bootcamp
                      </span>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                <v-tab>
                  Courses
                </v-tab>
                <v-tab-item>
                  <Course :courses="courses" />
                </v-tab-item>
                <v-tab>
                  Reviews
                </v-tab>
                <v-tab-item>
                  <Reviews @updatedStats="updatedStats" />
                </v-tab-item>
              </v-tabs>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          v-cloak
          cols="12"
          lg="2"
          v-if="checkOwnership == true && this.camp !== ''"
        >
          <v-card outlined elevation="0">
            <v-card-title>
              Camp Dashboard
            </v-card-title>
            <v-card-text>
              <CreateCourse @newCourse="updatedStats" />
              <DeleteCourse
                :courses="getCourse"
                @deletedCourse="updatedStats"
              />
              <EditCamp :camp="camp" @editedCamp="updatedStats" />
              <DeleteCamp @deletedCamp="updatedStats" />
              <UploadImage />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { CampsService } from "../../services/api";
import Reviews from "./Reviews";
import CreateCourse from "./CreateCourse";
import EditCamp from "./EditCamp";
import DeleteCourse from "./DeleteCourse";
import Course from "./Course";
import DeleteCamp from "./DeleteCamp";
import UploadImage from "./UploadImage";
import Map from "./Map";

export default {
  data() {
    return {
      camp: "",
      courses: null,
      sendingMail: false,
      signed: false,
      user: "",
      snackbar: false,
      text: "Success! Check your email address for more information.",
      timeout: 4000,
      items: [
        "Job Assistance",
        "Job Guarantee",
        "Average Cost",
        "Average Rating",
      ],
      overlay: false,
    };
  },
  components: {
    Reviews,
    CreateCourse,
    EditCamp,
    DeleteCourse,
    DeleteCamp,
    Course,
    UploadImage,
    Map,
  },
  computed: {
    checkOwnership() {
      const user = localStorage.getItem("user");
      if (!user) return null;
      const userId = JSON.parse(user)._id;
      return userId == this.user._id;
    },
    isAuthenticated() {
      return this.$store.getters.isUserLoggedIn;
    },
    getCourse() {
      let courses = this.courses;
      const coursesArr = courses.map((el) => {
        return { title: el.title, _id: el._id };
      });
      return coursesArr;
    },
    getStartDate() {
      const startDate = new Date(this.camp.startDate);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      return startDate.toLocaleDateString(undefined, options);
    },
  },
  methods: {
    async updatedStats() {
      let id = this.$route.params.id;

      try {
        const { data } = (await CampsService.getCamp(id)).data;
        this.camp = data;
        this.courses = data.courses;
      } catch (error) {
        console.log(error);
      }
    },
    async sendMail() {
      this.sendingMail = true;
      let id = this.$route.params.id;
      const user = localStorage.getItem("user");
      const userEmail = JSON.parse(user).email;
      try {
        await CampsService.sendMail(id, {
          email: userEmail,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.sendingMail = false;
        this.snackbar = true;
        this.signed = true;
      }
    },
  },
  async created() {
    let id = this.$route.params.id;

    try {
      const { data } = (await CampsService.getCamp(id)).data;
      this.camp = data;
      this.courses = data.courses;
      this.user = data.user;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="css" scoped>
.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 100%;
}
</style>
