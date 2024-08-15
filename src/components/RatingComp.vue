<template>
  <div class="star-rating">
    <span
      v-for="star in stars"
      :key="star"
      @click="setRating(star)"
      @mouseover="hoverRating(star)"
      @mouseleave="resetRating"
      class="star"
      :class="{ filled: star <= (hoveredRating || rating) }"
    >
      ★
    </span>
  </div>
</template>

<script>
export default {
  name: "RatingComp",
  data() {
    return {
      stars: [1, 2, 3, 4, 5],
      rating: (Math.random() * 10) % 6,
      hoveredRating: 0,
    };
  },
  methods: {
    setRating(star) {
      this.rating = star;
    },
    hoverRating(star) {
      this.hoveredRating = star;
    },
    resetRating() {
      this.hoveredRating = 0;
    },
  },
};
</script>

<style scoped>
.star {
  cursor: pointer;
  font-size: 2em;
  color: lightgray;
}
.star.filled {
  color: #e6ca69;
}
</style>
