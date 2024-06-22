import Vue from 'vue';

const SpinnerService = new Vue({
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    show() {
      this.isLoading = true;
    },
    hide() {
      this.isLoading = false;
    },
  },
});

export default SpinnerService;
