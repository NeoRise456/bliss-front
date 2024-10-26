<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ReviewManagementCard from '../components/review-management-card.component.vue';
import { ReviewApiService } from '../services/review.service.js';

const route = useRoute();
const router = useRouter();
const appointmentId = route.params.appointmentId;
const review = ref(null);
const reviewApiService = new ReviewApiService();

const fetchReview = async () => {
  try {
    const response = await reviewApiService.getReviewByReservationId(appointmentId);
    review.value = response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error('Error fetching review:', error);
  }
};

const saveReview = async (reviewData) => {
  try {
    if (review.value) {
      await reviewApiService.updateReview(review.value.id, reviewData);
    } else {
      await reviewApiService.createReview({ ...reviewData, appointmentId });
    }
    await router.push({name: 'ClientMyServices'});
  } catch (error) {
    console.error('Error saving review:', error);
  }
};

onMounted(() => {
  fetchReview();
});
</script>

<template>
  <div>
    <ReviewManagementCard :review="review" @saveReview="saveReview" />
  </div>
</template>

<style scoped>

</style>