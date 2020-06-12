<template>
  <v-container fluid no-gutters class="pa-0">
    <v-row no-gutters>
      <v-col cols="12" sm="8" md="12" xl="12">
        <v-parallax dark :src="imgSrc" :height="height">
          <v-card elevation="0" color="transparent">
            <v-container>
              <v-row class="ml-10 pl-15" justify="start">
                <v-col sm="4" xl="4" lg="4">
                  <h1
                    class=" display-1 text-left white--text font-weight-medium mb-4"
                  >
                    {{
                      getLang == "Romana"
                        ? "Incepe sa inveti acum!"
                        : "Start learning today!"
                    }}
                  </h1>
                  <h2
                    class=" subheading white--text font-weight-medium text-left mb-4"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt, atque?
                  </h2>

                  <Autocomplete />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-parallax>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-card style="background: #204165" text elevation="0">
          <v-container class="">
            <v-row
              color="transparent"
              align="center"
              no-gutters
              justify="center"
            >
              <v-col
                v-for="message in messages[getLang]"
                :key="message.title"
                :cols="12"
                sm="3"
              >
                <v-card
                  color="transparent"
                  elevation="0"
                  text
                  class="ma-0 pa-0"
                >
                  <v-card-text class="text-center pa-2">
                    <v-icon class="mb-1" size="30" color="white">
                      mdi-checkbox-marked-circle
                    </v-icon>
                    <p class="headline white--text ma-0">{{ message.title }}</p>
                    <p class="subheading white--text ma-0">
                      {{ message.desc }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Autocomplete from "../Navigation/Autocomplete";
export default {
  props: ["imgSrc", "height"],
  data() {
    return {
      messages: {
        English: [
          {
            icon: "",
            title: "500+ Bootcamps",
            desc: "Explore a variety of topics",
          },
          {
            icon: "",
            title: "Trusted Publishers",
            desc: "Over 200 Bootcamps rated 5+",
          },
          {
            icon: "",
            title: "Quality Courses",
            desc: "Over 5,000 satisfied students",
          },
        ],
        Romana: [
          {
            title: "500+ Programe in care te poti inscrie!",
            desc: "Explora o varietate de topicuri",
          },
          {
            title: "Autori de incredere",
            desc: "Peste 200 programe recenzii de peste 4 stele",
          },
          {
            title: "Cursuri de calitate",
            desc: "Peste 5,000 studenti satisfacuti",
          },
        ],
      },
    };
  },
  components: {
    Autocomplete,
  },
  computed: {
    getLang() {
      return this.$store.getters.getLang;
    },
  },
};
</script>

<style lang="stylus"></style>
