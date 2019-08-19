"use strict";

Vue.component("ra-tab", {
  data() {
    return {
      expMultis: [0, 0, 0, 0],
    };
  },
  methods: {
    update() {
      this.unlocks = player.celestials.ra.unlocks;
      this.expMultis = this.pets.map(obj => obj.pet.expBoost);
    },
    startRun() {
      Ra.startRun();
    },
    toggleMode() {
      Ra.toggleMode();
    }
  },
  computed: {
    laitelaUnlock: () => RA_LAITELA_UNLOCK,
    pets: () => [
      {
        pet: Ra.pets.teresa,
        scalingUpgradeText: level => `You can charge ${Math.clampMax(Math.floor(level / 2), 12)} Infinity Upgrades.`,
      },
      {
        pet: Ra.pets.effarig,
        scalingUpgradeText: level => `Glyph rarity +${level}% and +${Math.floor(level / 5)} additional choices.`,
      },
      {
        pet: Ra.pets.enslaved,
        scalingUpgradeText: level => `Stored game time ^${(1 + 0.01 * Math.floor(level)).toFixed(2)}, ` +
          `stored real time efficiency +${level}% and +${level / 2} hours maximum.`,
      },
      {
        pet: Ra.pets.v,
        scalingUpgradeText: level => `+${Math.floor(level)} free achievements.`,
      }
    ]
  },
  template:
    `<div class="l-ra-celestial-tab">
      <div class="l-ra-all-pets-container">
        <ra-pet v-for="(pet, i) in pets" :key="i" :petConfig="pet" />
      </div>
      <div class="l-ra-non-pets">
        <button @click="startRun" class="l-ra-reality-container">
          <div class="l-ra-reality-inner">
            <h1> Start Ra's Reality</h1>
            <p> Rules: you can't dimension boost and tick reduction is forced to be 11%. </p>
            <br>
            <br>
            <h2> Rewards: </h2>
            <div class="c-ra-rewards">
              <span class="c-ra-rewards-inner"> Teresa: {{formatX(expMultis[0], 2, 2)}} </span>
              <span class="c-ra-rewards-inner"> Effarig: {{formatX(expMultis[1], 2, 2)}} </span>
            </div>
            <div class="c-ra-rewards">
              <span class="c-ra-rewards-inner"> Enslaved: {{formatX(expMultis[2], 2, 2)}} </span>
              <span class="c-ra-rewards-inner"> V: {{formatX(expMultis[3], 2, 2)}} </span>
            </div>
          </div>
        </button>
        <button class="l-ra-laitela-unlock">
          <div class="l-ra-laitela-unlock-inner">
            <h1> Lai'tela: </h1>
            <h2> The Celestial of Matter </h2>
            <p> Unlocked getting all four celestials to level 20 </p>
          </div>
        </button>
      </div>
    </div>`
});