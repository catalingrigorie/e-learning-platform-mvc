<template>
  <v-card-actions>
    <v-dialog max-width="600" v-model="overlay">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">
          Create Course
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Create Course</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Title"
                  v-model="title"
                  name="title"
                  type="text"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Duration"
                  v-model="duration"
                  name="duration"
                  type="text"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  hint="Wirte a short description of the course"
                  v-model="description"
                  :rules="[rules.required]"
                  auto-grow
                  rows="1"
                  counter="250"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Tuition"
                  name="tuition"
                  type="text"
                  v-model="tuition"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Beginner', 'Intermediate', 'Advanced']"
                  label="Difficulty"
                  v-model="difficulty"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="availableJob"
                  label="Avaliable Job"
                  hint="Is there a job opening for this related course ?"
                  value
                  persistent-hint
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="newCourse">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-actions>
</template>

<script>
import { CoursesService } from "../services/api";
export default {
  data() {
    return {
      overlay: false,
      valid: false,
      title: "",
      description: "",
      difficulty: "",
      tuition: "",
      availableJob: "",
      duration: "",
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    async newCourse() {
      this.overlay = false;
      let id = this.$route.params.id;
      let courseData = {
        title: this.title,
        description: this.description,
        difficulty: this.difficulty,
        tuition: this.tuition,
        availableJob: this.availableJob,
        duration: this.duration
      };

      try {
        await CoursesService.createCourse(id, courseData);
        this.$emit("newCourse");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
