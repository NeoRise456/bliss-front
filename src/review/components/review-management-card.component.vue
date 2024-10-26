<script setup>
import { ref, watch, computed } from 'vue';
import { Review } from '../model/review.entity.js';

const props = defineProps({
  review: {
    type: Object,
    default: () => null
  }
});

const emit = defineEmits(['saveReview']);
const rating = ref(0);
const comment = ref('');

const reviewData = computed(() => props.review);

const saveReview = () => {
  const review = new Review({
    rating: rating.value,
    comment: comment.value
  });
  emit('saveReview', review);
};

watch(reviewData, (newReview) => {
  if (newReview) {
    rating.value = newReview.rating;
    comment.value = newReview.comment;
  }
}, { immediate: true });
</script>

<template>
  <div class="review-management-card">
    <h2>{{ review ? 'Edit Review' : 'Add Review' }}</h2>
    <form @submit.prevent="saveReview">
      <label for="rating">Rating</label>
      <input type="number" id="rating" v-model="rating" min="1" max="5" required />

      <label for="comment">Comment</label>
      <textarea id="comment" v-model="comment" required></textarea>

      <button type="submit">{{ review ? 'Update Review' : 'Create Review' }}</button>
    </form>
  </div>
</template>

<style scoped>
.review-management-card {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
}

.review-management-card h2 {
  text-align: center;
  margin-bottom: 20px;
}

.review-management-card form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.review-management-card label {
  font-weight: bold;
}

.review-management-card input,
.review-management-card textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.review-management-card button {
  align-self: center;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.review-management-card button:hover {
  background-color: #0056b3;
}
</style>