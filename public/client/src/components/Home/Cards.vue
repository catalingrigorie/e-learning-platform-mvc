<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xl="10" md="8">
        <v-card elevation="0" text>
          <v-card-title>
            {{
              getLang == "Romana"
                ? "Topicuri populare dupa categorie"
                : "Popular Bootcamps by category"
            }}
          </v-card-title>
          <v-tabs centered v-model="tab" background-color="white">
            <template v-for="item in items[getLang]">
              <v-tab
                v-for="(name, index) in item.tab"
                :key="index"
                @click="fetch(name)"
              >
                <span :key="item.tab + index">{{ index }}</span>
              </v-tab>
            </template>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              transition="-"
              reverse-transition="-"
              v-for="(item, index) in items[getLang]"
              :key="index + item.tab"
            >
              <v-sheet v-if="loading" style="height: 433px" class="text-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-sheet>
              <CampsGrid
                v-else
                :camps="camps"
                imgHeight="200"
                truncate="text-truncate"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CampsService } from "../../services/api";
import CampsGrid from "../../components/Camps/CampsGrid";

export default {
  data() {
    return {
      camps: null,
      tab: null,
      loading: false,
      items: {
        English: [
          {
            tab: {
              Mechatronics: "Mechatronics",
            },
          },
          {
            tab: {
              Robotics: "Robotics",
            },
          },
          {
            tab: {
              "Web Development": "Web Development",
            },
          },
          {
            tab: {
              "Mobile Development": "Mobile Development",
            },
          },
          {
            tab: {
              "Desktop Applications": "Desktop Applications",
            },
          },
          {
            tab: {
              "Artificial Intelligence": "Artificial Intelligence",
            },
          },
          {
            tab: {
              "Networking & Security": "Networking & Security",
            },
          },
          {
            tab: {
              "Artificial Vision": "Artificial Vision",
            },
          },
        ],
        Romana: [
          {
            tab: {
              Mecatrnoica: "Mechatronics",
            },
          },
          {
            tab: {
              Robotica: "Robotics",
            },
          },
          {
            tab: {
              "Programare Web": "Web Development",
            },
          },
          {
            tab: {
              "Aplicatii Mobile": "Mobile Development",
            },
          },
          {
            tab: {
              "Aplicatii Desktop": "Desktop Applications",
            },
          },
          {
            tab: {
              "Inteligenta Artificiala": "Artificial Intelligence",
            },
          },
          {
            tab: {
              "Retele si Securitate": "Networking",
            },
          },
          {
            tab: {
              "Vedere Artificiala": "Artificial Vision",
            },
          },
        ],
      },
    };
  },
  components: {
    CampsGrid,
  },

  methods: {
    async fetch(id) {
      let careerType = id;
      let query = "averageRating[gte]=4";
      this.loading = true;

      try {
        this.camps = (
          await CampsService.getTrendingCamps(query, careerType)
        ).data.results;
      } catch (error) {
        console.log(this.tab);
      } finally {
        this.loading = false;
      }
    },
  },

  computed: {
    getLang() {
      return this.$store.getters.getLang;
    },
  },

  async created() {
    let query = "averageRating[gte]=4";
    let careerType = "Mechatronics";

    try {
      this.camps = (
        await CampsService.getTrendingCamps(query, careerType)
      ).data.results;
    } catch (error) {
      console.log(this.tab);
    }
  },
};
</script>

<style lang="stylus"></style>
