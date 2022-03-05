<script>
import ArmageddonButton from "./ArmageddonButton";
import PelleUpgradeVue from "./PelleUpgrade";

export default {
  name: "PelleUpgradePanel",
  components: {
    ArmageddonButton,
    PelleUpgradeVue,
  },
  data() {
    return {
      remnants: 0,
      realityShards: new Decimal(0),
      shardRate: new Decimal(0),
      showBought: false,
      isHovering: false,
      isCollapsed: false,
    };
  },
  computed: {
    collapseIcon() {
      return this.isCollapsed
        ? "fas fa-expand-arrows-alt"
        : "fas fa-compress-arrows-alt";
    },
    rebuyables: () => PelleRebuyableUpgrade.all,
    upgrades() { return PelleUpgrade.all.filter(u => !u.isBought); },
    boughtUpgrades() { return PelleUpgrade.all.filter(u => u.isBought); },
    visibleUpgrades() { return this.upgrades.slice(0, 5); },
    fadedUpgrades() { return this.upgrades.slice(5, 10); },
    allUpgrades() {
      let upgrades = [];
      if (this.showBought) upgrades = this.boughtUpgrades;
      upgrades = upgrades.concat(this.visibleUpgrades);
      return upgrades;
    },
  },
  methods: {
    update() {
      this.remnants = Pelle.cel.remnants;
      this.realityShards.copyFrom(Pelle.cel.realityShards);
      this.shardRate.copyFrom(Pelle.realityShardGainPerSecond);
      this.showBought = Pelle.cel.showBought;
      this.isCollapsed = player.celestials.pelle.collapsed.upgrades;
    },
    toggleBought() {
      Pelle.cel.showBought = !Pelle.cel.showBought;
      this.$recompute("upgrades");
    },
    toggleCollapse() {
      player.celestials.pelle.collapsed.upgrades = !this.isCollapsed;
    }
  }
};
</script>

<template>
  <div class="l-pelle-panel-container">
    <div class="c-pelle-panel-title">
      <i
        :class="collapseIcon"
        @click="toggleCollapse"
      />
      Pelle Upgrades
    </div>
    <div
      v-if="!isCollapsed"
      class="l-pelle-content-container"
    >
      <br>
      <div>
        You have <span class="c-remnants-amount">{{ format(remnants, 2) }}</span> Remnants.
      </div>
      <div>
        You have <span class="c-remnants-amount">{{ format(realityShards, 2) }}</span> Reality Shards.
        <span class="c-remnants-amount">+{{ format(shardRate, 2, 2) }}/s</span>
      </div>
      <div
        class="c-armageddon-container"
        @mouseover="isHovering = true"
        @mouseleave="isHovering = false"
      >
        <ArmageddonButton />
      </div>
      <div class="c-pelle-upgrade-container">
        <PelleUpgradeVue
          v-for="upgrade in rebuyables"
          :key="upgrade.config.id"
          :upgrade="upgrade"
          :show-improved-estimate="isHovering"
        />
      </div>
      <button
        class="o-pelle-button"
        @click="toggleBought"
      >
        {{ showBought ? "Showing bought upgrades" : "Bought upgrades hidden" }}
      </button>
      <div
        v-if="allUpgrades.length"
        class="c-pelle-upgrade-container"
      >
        <PelleUpgradeVue
          v-for="upgrade in allUpgrades"
          :key="upgrade.config.id"
          :upgrade="upgrade"
          :show-improved-estimate="isHovering"
        />
        <PelleUpgradeVue
          v-for="upgrade in fadedUpgrades"
          :key="upgrade.config.id"
          :upgrade="upgrade"
          faded
        />
      </div>
      <div v-else>
        No upgrades to show!
      </div>
    </div>
  </div>
</template>

<style scoped>
  .c-pelle-panel-title {
    font-weight: bold;
    font-size: 3rem;
    color: var(--color-pelle--base);
  }

  .l-pelle-panel-container {
    padding: 1rem;
    margin: 1rem;
    border: 2px solid var(--color-pelle--base);
    border-radius: 5px;
    user-select: none;
  }

  .l-pelle-content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .o-pelle-button {
    background: black;
    color: white;
    border: 1px solid var(--color-pelle--base);
    border-radius: 5px;
    padding: 1rem;
    font-family: Typewriter;
    margin: 0 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    transition-duration: 0.12s;
  }

  .o-pelle-button:hover {
    box-shadow: 1px 1px 3px var(--color-pelle--base);
  }

  .c-remnants-amount {
    font-weight: bold;
    font-size: 2rem;
    color: var(--color-pelle--base);
  }

  .c-pelle-upgrade-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .c-armageddon-container {
    width: 32rem;
    margin: 2rem 2rem 5rem;
  }
</style>