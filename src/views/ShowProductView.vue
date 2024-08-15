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
    <div class="w-100 px-5 my-3">
      <i
        class="fas fa-shopping-cart fs-1 float-end position-relative shop"
        @click="goGarpage"
      >
        <div
          class="badge w-50 h-50 fs-6 text-center position-absolute bg-danger p-1 text-white rounded-circle top-0 end-100 translate-middle-y"
          v-if="numberOfItems > 0"
        >
          {{ numberOfItems }}
        </div>
      </i>
    </div>
    <br />
    <div
      class="d-flex justify-content-between flex-column flex-lg-row w-75 h-50 mx-auto mt-5"
    >
      <div class="image w-50 h-50 mx-auto mx-xl-0">
        <img class="" :src="product.image" alt="" width="50%" height="50%" />
      </div>
      <div class="right col-md-12 col-lg-8 col-sm-12">
        <div class="h4 my-3 text-center" style="color: #e6ca69">
          {{ product.title }}
        </div>
        <span class="text-center my-3 lh-lg"> {{ product.description }}</span>
        <RatingComp></RatingComp>
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
        <div
          class="quantity d-flex justify-content-between flex-column my-3 col-12"
        >
          <span class="my-2">quantity</span>
          <div class="btn-group col-6 col-md-3 mx-auto">
            <button
              class="btn btn-dark fs-3"
              @click="counter--"
              :disabled="counter <= 0"
            >
              -
            </button>
            <input
              type="text"
              v-model="counter"
              class="w-50 fs-3 text-center"
            />
            <button class="btn btn-dark fs-3" @click="counter++">+</button>
          </div>
        </div>
        <button
          class="btn a col-12 col-sm-8 col-md-6 mx-auto mt-5 rounded-0 border-1 mt-1 py-1"
          style="border-color: #e6ca69; padding: 0px 70px"
          @click="goToBasket(product.id, this.counter)"
          :disabled="counter <= 0"
        >
          Add to cart
        </button>
      </div>
    </div>
    <div
      class="basket position-absolute top-50 translate-middle-y start-0 mb-5 shadow h-xl-75 h-sm-50 border border-1 border-dark rounded-5 p-4 ms-xl-3 mx-sm-auto m-sm-3"
      :style="{ opacity: showBasket }"
    >
      <div
        class="alert rounded-0 text-center py-0 mx-0 px-2 w-100 text-white"
        style="background-color: black"
      >
        added to cart
      </div>
      <div class="d-flex flex-xl-row flex-sm-column justify-content-between">
        <img
          class="w-25 h-25 mx-sm-auto mx-xl-0"
          :src="this.$store.state.BasketContet.image"
          alt=""
        />
        <span>{{ numberOfItems + " of this item added" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import RatingComp from "@/components/RatingComp";

export default {
  components: {
    RatingComp,
  },
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
      counter: 0,
      numberOfItems: 0,
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
    goToBasket(id, counter) {
      this.showBasket = 1;
      this.numberOfItems = counter;
      this.$store.state.BasketContet = this.product;
      this.$store.state.BasketList.push({ id: id, counter: counter });
      this.counter = 0;
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
  backdrop-filter: blur(20px);
  width: 25%;
}
@media (max-width: 765px) {
  .basket {
    width: 50%;
  }
}
.shop:hover {
  cursor: pointer;
}
@media (max-width: 576px) {
  .quantity {
    width: 100%;
  }
  .btn-group {
    width: 50%;
  }
}
</style>
