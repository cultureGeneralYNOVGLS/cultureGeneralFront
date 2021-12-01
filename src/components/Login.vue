<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12"> </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Connexion</h1>
      </v-col>

      <v-col cols="12">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider v-slot="{ errors }" name="email">
              <v-text-field
                v-model="email"
                type="email"
                :error-messages="errors"
                label="Email"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="password">
              <v-text-field
                v-model="password"
                type="password"
                :error-messages="errors"
                label="Password"
                required
              ></v-text-field>
            </validation-provider>

            <v-btn class="mr-4" type="submit" :disabled="invalid">
              submit
            </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: "",
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
      this.sendLogin();
    },
    clear() {
      this.email = "";
      this.password = "";
      this.$refs.observer.reset();
    },
    sendLogin() {
      let user = {
        email: this.email,
        password: this.password,
      };

      fetch(`http://localhost:3001/api/user/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => {
        res.json().then((game) => {
          localStorage.idUser = game._id;
          localStorage.tokenUser = game.token;
          this.$router.push(`/`)
        });
      });
    },
  },
  mounted() {},
};
</script>