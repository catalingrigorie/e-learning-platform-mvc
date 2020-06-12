<template>
  <v-dialog max-width="600" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn class="ma-1 pa-1" block color="primary" dark v-on="on">
        Create Course
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Create Course</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
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
                <v-select
                  label="Duration"
                  v-model="duration"
                  type="text"
                  :rules="[rules.required]"
                  :items="['1 week or less', '2 weeks', '3 weeks or more']"
                ></v-select>
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
                  :rules="[rules.number]"
                />
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="pdf"
                  show-size
                  label="PDF Document"
                  prepend-icon=""
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Beginner', 'Intermediate', 'Advanced']"
                  label="Difficulty"
                  v-model="difficulty"
                  :rules="[rules.required]"
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
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn :disabled="!valid" color="blue darken-1" text @click="newCourse"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CoursesService } from "../../services/api";
export default {
  data() {
    return {
      dialog: false,
      valid: false,
      title: "",
      description: "",
      difficulty: "",
      tuition: "",
      pdf: null,
      availableJob: false,
      duration: "",
      rules: {
        required: (value) => !!value || "Required.",
        number: (value) => {
          let RegExp = /^[0-9]*$/;
          return RegExp.test(value) || "Only numbers allowed";
        },
      },
    };
  },
  methods: {
    async newCourse() {
      this.dialog = false;
      if (this.$refs.form.validate()) {
        let id = this.$route.params.id;
        const fromData = new FormData();

        fromData.append("pdf", this.pdf);
        fromData.append("title", this.title);
        fromData.append("description", this.description);
        fromData.append("difficulty", this.difficulty);
        fromData.append("tuition", this.tuition);
        fromData.append("availableJob", this.availableJob);
        fromData.append("duration", this.duration);

        try {
          await CoursesService.createCourse(id, fromData);
          this.$emit("newCourse");
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>
