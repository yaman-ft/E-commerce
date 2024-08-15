<template>
  <div class="w-100 h-100" style="background-color: black">
    <Transition>
      <ElectronicsComp
        v-if="this.$store.state.CurrentCategory == 'elec'"
      ></ElectronicsComp>
      <JawelryComp
        v-else-if="this.$store.state.CurrentCategory == 'jewel'"
      ></JawelryComp>
      <MenClothingComp
        v-else-if="this.$store.state.CurrentCategory == 'men'"
      ></MenClothingComp>
      <WomenClothingComp v-else></WomenClothingComp>
    </Transition>
  </div>
</template>
<script>
import ElectronicsComp from "@/components/ElectronicsComp.vue";
import JawelryComp from "@/components/JawelryComp.vue";
import MenClothingComp from "@/components/MenClothingComp.vue";
import WomenClothingComp from "@/components/WomenClothingComp.vue";

export default {
  components: {
    ElectronicsComp,
    JawelryComp,
    MenClothingComp,
    WomenClothingComp,
  },
  name: "CategoriesView",
};
</script>
<style scoped>
.v-leave-active {
  animation: aniTwo 0.5s;
}
.v-enter-active {
  animation: aniOne 1.5s;
}
@keyframes aniOne {
  from {
    translate: 100% 0%;
  }
  to {
    translate: 0% 0%;
  }
}
@keyframes aniTwo {
  from {
    translate: 0% 0%;
  }
  to {
    translate: -100% 0%;
  }
}
</style>
