<script>
import { ref, watch } from 'vue';

export default {
  name: "price-filter",
  components: {},
  props: {
    // Props for default min and max values
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1000,
    }
  },
  setup(props) {
    // Define reactive values for minValue, maxValue, and current value
    const minValue = ref(props.min);
    const maxValue = ref(props.max);
    const value = ref((minValue.value + maxValue.value) / 2);

    // Watch the value to ensure it stays within the min and max bounds
    watch(value, (newValue) => {
      if (newValue < minValue.value) value.value = minValue.value;
      if (newValue > maxValue.value) value.value = maxValue.value;
    });

    // Return reactive variables to template
    return {minValue, maxValue, value};
  }
};
</script>

<template>
  <div style="width: 40rem; margin: 1rem;">
    <pv-card>
      <template #content>
        <h1> Filter By Price </h1>

        <div style="margin: 1rem">
          <pv-input-text
              id="min-input"
              v-model.number="value[0]"
              placeholder="Min Value"
          />


          <pv-input-text
              id="max-input"
              v-model.number="value[1]"
              placeholder="Max Value"
              style="margin-left: 1rem"
          />
        </div>


        <pv-slider
            v-model="value"
            range
            class="w-56"
            min="0"
            :max="1000"
            style="margin: 1rem"
        />

      </template>
      <template #footer>
        <pv-button label="Filter"/>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
/* You can add custom styling here if necessary */
</style>
