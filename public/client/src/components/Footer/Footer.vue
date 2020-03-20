<template>
  <v-container>
    <v-footer padless>
      <v-container style="background-color: white;" fluid>
        <v-row dense justify="center">
          <v-col cols="12" sm="4">
            <v-card class="pa-6 mb-9" flat outlined>
              <v-card-text class="text-center">
                <h2 class="headline mb-5">
                  Enter your email to receive our newsletter
                </h2>
                <v-form>
                  <v-text-field
                    outlined
                    label="Email"
                    name="email"
                    type="email"
                  />
                  <v-btn color="success">Send</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-divider class="ma-3"></v-divider>

        <v-row dense>
          <v-col
            v-for="(link, index) in links"
            :key="index"
            cols="12"
            lg="4"
            xl="3"
          >
            <p class="font-weight-light ma-0">{{ link }}</p>
          </v-col>
        </v-row>

        <v-divider class="ma-3"></v-divider>

        <v-row dense justify="center">
          <v-col cols="12" class="mt-auto">
            <v-card elevation="0">
              <v-card-title class="">
                <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                  <v-icon size="24px">{{ icon }}</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card elevation="0" dense>
              <p class="text-center">
                {{ new Date().getFullYear() }} —
                <strong>E-Learning Platform</strong>
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      links: [
        "Sitename for Business",
        "Teach on Sitename",
        "Get the app",
        "About us",
        "Careers",
        "Blog",
        "Help and support",
        "Affiliate program",
        "Terms",
        "Privacy policy and cookie policy",
        "Sitemap",
        "Featured camps",
        "Featured camps",
        "Featured camps",
        "Featured camps",
        "Featured camps"
      ],
      items: 4,
      icons: [
        "mdi-facebook",
        "mdi-twitter",
        "mdi-google-plus",
        "mdi-linkedin",
        "mdi-instagram"
      ]
    };
  }
};
</script>

<style lang="stylus"></style>
