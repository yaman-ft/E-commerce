<template>
  <div class="container-fluid" style="background-color: black">
    <div class="row d-flex justify-content-around flex-wrap">
      <div
        class="card border-3 shadow col-xl-6 mx-3 col-sm-10 col-lg-8 m-3 rounded-3 p-0 h-100 mt-5"
        v-for="(womenCloth, i) in WomensClothings"
        :key="i"
        style="background-color: black; border-color: #e6ca69"
      >
        <div class="d-flex flex-column justify-content-between">
          <div class="card-image-top w-100 h-50 bg-white">
            <img
              :src="womenCloth.image"
              alt=""
              class="mx-auto d-block"
              width="170"
              height="170"
            />
          </div>
          <div class="card-body h-50" style="background-color: black">
            <div class="card-title my-4 text-white">
              {{ womenCloth.title }}
            </div>

            <div class="mt-4" style="color: #e6ca69">
              AED {{ " " + womenCloth.price }}
            </div>
            <button
              class="py-1 btn rounded-0 border-1 mt-1 text-white"
              style="border-color: #e6ca69; padding: 0px 70px"
              @click="showDetiels(womenCloth.id)"
            >
              SEE MORE
            </button>
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
<style>
.container-fluid {
  text-align: center;
}
</style>
