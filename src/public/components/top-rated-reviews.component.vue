<script>
import {ReviewApiService} from "../../review/services/review.service.js";

export default {
  name: "top-rated-reviews",
  data(){
    return {
      topRatedReviews: []
    }
  },
  methods:{
    async loadTopRatedReviews(){
      const reviewApiService= new ReviewApiService();
      try{
        const reviewsResponse= await reviewApiService.getReview();
        const reviews= reviewsResponse.data;

        const sortedReviews= reviews.sort((a,b)=> b.rating - a.rating);

        const topReviews= sortedReviews.slice(0,5);

        this.topRatedReviews= await Promise.all(
            topReviews.map(async (review)=>{
              const userResponse= await reviewApiService.getUserById(review.userId);
              const user= userResponse.data[0];
              return {...review, userName: user.name};
            })
        );
      }catch (error){
        console.error("Error loading top rated reviews:",error);
      }

    }
  },
  mounted() {
    this.loadTopRatedReviews();
  }
}
</script>

<template>
  <div class="top-rated-reviews-container">
    <div v-for="review in topRatedReviews" :key="review.id" class="review-card">
      <pv-card class="p-shadow-4">
        <template #title>
          <div class="p-d-flex p-jc-center content-text">
            <h3>{{ review.userName }}</h3>
          </div>
        </template>

        <template #content>
          <div class="p-card-content p-text-center content-text">
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.comment }}</p>
            <p>Date: {{ new Date(review.createdDate).toLocaleDateString() }}</p>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
.top-rated-reviews-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.p-shadow-4{
  background: #D9D9D9;
}
.review-card {
  width: 20rem;
  height: auto;
  overflow: hidden;
  margin: 1rem;

}
.content-text{
  color: #37123C;
}
</style>