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
        <h1 class="display-2 font-weight-bold mb-3">Jouer</h1>
        <a href="/create"> Créer une Game</a>
      </v-col>

      <v-col cols="12">
        <GameCard v-for="(game, i) in game_list" :key="i" :game="game" />
      </v-col>
    </v-row>

  <v-fab-transition>
    <v-btn href="/create" v-show="!hidden" color="pink" dark fixed outlined x-large bottom right fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-fab-transition>
  </v-container>
</template>

<script>
import GameCard from "../components/GameCard.vue";

export default {
  name: "Game",

  data: () => ({
    game_list: [],
  }),
  components: {
    GameCard,
  },
  methods: {
    getGames() {
      fetch(`http://localhost:7510/game/user/${localStorage.idUser}`).then(
        (res) => {
          res.json().then((games) => {
            this.game_list = games;
          });
        }
      );
    },
  },
  mounted() {
    this.game_list = this.getGames();
  },
};
</script>
