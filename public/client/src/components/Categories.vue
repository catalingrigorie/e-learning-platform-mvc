<template>
  <v-container>
    <v-content>
      <v-card color="transparent" flat>
        <v-container fluid>
          <h1 class="headline white--text">Top Categories</h1>

          <v-row color="transparent">
            <v-col
              v-for="category in categories"
              :key="category.title"
              :cols="12"
              sm="3"
            >
              <v-card>
                <v-card-text class="text-center pa-2">
                  <h2 class="headline pa-2">{{ category.title }}</h2>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          title: "Robotics & Mechatronics",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        },
        {
          title: "Web Development",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        },
        {
          title: "Mobile Development",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        },
        {
          title: "Business",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        },
        {
          title: "IT & Software",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        },
        {
          title: "Marketing",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        },
        {
          title: "Lifestyle",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        },
        {
          title: "Photography",
          subtitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolorem impedit assumenda quos totam, voluptates laudantium sunt dolore voluptatibus repellendus porro nobis itaque eligendi nostrum!"
        }
      ]
    };
  }
};
</script>

<style lang="stylus"></style>
