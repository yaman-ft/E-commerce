<template>
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
