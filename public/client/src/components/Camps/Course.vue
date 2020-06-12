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
              Duration
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            {{ course.duration }}
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item v-if="course.tuition != null">
          <v-list-item-content>
            <v-list-item-title>
              Tuition
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            {{ course.tuition | currency }}
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="course.tuition != null"></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Difficulty
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            {{ course.difficulty }}
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              PDF Document
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <a
              target="_blank"
              :href="`http://localhost:5000/documents/${course.pdf}`"
              >{{ course.pdf }}</a
            >
          </v-list-item-action>
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
              <v-icon>
                {{
                  course.availableJob
                    ? "mdi-checkbox-marked-circle"
                    : "mdi-close-circle"
                }}
              </v-icon>
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
      type: Array,
    },
  },
};
</script>

<style lang="css"></style>
