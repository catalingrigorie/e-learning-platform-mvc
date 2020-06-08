<template>
  <v-container
    style="background: linear-gradient(14deg, rgb(251, 63, 63) 0%, rgb(70, 92, 252) 100%);"
    fluid
  >
    <v-container>
      <v-row no-guters justify="center">
        <v-col cols="12" xl="11">
          <v-card color="transparent" flat>
            <v-container fluid>
              <h1 class="headline white--text">Top Categories</h1>

              <v-row color="transparent">
                <v-col
                  v-for="category in categories"
                  :key="category.title"
                  cols="12"
                  xl="3"
                  lg="4"
                  sm="6"
                >
                  <v-card
                    :to="{ name: 'Camps', params: { query: category.title } }"
                    hover
                  >
                    <v-card-text class="text-center pa-2">
                      <h2 class="headline pa-2">{{ category.title }}</h2>
                    </v-card-text>
                  </v-card>
                </v-col>
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
      categories: [
        {
          title: "Mechatronics",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!",
        },
        {
          title: "Robotics",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!",
        },
        {
          title: "Web Development",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!",
        },
        {
          title: "Mobile Development",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!",
        },
        {
          title: "Software Development",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!",
        },
        {
          title: "Networking",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!",
        },
        {
          title: "Digital Marketing",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!",
        },
        {
          title: "Artificial Intelligence",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!",
        },
      ],
    };
  },
};
</script>

<style lang="stylus"></style>
