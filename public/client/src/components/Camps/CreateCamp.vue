<template>
  <v-container style="backgroundColor: #ececec;" fluid>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="8" lg="4" xl="5">
          <v-card outlined>
            <v-card-title class="linear-gradient">
              New Bootcamp
            </v-card-title>
            <v-card-text class="pa-7">
              <v-form ref="form" v-model="valid">
                <v-text-field
                  label="Name"
                  v-model="name"
                  name="name"
                  type="text"
                  :rules="[rules.required]"
                />

                <v-textarea
                  label="Description"
                  hint="Wirte a short description of the camp"
                  v-model="description"
                  :rules="[rules.required]"
                  auto-grow
                  rows="1"
                  counter="1000"
                ></v-textarea>

                <v-text-field
                  label="Email"
                  v-model="email"
                  name="email"
                  type="email"
                  :rules="[rules.required, rules.email]"
                />

                <v-text-field
                  label="Camp Website"
                  name="website"
                  type="text"
                  v-model="website"
                />

                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="startDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startDate"
                      label="Start Date"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :min="minDate"
                    v-model="startDate"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(startDate)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>

                <!-- :rules="[rules.website]" -->

                <v-text-field
                  label="Phone Number"
                  name="phone"
                  type="text"
                  v-model="phone"
                />

                <v-text-field
                  label="Address"
                  v-model="address"
                  name="address"
                  hint="Enter the address where the bootcamp will take place, leave blank if it's remote."
                  persistent-hint
                  type="text"
                />

                <v-select
                  v-model="category"
                  :items="getCategories"
                  label="Category"
                  :menu-props="{ maxHeight: '400' }"
                  hint="Select Category"
                  :rules="[rules.selected]"
                ></v-select>

                <v-select
                  v-if="this.category != null"
                  v-model="careers"
                  :items="getCareers"
                  :menu-props="{ maxHeight: '400' }"
                  label="Select Careers"
                  multiple
                  :rules="[rules.selected]"
                ></v-select>

                <v-checkbox
                  v-model="jobAssistance"
                  label="Job Assistance"
                  hint="Does the bootcamp offer assistance in getting a job?"
                  persistent-hint
                ></v-checkbox>

                <v-btn
                  :disabled="!valid"
                  class="mt-5"
                  color="primary"
                  @click="validate"
                  >Submit</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { CampsService } from "../../services/api";
import router from "../../router/index";
export default {
  computed: {
    getCategories() {
      const categories = this.categories.slice();

      return categories.map((el) => {
        return el.title;
      });
    },
    getCareers() {
      const careers = this.categories.slice();
      const careersArr = [];

      careers.map((el) => {
        if (el.title == this.category) {
          for (let key in el.items) {
            careersArr.push(key);
          }
        }
      });

      return careersArr;
    },
    minDate() {
      let date = new Date();
      date.setTime(date.getTime() + 1000 * 60 * 60 * 24);
      return date.toISOString().substr(0, 10);
    },
  },
  data() {
    return {
      categories: [
        {
          title: "Software Development",
          items: {
            "Mobile Development": "Mobile Development",
            "Web Development": "Web Development",
            "Desktop Applications": "Desktop Applications",
          },
        },
        {
          title: "Robotics & Mechatronics",
          items: {
            Robotics: "Robotics",
            Mechatronics: "Mechatronics",
            "Artificial Vision": "Artificial Vision",
            "Artificial Intelligence": "Artificial Intelligence",
            "Programmable Logic Controller": "Programmable Logic Controller",
          },
        },
        {
          title: "IT & Software",
          items: {
            "Networking & Security": "Networking & Security",
            "Operating Systems": "Operating Systems",
            Hardware: "Hardware",
          },
        },
        {
          title: "Design",
          items: {
            "Web Design": "Web Design",
            "Graphic Design": "Graphic Design",
          },
        },
      ],

      menu: false,
      modal: false,
      startDate: null,
      name: "",
      token: null,
      description: "",
      website: "",
      phone: "",
      email: "",
      address: "",
      category: null,
      careers: [],
      image: "",
      jobAssistance: false,
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        selected: (value) =>
          value.length > 0 || "Please select at least one relevant career",
      },
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        const campData = {
          name: this.name,
          description: this.description,
          website: this.website,
          phone: this.phone,
          startDate: this.startDate,
          email: this.email,
          address: this.address,
          careers: this.careers,
          jobAssistance: this.jobAssistance,
        };

        try {
          const { data } = (await CampsService.createCamp(campData)).data;
          router.push({ path: `/view/${data._id}` });
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  },
  beforeCreate() {
    const allowedRoles = ["publisher", "admin"];
    let user = localStorage.getItem("user");
    let currentUserRole = JSON.parse(user).role;

    console.log(currentUserRole);

    if (!allowedRoles.includes(currentUserRole)) {
      router.replace("/");
      console.log("Not allowed");
    }
  },
};
</script>

<style lang="css" scoped>
.linear-gradient {
  background: rgb(251, 63, 63) !important;
  background: linear-gradient(
    14deg,
    rgba(251, 63, 63, 1) 0%,
    rgba(70, 92, 252, 1) 100%
  ) !important;
}
</style>
