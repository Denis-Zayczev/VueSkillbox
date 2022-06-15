<template>
  <div class="form__counter">
    <button type="button" @click="computedCounter--" aria-label="Убрать один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="computedCounter">

    <button type="button" @click="computedCounter++" aria-label="Добавить один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: {
    productAmount: Number,
  },
  computed: {
    computedCounter: {
      get() {
        return this.productAmount;
      },
      set(val) {
        this.$emit('update-count', val);
      },
    },
  },

};

</script>
