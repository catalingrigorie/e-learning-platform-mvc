<template>
  <v-container style="background-color: rgb(236, 236, 236)" fluid>
    <v-container>
      <v-row>
        <v-col cols="8">
          <v-card class="pa-5" flat elevation="0">
            <v-card-title class="display-2">{{ camp.name }} </v-card-title>
            <v-rating
              class="pl-2"
              readonly
              length="5"
              v-model="camp.averageRating"
            ></v-rating>
            <v-card-text class="headline">
              <p class="headinline mb-5">
                {{ camp.description }}
              </p>

              <Course @newCourse="updatedStats" />
              <v-card elevation="0">
                <v-card-title>
                  Courses in this camp
                </v-card-title>
              </v-card>
              <v-card
                elevation=""
                outlined
                class="pa-5 ma-5"
                v-for="(course, index) in courses"
                :key="index"
              >
                <v-card-title>{{ course.title }}</v-card-title>
                <v-card-text>
                  <p class="title">
                    {{ course.description }}
                  </p>
                </v-card-text>
                <v-list>
                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Duration: {{ course.duration }} weeks
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Tuition: ${{ course.tuition }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Course Difficulty: {{ course.difficulty }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        Available Job
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon :color="course.availableJob ? 'green' : ''">
                        <v-icon> mdi-checkbox-marked-circle</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider></v-divider>
                </v-list>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-card outlined width="100%" elevation="1">
                <!-- <v-img
                  class="white--text align-end"
                  height="250px"
                  :src="`http://localhost:5000/images/${camp.image}`"
                /> -->
                <v-card-title class="heading">
                  <p class="text-center">Camp Info</p>
                </v-card-title>

                <v-card-text>
                  <v-list dense>
                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          Housing
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon :color="camp.housing ? 'green' : ''">
                          <v-icon> mdi-checkbox-marked-circle</v-icon>
                        </v-btn>
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
                        <v-btn icon :color="camp.jobAssistance ? 'green' : ''">
                          <v-icon> mdi-checkbox-marked-circle</v-icon>
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
                        <v-btn icon :color="camp.jobGuarantee ? 'green' : ''">
                          <v-icon> mdi-checkbox-marked-circle</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          Average Rating
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action class="bdoy-1">
                        <p color="green" class="title ma-0">
                          {{ camp.averageRating }}
                        </p>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          Average Cost
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action class="bdoy-1">
                        <p color="green" class="title ma-0">
                          ${{ camp.averageCost }}
                        </p>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                  </v-list>
                </v-card-text>
                <v-row align="center" justify="end"> </v-row>
                <v-card-actions class="pa-5">
                  <v-btn outlined color="primary" text>Visit Website</v-btn>
                  <v-btn outlined color="primary" text>Sing up</v-btn>
                </v-card-actions>
              </v-card>
              <Reviews @updatedStats="updatedStats" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { CampsService } from "../services/api";
import Reviews from "./Reviews";
import Course from "../components/Course";

export default {
  data() {
    return {
      camp: [],
      courses: "",
      reviews: "",
      items: [
        "Housing",
        "Job Assistance",
        "Job Guarantee",
        "Average Cost",
        "Average Rating"
      ],
      overlay: false
    };
  },
  components: {
    Reviews,
    Course
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
    }
  },
  async created() {
    let id = this.$route.params.id;

    try {
      const { data } = (await CampsService.getCamp(id)).data;
      this.camp = data;
      this.courses = data.courses;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style lang="css"></style>
