<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn href="/" text>
        <span class="mr-2">Jouer</span>
        <v-icon>mdi-play-circle-outline</v-icon>
      </v-btn>
      <v-btn href="/welcome" text>
        <span class="mr-2">Connexion</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  mounted() {
    if (localStorage.idUser && localStorage.tokenUser) {
      //localStorage.idUser = 'tom';

      fetch(`http://localhost:7512/api/user/auth`, {
        method: "POST",
        body: JSON.stringify({ token: localStorage.tokenUser }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => {
        if (res.status === "400") {
          localStorage.idUser = null;
          localStorage.tokenUser = null;
          this.$router.push(`welcome`);
        }
      });
    } else {
      this.$router.push(`welcome`);
    }
  },
};
</script>