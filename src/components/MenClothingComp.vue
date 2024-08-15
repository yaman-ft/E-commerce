<template>
  <div class="container-fluid" style="background-color: black">
    <div class="row d-flex justify-content-center flex-wrap">
      <div
        class="card border-3 shadow col-xl-3 col-xxl-3 mx-3 col-sm-10 col-md-5 col-lg-5 rounded-3 p-1 mt-3"
        v-for="(menCloth, i) in MenClothings"
        :key="i"
        @click="showDetiels(menCloth.id)"
        style="background-color: black"
      >
        <div class="d-flex flex-column justify-content-between">
          <div class="card-image-top w-100 h-75 bg-white rounded-3">
            <img
              :src="menCloth.image"
              alt=""
              class="mx-auto d-block"
              width="170"
              height="170"
            />
          </div>
          <div
            class="card-body h-50 d-flex flex-column justify-content-between"
            style="background-color: black"
          >
            <div class="card-title my-4 text-white">
              {{ menCloth.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.fetchData();
  },
  name: "MenClothingComp",
  data() {
    return {
      MenClothings: [],
    };
  },
  methods: {
    async fetchData() {
      await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
          const middleList = json.filter(
            (item) => item.category == "men's clothing"
          );
          this.MenClothings = middleList;
        });
    },
    showDetiels(id) {
      this.$router.push({ name: "showproduct" });
      this.$store.state.CurrentProduct = id;
    },
  },
};
</script>
<style scoped>
.container-fluid {
  text-align: center;
}
.card {
  transition-duration: 1s;
}
.card:hover {
  cursor: pointer;
  translate: 10px 10px;
  border-color: #e6ca69;
}
</style>
