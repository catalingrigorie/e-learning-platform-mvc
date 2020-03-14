<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xl="11">
        <v-card flat>
          <v-container fluid>
            <v-row dense justify="center">
              <v-col :cols="12" sm="4">
                <v-card class="pa-6" flat>
                  <v-card-text class="text-center">
                    <h2 class="headline">The best way to start developing</h2>
                    <span class="subheading">Lorem ipsum dolor sit amet.</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col v-for="card in cards" :key="card.title" :cols="12" sm="4">
                <v-card class="pa-2 mb-10" flat>
                  <v-card-text class="text-center pa-2">
                    <v-btn class="ma-2" text icon color="pink">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <h2 class="headline pa-2">{{ card.title }}</h2>
                    <span class="subheading">{{ card.subtitle }}</span>
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
export default {
  data() {
    return {
      cards: [
        {
          title: "Pre-fab homes",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        },
        {
          title: "Favorite road trips",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        },
        {
          title: "Best airlines",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        }
      ]
    };
  }
};
</script>

<style lang="stylus"></style>
