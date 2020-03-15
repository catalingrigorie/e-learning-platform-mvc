<template>
  <div>
    <v-sheet v-if="courses.length == 0" class="text-center">
      <p class="title-1 pa-5">
        No courses found, if you are the publisher of this bootcamp create some.
      </p>
    </v-sheet>
    <v-card
      v-else
      v-for="(course, index) in courses"
      :key="index"
      outlined
      class="pa-5 ma-5"
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
              Duration: {{ course.duration }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Tuition: {{ course.tuition | currency }}
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
  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array
    }
  }
};
</script>

<style lang="css"></style>
