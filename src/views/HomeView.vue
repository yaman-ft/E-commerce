<template>
  <div class="d1 w-auto">
    <div class="container-fluid px-0" style="background-color: black">
      <div class="container">
        <div
          class="image-container position-relative w-100 h-100 overflow-hidden"
        >
          <img src="@/assets/Images/Header 1.jpg" class="image w-100 h-100" />
          <div
            class="overlay position-absolute top-0 start-0 bottom-0 end-0"
            style="background-color: rgba(30, 28, 28, 0.5)"
          ></div>
        </div>
        <br />
        <br />
        <br />
        <div class="d-flex justify-content-center">
          <h1
            class="mx-1 pointOne"
            :class="{ 'mx-3': thisNUmber == 50 }"
            style="color: #e6ca69"
            :style="{ 'font-size': thisNUmber + 'px' }"
            @click="thisNUmber = 50"
          >
            &#8226;
          </h1>
          <h1 class="mx-1" style="color: #e6ca69">&#8226;</h1>
          <h1 class="mx-1" style="color: #e6ca69">&#8226;</h1>
          <h1 class="mx-1" style="color: #e6ca69">&#8226;</h1>
          <h1 class="mx-1" style="color: #e6ca69">&#8226;</h1>
        </div>
        <div
          class="d-flex flex-column justify-content-center col-lg-6 col-md-8 col-xs-6 col-xl-4 my-5 mx-auto position-relative mx-auto"
        >
          <img
            src="@/assets/Icons/ALMOTTHEDON COMPANY Logo (3)1.png"
            alt=""
            width="300"
            class="align-self-md-center align-self-lg-start align-self-sm-start mx-auto ms-sm-5 mt-sm-5 mt-xl-4 mt-lg-0 me-xl-0 me-sm-0 me-md-5 ms-lg-2 me-xxl-5 ms-xl-0 logoImage"
          />
          <h3
            class="middle-title text-white ms-xxl-4 align-self-center mb-sm-0 ms-sm-0 ms-md-5 mb-lg-5 mb-md-1 mb-xl-4 position-absolute ms-lg-1 ms-xl-4 mb-5 ms-3"
          >
            LATEST PRODUCTS
          </h3>
        </div>
        <div class="d-flex flex-wrap justify-content-center mt-5 roboto">
          <div class="card col-sm-12 col-md-6 col-lg-4 border-0 mb-4">
            <div class="card-body" style="background-color: black">
              <div
                class="cont bg-white w-100 position-relative"
                style="height: 60%"
              >
                <img
                  src="@/assets/Icons/heart_10826871.png"
                  alt=""
                  class="mt-3 position-absolute top-0 end-0 me-3"
                  width="35"
                />
                <img
                  src="@/assets/Images/levitating-music-headphones-display.jpg"
                  alt=""
                  class="card-image mx-auto"
                  width="70%"
                  height="100%"
                />
              </div>
              <div class="card-text my-2 text-white">Head Phone</div>
              <div class="my-2" style="color: #e6ca69">AED 250</div>
              <button
                class="py-1 btn btn-hover rounded-0 border-1 mt-1 text-white"
                style="border-color: #e6ca69; padding: 0px 70px"
                @click="GoToCategory('elec')"
              >
                SEE MORE
              </button>
            </div>
          </div>

          <div class="card col-sm-12 col-md-6 col-lg-4 border-0 mb-4">
            <div class="card-body" style="background-color: black">
              <div
                class="cont bg-white w-100 position-relative"
                style="height: 60%"
              >
                <img
                  src="@/assets/Icons/heart_10826871.png"
                  alt=""
                  class="mt-3 position-absolute top-0 end-0 me-3"
                  width="35"
                />
                <img
                  src="@/assets/Images/beautiful-luxury-necklace-jewelry-stand-neck.jpg"
                  alt=""
                  class="card-image mx-auto"
                  width="70%"
                  height="100%"
                />
              </div>
              <div class="card-text my-2 text-white">Necklace</div>
              <div class="my-2" style="color: #e6ca69">AED 1500</div>
              <button
                class="py-1 btn btn-hover rounded-0 border-1 mt-1 text-white"
                style="border-color: #e6ca69; padding: 0px 70px"
                @click="GoToCategory('jewel')"
              >
                SEE MORE
              </button>
            </div>
          </div>

          <div class="card col-sm-12 col-md-6 col-lg-4 border-0 mb-4">
            <div class="card-body" style="background-color: black">
              <div
                class="cont bg-white w-100 position-relative"
                style="height: 60%"
              >
                <img
                  src="@/assets/Icons/heart_10826871.png"
                  alt=""
                  class="mt-3 position-absolute top-0 end-0 me-3"
                  width="35"
                />
                <img
                  src="@/assets/Images/home-appliances-group-white-refrigerator-washing-machine-stove-microwave-oven-vacuum-cleaner-isolated-white-background-3d.jpg"
                  alt=""
                  class="card-image mx-auto"
                  width="70%"
                  height="100%"
                />
              </div>
              <div class="card-text my-2 text-white">Home Appliances</div>
              <div class="my-2" style="color: #e6ca69">AED 5000</div>
              <button
                class="py-1 btn btn-hover rounded-0 border-1 mt-1 text-white"
                style="border-color: #e6ca69; padding: 0px 70px"
                @click="GoToCategory('elec')"
              >
                SEE MORE
              </button>
            </div>
          </div>
        </div>

        <div class="points mb-4 d-flex justify-content-center">
          <h1 class="mx-1" style="color: #e6ca69">&#8226;</h1>
          <h1 class="mx-1" style="color: #e6ca69">&#8226;</h1>
          <h1 class="mx-1" style="color: #e6ca69">&#8226;</h1>
          <h1 class="mx-1" style="color: #e6ca69">&#8226;</h1>
          <h1 class="mx-1" style="color: #e6ca69">&#8226;</h1>
        </div>
      </div>

      <div
        class="section w-100"
        style="margin-top: 200px; height: 68px; background-color: #e6ca69"
      >
        <div class="container d-flex justify-content-end position-relative">
          <img
            v-if="screen > 1200"
            class="position-absolute start-0 rounded-2 translate-middle-y"
            src="@/assets/Images/portrait-young-woman-with-earrings-with-gems-isolated.jpg"
            alt=""
            width="430"
            height="500"
            style="margin-top: 120px"
          />
          <div class="col-7 float-lg-end mx-auto mx-sm-auto mx-xl-0">
            <h4 class="mx-auto mt-3 imageTitle" style="color: black">
              LUXURY JEWELRY COLLECTION
            </h4>
          </div>
        </div>
      </div>
      <div
        class="content col-xl-7 col-lg-9 col-sm-12 m-5 p-5 roboto float-xl-end mx-sm-auto mx-xl-0"
      >
        <h4
          class="text-white user-select-none text-sm-center text-xl-start lh-base lorem"
        >
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet,
          ipsam exercitationem molestiae hic consectetur distinctio magnam qui
          nostrum iste non eligendi porro sed perspiciatis quisquam sequi in a,
          ex doloremque.
        </h4>
        <button
          class="py-3 btn rounded-0 border-1 mt-5 text-white float-xl-start btn-hover"
          style="border-color: #e6ca69; padding: 0px 20%"
        >
          MORE
        </button>
      </div>
      <br />
      <div class="container position-relative overflow-hidden px-0 w-100 h-100">
        <img
          class="header-3 w-100 h-100"
          src="@/assets/Images/Header 2.jpg"
          alt=""
        />
        <div
          class="position-absolute top-0 start-0 end-0 bottom-0 w-100 h-100 category"
          style="background-color: rgba(30, 28, 28, 0.667)"
        >
          <div class="text-center mb-5 pt-sm-3 pt-xl-5 fs-xl-2 fs-sm-6 title">
            <div class="fw-normal h1 h11" style="color: #e6ca69">
              CATEGORIES
            </div>
          </div>
          <div
            class="d-flex justify-content-center mt-xl-5 mt-sm-2 pt-5 px-5 text-sm-center"
          >
            <div
              class="w-25 d-flex align-items-center mx-2 item"
              style="background-color: #e6cb69a4; height: 200px"
              @click="GoToCategory('elec')"
            >
              <span class="text-center w-100 mx-auto">ELECTRONICS</span>
            </div>
            <div
              class="w-25 d-flex align-items-center mx-2 item"
              style="background-color: #e6cb69a4; height: 200px"
              @click="GoToCategory('jewel')"
            >
              <span class="text-center w-100 mx-auto">JEWELRY</span>
            </div>
            <div
              class="w-25 d-flex align-items-center mx-2 item"
              style="background-color: #e6cb69a4; height: 200px"
              @click="GoToCategory('men')"
            >
              <span class="text-center w-100 mx-auto">MEN CLOTHING</span>
            </div>
            <div
              class="w-25 d-flex align-items-center mx-2 item"
              style="background-color: #e6cb69a4; height: 200px"
              @click="GoToCategory('women')"
            >
              <span class="text-center w-100 mx-auto">WOMEN CLOTHING</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container px-0 mt-4">
        <div class="w-100" style="height: 2px; background-color: #e6ca69"></div>
        <div
          class="contFooter w-100 my-4 d-flex flex-column justify-content-between"
        >
          <div class="up w-100 row">
            <div
              class="d-flex images-footer flex-column justify-content-between col-xl-4 float-xl-start mx-sm-auto mx-xl-0 ms-0 col-sm-6 mx-auto"
            >
              <img
                class="w-75 h-75 mb-4 me-xl-5 mx-auto"
                src="@/assets/logo2 - Copy.png"
                alt=""
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title="ALMOTTHEDON COMPANY"
              />
              <div
                class="d-flex justify-content-xl-start justify-content-sm-center ps-3"
              >
                <a
                  href="https://www.facebook.com"
                  class="nav-link"
                  target="_blank"
                >
                  <img
                    class="mx-2"
                    src="@/assets/Icons/facebook_White.png"
                    alt=""
                    width="25"
                  />
                </a>
                <a
                  href="https://www.youtube.com"
                  class="nav-link"
                  target="_blank"
                >
                  <img
                    class="mx-2"
                    src="@/assets/Icons/Youtube - White .png"
                    alt=""
                    width="25"
                  />
                </a>
                <a
                  href="https://www.instagram.com"
                  class="nav-link"
                  target="_blank"
                >
                  <img
                    class="mx-2"
                    src="@/assets/Icons/instagram_White.png"
                    alt=""
                    width="25"
                  />
                </a>
                <a
                  href="https://www.twitter.com"
                  class="nav-link"
                  target="_blank"
                >
                  <img
                    class="mx-2"
                    src="@/assets/Icons/Twitter - White .png"
                    alt=""
                    width="25"
                  />
                </a>
              </div>
            </div>
            <div
              class="contentFooter col-xxl-8 float-xl-end d-flex col-sm-12 flex-sm-wrap flex-xl-nowrap justify-content-between text-white"
              style="padding: 7%"
            >
              <div
                class="d-flex flex-column justify-content-between text-start col-sm-12 col-md-9 col-lg-5 my-sm-2"
              >
                <div class="h1 mt-3 footer-items">Home</div>
                <div class="h4 mt-3 footer-items" style="color: #e6ca69">
                  About Us
                </div>
                <div class="h4 mt-3 footer-items" style="color: #e6ca69">
                  Media Center
                </div>
                <div class="h4 mt-3 footer-items" style="color: #e6ca69">
                  Contact Us
                </div>
              </div>
              <div
                class="d-flex flex-wrap flex-sm-column justify-content-between col-4 text-start"
              >
                <div
                  class="h4 mt-3 footer-items"
                  style="color: #e6ca69"
                  @click="GoToCategory('elec')"
                >
                  Electronics
                </div>
                <div
                  class="h4 mt-3 footer-items"
                  style="color: #e6ca69"
                  @click="GoToCategory('jewel')"
                >
                  Jweelry
                </div>
                <div
                  class="h4 mt-3 footer-items"
                  style="color: #e6ca69"
                  @click="GoToCategory('men')"
                >
                  Men Clothing
                </div>
                <div
                  class="h4 mt-3 footer-items"
                  style="color: #e6ca69"
                  @click="GoToCategory('women')"
                >
                  Women Clothing
                </div>
              </div>
              <div
                class="d-flex flex-column justify-content-between text-start ms-xl-5 col-sm-12 col-md-5 col-lg-4"
              >
                <div class="h1 mt-3 footer-items">Contact Us</div>
                <div class="h4 mt-3 footer-items" style="color: #e6ca69">
                  +971 56 715 5150
                </div>
                <div class="h4 mt-3 footer-items" style="color: #e6ca69">
                  +971 4 832 2253
                </div>
                <div class="h4 mt-3 footer-items" style="color: #e6ca69">
                  info@almotthedon.com
                </div>
              </div>
            </div>
          </div>
          <div class="down mt-5">
            <div class="w-100 bg-white" style="height: 2px"></div>
            <div class="text-center text-white my-3">
              <span>&copy;Al Motthedon 2024. All Rights Reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  mounted() {
    window.addEventListener("resize", this.getScreen);
  },
  data() {
    return {
      thisNUmber: null,
      screen: window.innerWidth,
      isInput: false,
      isFixed: false,
    };
  },
  updated() {
    console.log(this.screen);
  },
  methods: {
    getScreen() {
      this.screen = window.innerWidth;
    },

    GoToCategory(category) {
      this.$store.state.CurrentCategory = category;
      this.$router.push({ name: "category" });
    },
  },
};
</script>
<style scoped>
.item:hover {
  cursor: pointer;
  color: black;
}
.roboto {
  font-family: "Roboto Flex", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
.btn-hover:hover {
  color: black;
  background-color: #e6ca69;
  border-color: black;
}
.category {
  font-family: "Marcellus", serif;
  font-weight: 400;
  font-style: normal;
}
.footer-items {
  font-family: "Marcellus", serif;
  font-style: normal;
  font-weight: 400;
}
.footer-items:hover {
  color: #e6ca69;
  cursor: pointer;
}
.h11 {
  font-size: 65px;
}
.middle-title {
  font-family: "Marcellus", serif;
  font-weight: 400;
  font-style: normal;
}
.d1 {
  text-align: center;
}

.header-3 {
  object-fit: cover;
}

.pointOne {
  transition-duration: 0.2s;
  transition-behavior: smooth;
}
.navBarLink {
  color: white;
}
.navBarLink:hover {
  color: #e6ca69;
}
.item {
  font-size: x-large;
}
/* Media Queries */
@media (max-width: 768px) {
  .item {
    max-height: 100px;
    font-size: medium;
  }
  @media (max-width: 768px) {
    .contFooter {
      font-weight: 100;
    }
  }
}
@media (max-width: 575px) {
  .images-footer {
    width: 50%;
  }
  .contentFooter {
    padding-left: 50px;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  .h11 {
    font-size: 20px;
  }
  .item {
    height: 120px;
    width: 120px;
    font-size: x-small;
  }
  .title {
    font-size: large;
  }
  .btn-hover {
    width: 100%;
  }
  .lorem {
    font-size: medium;
  }
  .imageTitle {
    padding: 0;
    align-self: center;
  }
  .middle-title {
    font-weight: 200;
  }
  .logoImage {
    width: 200px;
  }
}
</style>
