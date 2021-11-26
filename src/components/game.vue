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
        <h1 class="display-2 font-weight-bold mb-3">
          Play Game 
        </h1>
        <a> Create a Game</a>
      </v-col>

      <v-col cols="12">
			<GameCard v-for="(game, i) in game_list" :key="i" :game="game" />
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import GameCard from "./GameCard.vue";


  export default {
    name: 'Game',

    data: () => ({
      game_list: [

      ],
    }),
    components: {
        GameCard
    },
    methods: {
		getGames() {
            fetch('http://localhost:7510/game/user/tom').then((res) => {
                res.json().then((games) => {
                    this.game_list = games
                });
            })
		},
	},
	mounted() {
		this.game_list = this.getGames();
	},
  }
</script>
