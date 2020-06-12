<template>
  <v-container class style="background-color: #204165 " fluid>
    <v-container>
      <v-row no-guters justify="center" align="center">
        <v-col cols="12" xl="11">
          <v-card elevation="0" color="transparent" text>
            <v-container fluid>
              <h1 class="headline white--text">
                {{
                  getLang == "Romana"
                    ? "Navigare dupa categorie"
                    : "Browse Categories"
                }}
              </h1>

              <v-row align="center" color="transparent">
                <template v-for="category in categories[getLang]">
                  <v-col
                    v-for="(subCat, index) in category.items"
                    :key="subCat"
                    cols="12"
                    xl="3"
                    lg="4"
                    sm="6"
                  >
                    <v-card
                      :to="{ name: 'Camps', params: { query: subCat } }"
                      hover
                      :key="index"
                      width="300"
                    >
                      <v-card-text class="text-center pa-2">
                        <h2 class="headline pa-2">{{ index }}</h2>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </template>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      categories: {
        English: [
          {
            items: {
              "Mobile Development": "Mobile Development",
              "Web Development": "Web Development",
              "Desktop Applications": "Desktop Applications",
            },
          },
          {
            items: {
              Robotics: "Robotics",
              Mechatronics: "Mechatronics",
              "Artificial Vision": "Artificial Vision",
              "Artificial Intelligence": "Artificial Intelligence",
              PLC: "Programmable Logic Controller",
            },
          },
        ],
        Romana: [
          {
            items: {
              "Aplicatii Mobile": "Mobile Development",
              "Programare Web": "Web Development",
              "Aplicatii Desktop": "Desktop Applications",
            },
          },
          {
            items: {
              Robotica: "Robotics",
              Mecatronica: "Mechatronics",
              "Vedere Artificiala": "Artificial Vision",
              "Inteligenta Artificiala": "Artificial Intelligence",
              "Automate Programabile": "Programmable Logic Controller",
            },
          },
        ],
      },
    };
  },
  computed: {
    getLang() {
      return this.$store.getters.getLang;
    },
  },
};
</script>

<style lang="stylus"></style>
