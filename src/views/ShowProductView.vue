<template>
  <div
    class="loop mx-auto w-50 mt-5 d-flex justify-content-center"
    v-if="isLoading == true"
  >
    <div class="spinner-grow text-dark mx-1 spinner-grow-sm"></div>
    <div class="spinner-grow text-dark mx-1 spinner-grow-sm"></div>
    <div class="spinner-grow text-dark mx-1 spinner-grow-sm"></div>
    <div class="spinner-grow text-dark mx-1 spinner-grow-sm"></div>
  </div>
  <div class="container-fluid h-100 position-relative" v-else>
    <div
      class="d-flex justify-content-between flex-sm-column flex-lg-row w-75 h-50 mx-auto mt-5"
    >
      <div class="image w-50 h-50 mx-sm-auto mx-xl-0">
        <img class="" :src="product.image" alt="" width="50%" height="50%" />
      </div>
      <div class="right col-xl-8 col-sm-12">
        <div class="h4 my-3 text-center" style="color: #e6ca69">
          {{ product.title }}
        </div>
        <span class="text-center my-3 lh-lg"> {{ product.description }}</span>
        <div
          class="mt-4 px-5 w-50 mx-auto"
          style="
            background: linear-gradient(
              to right,
              #dac8867d,
              #e6ca69,
              #dac8867d
            );
          "
        >
          AED {{ " " + product.price }}
        </div>
        <button
          class="btn a w-50 mx-auto mt-5 rounded-0 border-1 mt-1 py-1"
          style="border-color: #e6ca69; padding: 0px 70px"
          @click="goToBasket(product.id)"
        >
          Add to cart
        </button>
        <button
          class="btn b w-50 mx-auto mt-5 rounded-0 mt-3 py-1"
          style=""
          @click="goGarpage"
        >
          go to cart
        </button>
      </div>
    </div>
    <div
      class="basket position-absolute top-100 start-0 mb-5 shadow h-xl-75 h-sm-50 border border-3 border-dark rounded-3 p-4 ms-xl-3 mx-sm-auto m-sm-3"
      :style="{ opacity: showBasket }"
    >
      <div
        class="alert alert-dark rounded-0 text-center py-0 mx-0 px-2 w-100 text-white"
      >
        Cart
      </div>
      <div class="d-flex flex-xl-row flex-sm-column justify-content-between">
        <img
          class="w-25 h-25 mx-sm-auto mx-xl-0"
          :src="this.$store.state.BasketContet.image"
          alt=""
        />
        <span>{{ this.$store.state.BasketContet.title }}</span>
      </div>
      <!-- <div class="">
        <button
          class="btn w-100 mx-auto rounded-0 border-1 py-1"
          style="border-color: #e6ca69; padding: 0px 70px"
          @click="goGarpage"
        >
          show basket
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowProduct",
  mounted() {
    this.fetchProductData();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  data() {
    return {
      product: [],
      title: null,
      price: null,
      showBasket: 0,
      isLoading: true,
    };
  },
  methods: {
    async fetchProductData() {
      await fetch(
        `https://fakestoreapi.com/products/${this.$store.state.CurrentProduct}`
      )
        .then((result) => result.json())
        .then((data) => (this.product = data));
    },
    goToBasket(id) {
      this.showBasket = 1;
      this.$store.state.BasketContet = this.product;
      this.$store.state.BasketList.push(id);
      this.reduceOpacity();
    },
    goGarpage() {
      this.$router.replace({ name: "basket" });
    },
    reduceOpacity() {
      setTimeout(() => {
        this.showBasket = 0;
      }, 2000);
    },
  },
};
</script>
<style scoped>
.container-fluid {
  text-align: center;
}
.a {
  transition-duration: 0.3s;
}
.a:hover {
  background-color: #e6ca69;
  color: black;
}
.b {
  transition-duration: 0.3s;
  background-color: #e6ca69;
  padding: 0px 70px;
}
.b:hover {
  background-color: white;
  color: black;
  border-color: #e6ca69;
}
.basket {
  transition-duration: 0.7s;
  width: 25%;
}
@media (max-width: 765px) {
  .basket {
    width: 50%;
  }
}
</style>
