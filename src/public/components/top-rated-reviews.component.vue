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



      }catch (error){
        console.error("Error loading top rated reviews:",error);
      }

    }
  }

}
</script>

<template>

</template>

<style scoped>

</style>