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
  <div class="after-loading" v-else>
    <ul class="list-group w-100 mx-auto">
      <li
        class="d-flex justify-content-center flex-column flex-lg-row align-items-center list-group-item my-3 shadow rounded-5 w-100 h-100 px-3"
        v-for="(item, i) in basket"
        :key="i"
      >
        <div
          class="d-flex justify-content-lg-start justify-content-between col-12 col-lg-2"
        >
          <button
            class="btn-close shadow-none fs-5 col-1 float-left me-5 align-self-center"
            @click="
              basket.splice(i, 1) && this.$store.state.BasketList.splice(i, 1)
            "
          ></button>
          <i
            @click="heartRed[i] = 1 ? heartRed[i] == 0 : 0"
            class="fa-heart fs-1 heartIcon col-1 align-self-center"
            :class="{
              fas: heartRed[i] == 1,
              far: heartRed[i] == 0,
              'text-danger': heartRed[i] == 1,
            }"
          ></i>
        </div>
        <div
          class="d-flex flex-coulmn flex-md-row justify-content-center align-items-center col-12 col-lg-8 col-xl-8"
        >
          <div class="col-4">
            <img :src="item.image" class="align-self-center w-50 h-50" />
          </div>
          <div
            class="col-xl-4 col-6 col-md-4 text-center mt-xl-4 mt-sm-3 d-flex justify-content-between flex-column"
          >
            <span class="price" style="color: #e6ca69"> {{ item.title }}</span>
            <div
              class="quantity d-flex justify-content-between flex-column my-3 col-12"
            >
              <span class="my-2">quantity</span>
              <div
                class="d-flex justify-content-center col-xl-6 col-12 mx-auto"
              >
                <button
                  class="btn btn-white w-25 border-1 border-dark fs-3"
                  @click="counter[i]--"
                  :disabled="counter <= 0"
                >
                  -
                </button>
                <input
                  type="text"
                  v-model="counter[i]"
                  class="w-25 fs-3 text-center border-0"
                />
                <button
                  class="btn btn-white w-25 border-1 border-dark fs-3"
                  @click="counter[i]++, addOne"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          class="btn btn-dark px-4 py-1 rounded-3 h-25 col-sm-6 col-12 col-md-4 col-lg-2 col-xl-2 my-xl-0 my-3"
        >
          <span class="mx-3">go to pay</span>
          <div
            class="spinner-border spinner-border-sm text-white"
            v-if="addItem == true"
          ></div>
          <span v-else>{{ "  " + counter[i] * item.price }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// import RatingComp from "@/components/RatingComp";

export default {
  components: {
    // RatingComp,
  },
  mounted() {
    this.fetchData();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  name: "BasketContentView",
  data() {
    return {
      basket: [],
      total: 0,
      counter: [],
      heartRed: [],
      isLoading: true,
      fakeList: [],
      addItem: false,
    };
  },
  methods: {
    async fetchData() {
      await this.$store.state.BasketList.forEach((element) => {
        this.heartRed.push(0);
        this.counter.push(element.counter);
        fetch(`https://fakestoreapi.com/products/${element.id}`)
          .then((result) => result.json())
          .then((json) => {
            this.basket.push(json);
          });
      });
    },
    addOne() {
      setTimeout(() => {
        this.addItem = true;
      }, 2000);
    },
    counterItem(id) {
      this.basket.filter((item) => {
        item.id = id;
      });
    },
    fetchAgain(id) {
      this.$store.state.BasketList.push(id);
      this.fetchData();
    },
    async updateList() {
      this.fakeList.forEach((element) => {
        this.$store.state.BasketList.push(element.id);
      });
      this.basket = [];
      await this.fetchData();
      this.fakeList = [];
    },
  },
};
</script>
<style scoped>
.price {
  font-size: x-large;
}
img {
  width: 25%;
  height: 25%;
}
.btn-changed {
  width: 25%;
  height: 25%;
}
nav {
  position: fixed;
}
.container-fluid {
  text-align: center;
}
@media (max-width: 1000px) {
  img {
    width: 50%;
    height: 50%;
  }
  .heartIcon {
    cursor: pointer;
  }
  .btn-changed {
    width: 50%;
    height: 50%;
  }
}
@media (max-width: 670px) {
  .price {
    font-size: medium;
  }
}
</style>
