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
    </div>
    <div class="card-actions"> <!-- Contenedor para los botones -->
      <button class="add-button" v-if="!review" @click="goToReviewPage(appointment.id)">{{ 'Add Review' }}</button>
      <div class="actions-buttons" v-if="review">
        <button class="edit-button" @click="goToReviewPage(appointment.id)">{{ 'Edit Review' }}</button>
        <button class="delete-button" @click="deleteReview(review.id)" >{{ 'Delete Review' }}</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.history-card {
  display: flex;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 16px;
  position: relative;
  align-items: center;
  max-width: 400px;
  gap: 20px;
  background-color: white ;

}

.history-content {
  width: 10%;
  flex-grow: 1;
}

.card-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.actions-buttons {
  justify-content: space-evenly;
  gap: 20px;
  display: flex;
  flex-direction: column;
}

button {
  margin-bottom: 8px;
}

.warn {
  background-color: white;
  color: white;
}
button.add-button {
  background-color: #37123C;
  color: white;
}
button.edit-button {
  background-color: #37123C;
  color: white;
}

button.delete-button {
  color: red;
}
</style>