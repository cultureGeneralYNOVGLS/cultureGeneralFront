<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/128_16.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Create a Game</h1>
        <a href="/">Return</a>
      </v-col>

      <v-col cols="12">
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:10"
            >
              <v-text-field
                v-model="name"
                :counter="10"
                :error-messages="errors"
                label="Nom de la partie"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="difficulty"
              rules="required"
            >
              <v-select
                v-model="difficulty"
                :items="difficulties"
                :error-messages="errors"
                label="Difficulty"
                data-vv-name="difficulty"
                required
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="numberQuestions"
              rules="required"
            >
              <v-select
                v-model="numberQuestions"
                :items="nbQuestions"
                :error-messages="errors"
                label="Nombre de questions"
                data-vv-name="numberQuestions"
                required
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="categorie"
              rules="required"
            >
              <v-select
                v-model="select"
                :items="categories"
                item-text="name"
                item-value="_id"
                :error-messages="errors"
                label="Categorie"
                data-vv-name="categorie"
                required
              ></v-select>
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
    name: "",
    difficulty: 1,
    numberQuestions: 2,
    select: null,
    categories: [],
    nbQuestions: Array.from({ length: 9 }, (_, i) => i + 2),
    difficulties: Array.from({ length: 2 }, (_, i) => i + 1),
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
      this.sendGame();
    },
    clear() {
      this.name = "";
      this.difficulty = 1;
      this.numberQuestions = 2;
      this.select = null;
      this.$refs.observer.reset();
    },
    getCategories() {
      fetch("http://localhost:3000/category/", {
        headers: {
          Authorization: `Bearer ${localStorage.tokenUser}`,
        },
      }).then((res) => {
        console.log(res.status, 'sqqsqs');
        if (res.status === 401) {
          this.$router.push(`/authentification`);
        } else {
          res.json().then((games) => {
            this.categories = games;
          });
        }
      });
    },
    sendGame() {
      let body = {
        name: this.name,
        difficulty: this.difficulty,
        numberQuestions: this.numberQuestions,
        idCategory: this.select,
        idUser: localStorage.idUser,
      };

      fetch(`http://localhost:3000/game`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.tokenUser}`,
        },
      }).then((res) => {
        if (res.status === 401) {
          this.$router.push(`/authentification`);
        } else {
          res.json().then((game) => {
            this.$router.push(`game/${game._id}`);
          });
        }
      });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>