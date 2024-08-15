<template>
  <div class="container-fluid" style="background-color: black">
    <div class="row d-flex justify-content-center flex-wrap">
      <div
        class="card border-3 shadow col-xl-3 col-xxl-3 mx-3 col-sm-10 col-md-5 col-lg-5 rounded-4 p-1 mt-3"
        v-for="(womenCloth, i) in WomensClothings"
        :key="i"
        @click="showDetiels(womenCloth.id)"
        style="background-color: black"
      >
        <div class="d-flex flex-column justify-content-between">
          <div class="card-image-top w-100 h-75 bg-white rounded-3">
            <img
              :src="womenCloth.image"
              alt=""
              class="mx-auto d-block"
              width="170"
              height="170"
            />
          </div>
          <div
            class="card-body d-flex flex-column justify-content-between h-50"
            style="background-color: black"
          >
            <div class="card-title my-4 text-white">
              {{ womenCloth.title }}
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
  name: "WomenClothingComp",
  data() {
    return {
      WomensClothings: [],
    };
  },
  methods: {
    async fetchData() {
      await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
          const middleList = json.filter(
            (item) => item.category == "women's clothing"
          );
          this.WomensClothings = middleList;
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
@media (max-width: 767.98px) {
  .container-fluid {
    max-width: 100%;
  }
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
