<template>
  <nav
    class="navbar navbar-expand-sm justify-content-between pe-5"
    style="
      border-bottom: 16px solid #e6ca69;
      background-color: black;
      height: 150px;
    "
    v-if="screen > 1060"
  >
    <img
      src="@/assets/logo2.png"
      alt=""
      class="navbar-brand ms-4 p-0"
      width="150"
      height="150"
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      title="ALMOTTHEDON COMPANY"
    />
    <div class="d-flex flex-column">
      <div class="d-flex justify-content-end">
        <div class="w-50 position-relative me-5">
          <i
            class="fas fs-6 fa-search position-absolute text-center translate-middle-y"
            :class="{ 'text-dark': isInput, 'text-white': !isInput }"
            style="left: 50%; margin-top: 4.5%"
            @click="(isInput = true), (border = 1), (color = '#e6ca69')"
          ></i>
          <input
            class="form-control rounded-pill w-100 h-100 text-white shadow-none"
            type="text"
            placeholder=""
            name=""
            id=""
            style="background-color: black"
            :style="
              ({ 'border-width': border + 'px' }, { 'border-color': color })
            "
            @focus="(isInput = true), (border = 1), (color = '#e6ca69')"
            @focusout="(isInput = false), (border = 0), (color = 'black')"
          />
        </div>
        <ul class="navbar-nav justify-content-end me-3">
          <li class="nav-item">
            <a
              href="https://www.facebook.com"
              class="nav-link navBarLink"
              target="_blank"
              ><img src="@/assets/Icons/facebook_Gold.png" alt="" width="20"
            /></a>
          </li>
          <li class="nav-item">
            <a
              href="https://www.instagram.com"
              class="nav-link navBarLink"
              target="_blank"
              ><img src="@/assets/Icons/instagram_Gold.png" alt="" width="20"
            /></a>
          </li>
          <li class="nav-item">
            <a
              href="https://www.twitter.com"
              class="nav-link navBarLink"
              target="_blank"
              ><img src="@/assets/Icons/Twitter - Gold.png" alt="" width="20"
            /></a>
          </li>
          <li class="nav-item">
            <a
              href="https://www.youtube.com"
              class="nav-link navBarLink"
              target="_blank"
              ><img src="@/assets/Icons/Youtube - Gold.png" alt="" width="20"
            /></a>
          </li>
        </ul>
      </div>
      <ul class="navbar-nav d-flex">
        <li class="nav-item mx-3 mt-4">
          <RouterLink to="/" class="nav-link navBarLink">Home</RouterLink>
        </li>
        <li class="nav-item mx-3 mt-4">
          <a href="#" class="nav-link navBarLink" @click="GoToCategory('elec')"
            >Electronics</a
          >
        </li>
        <li class="nav-item mx-3 mt-4">
          <a href="#" class="nav-link navBarLink" @click="GoToCategory('jewel')"
            >Jewelry</a
          >
        </li>
        <li class="nav-item mx-3 mt-4">
          <a href="#" class="nav-link navBarLink" @click="GoToCategory('men')"
            >Men Clothing</a
          >
        </li>
        <li class="nav-item mx-3 mt-4">
          <a href="#" class="nav-link navBarLink" @click="GoToCategory('women')"
            >Women Clothing</a
          >
        </li>
        <li class="nav-item mx-3 mt-4 bg">
          <a href="#" class="nav-link navBarLink" @click="scrlTo(1600)"
            >Media Center</a
          >
        </li>
        <li class="nav-item mx-3 mt-4 bg">
          <a href="#" class="nav-link navBarLink" @click="scrlTo(3000)"
            >Contact Us</a
          >
        </li>
      </ul>
    </div>
  </nav>
  <nav
    class="navbar h-25 justify-content-between pe-5"
    style="border-bottom: 16px solid #e6ca69; background-color: black"
    v-else
  >
    <img
      src="@/assets/logo2.png"
      alt=""
      class="navbar-brand ms-4 p-0"
      width="100"
      height="100"
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      title="ALMOTTHEDON COMPANY"
    />
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapses"
      aria-controls="collapses"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars text-secondary"></i>
    </button>
    <div class="navbar-collapse collapse d-xxl-none d-xl-none" id="collapses">
      <div class="d-flex flex-column justify-content-around text-start my-4">
        <div class="w-100 position-relative">
          <i
            class="fas fa-search position-absolute top-50 mb-4 start-50"
            :class="{ 'text-dark': isInput, 'text-white': !isInput }"
            @click="(isInput = true), (border = 1), (color = '#e6ca69')"
          ></i>
          <input
            class="form-control rounded-pill w-100 h-100 text-white shadow-none"
            type="text"
            placeholder=""
            name=""
            id=""
            style="background-color: black"
            :style="
              ({ 'border-width': border + 'px' }, { 'border-color': color })
            "
            @focus="(isInput = true), (border = 1), (color = '#e6ca69')"
            @focusout="(isInput = false), (border = 0), (color = 'black')"
          />
        </div>
        <div class="d-flex justify-content-between wrap row">
          <div
            class="d-flex flex-column justify-content-around col-sm-12 col-lg-4 col-md-6"
          >
            <span class="nav-item mx-3 mt-4">
              <RouterLink to="/" class="nav-link navBarLink" id="closeButton"
                >Home</RouterLink
              >
            </span>
            <span class="nav-item mx-3 mt-4">
              <a
                href="#"
                class="nav-link navBarLink"
                @click="GoToCategory('elec')"
                >Electronics</a
              >
            </span>
            <span class="nav-item mx-3 mt-4">
              <a
                href="#"
                class="nav-link navBarLink"
                @click="GoToCategory('jewel')"
                >Jewelry</a
              >
            </span>
          </div>
          <div
            class="d-flex flex-column justify-content-around col-sm-6 col-lg-4 col-md-6"
          >
            <span class="nav-item mx-3 mt-4">
              <a
                href="#"
                class="nav-link navBarLink"
                @click="GoToCategory('men')"
                >Men Clothing</a
              >
            </span>
            <span class="nav-item mx-3 mt-4">
              <a
                href="#"
                class="nav-link navBarLink"
                @click="GoToCategory('women')"
                >Women Clothing</a
              >
            </span>
          </div>
          <div
            class="d-flex flex-column justify-content-around col-sm-6 col-lg-4 col-md-6"
          >
            <span class="nav-item mx-3 mt-4 bg">
              <a href="#" class="nav-link navBarLink" @click="scrlTo(1370)"
                >Media Center</a
              >
            </span>
            <span class="nav-item mx-3 mt-4 bg">
              <a href="#" class="nav-link navBarLink" @click="scrlTo(2900)"
                >Contact Us</a
              >
            </span>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-center my-4">
        <span class="nav-item mx-1">
          <a
            href="https://www.facebook.com"
            class="nav-link navBarLink mx-1"
            target="_blank"
            ><img src="@/assets/Icons/facebook_Gold.png" alt="" width="20"
          /></a>
        </span>
        <span class="nav-item mx-1">
          <a
            href="https://www.instagram.com"
            class="nav-link navBarLink mx-1"
            target="_blank"
            ><img src="@/assets/Icons/instagram_Gold.png" alt="" width="20"
          /></a>
        </span>
        <span class="nav-item mx-1">
          <a
            href="https://www.twitter.com"
            class="nav-link navBarLink mx-1"
            target="_blank"
            ><img src="@/assets/Icons/Twitter - Gold.png" alt="" width="20"
          /></a>
        </span>
        <span class="nav-item mx-1">
          <a
            href="https://www.youtube.com"
            class="nav-link navBarLink mx-1"
            target="_blank"
            ><img src="@/assets/Icons/Youtube - Gold.png" alt="" width="20"
          /></a>
        </span>
      </div>
    </div>
  </nav>
  <RouterView></RouterView>
</template>
<script>
export default {
  mounted() {
    window.addEventListener("resize", this.getScreen);
    window.addEventListener("scroll", this.Scrolled);
  },
  data() {
    return {
      isInput: false,
      isFixed: false,
      border: 0,
      color: "black",
      screen: window.innerWidth,
    };
  },
  methods: {
    GoToCategory(category) {
      this.$store.state.CurrentCategory = category;
      this.$router.push({ name: "category" });
    },
    Scrolled() {
      if (window.scrollY > 400) {
        this.isFixed = true;
      } else this.isFixed = false;
    },
    scrlTo(y) {
      window.scrollTo(0, y);
    },
    getScreen() {
      this.screen = window.innerWidth;
    },
  },
};
// document.getElementById("closeButton").addEventListener("click", function () {
//   var myCollapse = document.getElementById("collapses");
//   var bsCollapse = new bootstrap.Collapse(myCollapse, {
//     toggle: false,
//   });
//   bsCollapse.hide();
// });
</script>
<style scoped>
#app {
  text-align: center;
}
.navBarLink {
  color: white;
  font-family: "Marcellus", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
}
.navBarLink:hover {
  color: #e6ca69;
}
.bg:visited {
  color: white;
}
</style>
