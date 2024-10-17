<script>
import { ref, watch } from 'vue';

export default {
  name: "price-filter",
  components: {},
  props: {
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
    const minValue = ref(props.min);
    const maxValue = ref(props.max);
    const value = ref((minValue.value + maxValue.value) / 2);

    watch(value, (newValue) => {
      if (newValue < minValue.value) value.value = minValue.value;
      if (newValue > maxValue.value) value.value = maxValue.value;
    });

    return { minValue, maxValue, value };
  }
};
</script>

<template>
  <div style="width: 40rem; margin: 1rem;">
    <pv-card>
      <template #content>
        <h1>{{ $t('priceFilter.filterByPrice') }}</h1>

        <div style="margin: 1rem">
          <pv-input-text
              id="min-input"
              v-model.number="value[0]"
              :placeholder="$t('priceFilter.minValue')"
          />

          <pv-input-text
              id="max-input"
              v-model.number="value[1]"
              :placeholder="$t('priceFilter.maxValue')"
              style="margin-left: 1rem"
          />
        </div>

        <pv-slider
            v-model="value"
            range
            class="w-56"
            :min="0"
            :max="1000"
            style="margin: 1rem"
        />
      </template>
      <template #footer>
        <pv-button :label="$t('priceFilter.filter')"/>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
/* You can add custom styling here if necessary */
</style>