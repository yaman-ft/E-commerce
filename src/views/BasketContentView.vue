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
    <div class="container mx-auto my-5 h4 text-center" v-show="total !== 0">
      {{ "Total Amount  " + total + " AED" }}
    </div>
    <div class="added" v-if="fakeList.length !== 0">
      <div class="my-4 h6 w-75 text-center mx-auto">
        do you want to add this ?
        <button class="btn w-25 mx-4 btn-dark" @click="updateList">Yes</button>
      </div>
      <div class="d-flex justify-content-center w-100 mx-auto">
        <div
          class="w-25 h-25 row justify-content-start"
          v-for="(item, i) in fakeList"
          :key="i"
        >
          <img :src="item.image" class="col-2" />
          <button
            class="btn btn-secondary col-2 mt-2 btn-changed text-center"
            @click="fakeList.pop(i)"
          >
            remove
          </button>
        </div>
      </div>
    </div>
    <ul class="list-group w-75 mx-auto">
      <li
        class="d-flex justify-content-between list-group-item my-3 shadow-sm"
        v-for="(item, i) in basket"
        :key="i"
      >
        <div class="w-25 h-25 position-relative">
          <img :src="item.image" class="col-4" />
        </div>
        <div
          class="col-4 text-center mt-xl-4 mt-sm-3 price"
          style="color: #e6ca69"
        >
          {{ "AED  " + item.price }}
        </div>

        <button
          class="btn btn-dark shadow-0 rounded-0 text-center mt-xl-2 mt-md-4 mt-sm-2 mt-lg-3 btn-changed"
          @click="fakeList.push({ id: item.id, image: item.image })"
        >
          <i class="fa-solid fa-circle-plus mx-1"></i>add one
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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
      total: null,
      counter: 0,
      isLoading: true,
      fakeList: [],
    };
  },
  methods: {
    async fetchData() {
      await this.$store.state.BasketList.forEach((element) => {
        fetch(`https://fakestoreapi.com/products/${element}`)
          .then((result) => result.json())
          .then((json) => {
            this.basket.push(json);
            this.total += json.price;
          });
      });
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
