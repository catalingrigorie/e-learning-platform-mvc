<template>
  <v-container fluid>
    <v-container>
      <v-row>
        <v-col cols="12" xl="2"> </v-col>
        <v-col cols="12" xl="4">
          <h1 class="display-1 mb-5">Your Account</h1>
          <v-sheet v-if="loading" style="height: 433px" class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-sheet>
          <div v-else>
            <v-text-field
              readonly
              :value="this.user.name"
              outlined
              label="Name"
            ></v-text-field>
            <v-text-field
              disabled
              :value="this.user.role"
              outlined
              label="Role"
            ></v-text-field>
            <v-text-field
              readonly
              :value="this.user.email"
              outlined
              label="Email"
            ></v-text-field>
            <v-text-field
              :append-icon="'mdi-pencil'"
              :value="123456"
              readonly
              outlined
              type="password"
              label="Password"
              hint="Click on the right icon to change your password."
              persistent-hint
              @click:append="dialog = true"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog max-width="650" v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Change Password</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-text-field
                :rules="[rules.required]"
                outlined
                type="password"
                label="Current Password"
                v-model="currentPassword"
              ></v-text-field>
              <v-text-field
                :rules="[rules.required]"
                outlined
                type="password"
                label="New Password"
                v-model="newPassword"
              ></v-text-field>
              <v-alert v-if="error" type="error">
                {{ message }}
              </v-alert>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn
            :disabled="!valid"
            color="blue darken-1"
            text
            @click="changePassword"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { AuthenticationService } from "../../services/api";
export default {
  data() {
    return {
      user: null,
      valid: true,
      loading: true,
      error: false,
      message: null,
      dialog: false,
      currentPassword: null,
      newPassword: null,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    async changePassword() {
      if (this.$refs.form.validate()) {
        try {
          await AuthenticationService.changePassword({
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
          });
          this.closeDialog();
        } catch (error) {
          this.error = true;
          this.message = error.response.data.error;
        }
      }
    },
    closeDialog() {
      this.dialog = false;
      this.$refs.form.reset();
      this.error = false;
    },
  },
  async created() {
    try {
      this.user = (await AuthenticationService.getUser()).data.user;
      this.loading = false;
    } catch (error) {
      this.message = error.message;
    }
  },
};
</script>
