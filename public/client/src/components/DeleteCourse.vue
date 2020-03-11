<template>
  <v-dialog max-width="650" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn class="ma-1 pa-1" block color="primary" dark v-on="on">
        Delete Course
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Delete Course</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid">
            <v-row v-if="courses !== null">
              <v-col cols="12">
                <v-select
                  v-model="course"
                  :items="courses"
                  item-text="title"
                  item-value="_id"
                  :menu-props="{ maxHeight: '400' }"
                  label="Select Course"
                  hint="Select a course to delete"
                  persistent-hint
                  :rules="[rules.selected]"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn :disabled="!valid" color="blue darken-1" text @click="deteleCourse"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CoursesService } from "../services/api";
export default {
    data() {
        return {
            course: '',
            valid: true,
            dialog: false,
            rules: {
                selected: value => !!value || 'Please select a course to delete!'
            }
        }
    },
  methods: {
    async deteleCourse() {
      this.dialog = false;
      const courseId = this.course

      if (this.$refs.form.validate()) {
        try {
          await CoursesService.deleteCourse(courseId);
          this.$emit("deletedCourse");
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  props: {
      courses: {
          type: Array
      }
  }
};
</script>
