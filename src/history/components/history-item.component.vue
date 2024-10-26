<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { Appointment } from '../model/appointment.entity.js';
import { Review } from '../../review/model/review.entity.js';
import { ReviewApiService } from '../../review/services/review.service.js';

const props = defineProps({
  appointment: {
    type: Appointment,
    required: true
  },
  review: {
    type: Review,
    required: false
  }
});

const router = useRouter();
const reviewApiService = new ReviewApiService();

const goToReviewPage = (appointmentId) => {
  router.push({ name: 'ReviewManagementPage', params: { appointmentId } });
};

const deleteReview = async (reviewId) => {
  try {
    await reviewApiService.deleteReview(reviewId);
    props.appointment.review = null;
  } catch (error) {
    console.error('Error deleting review:', error);
  }
};
</script>

<template>
  <div class="history-card">
    <div class="history-content">
      <h3 class="service-name">{{ appointment.serviceName }}</h3>
      <p class="company-name">{{ appointment.companyName }}</p>
      <p class="appointment-date" v-if="appointment.date">{{ appointment.date }}</p>
      <p class="appointment-date" v-else>No schedule available</p>
      <div class="card-actions">
        <button v-if="!review" @click="goToReviewPage(appointment.id)">{{ 'Add Review' }}</button>
        <div v-if="review">
          <button @click="goToReviewPage(appointment.id)">{{ 'Edit Review' }}</button>
          <button @click="deleteReview(review.id)" class="warn">{{ 'Delete Review' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-card {
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.history-content {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.service-name {
  font-size: 1.5rem;
  color: black;
  margin: 5px 0;
}

.company-name, .appointment-date {
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
}

.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button.warn {
  color: red;
}
</style>