import Vue from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

if (process.client) {
  Vue.use(Toast);
}

const ToasterService = {
  success(message) {
    if (process.client) {
      Vue.$toast.success(message);
    }
  },
  error(message) {
    if (process.client) {
      Vue.$toast.error(message);
    }
  },
  info(message) {
    if (process.client) {
      Vue.$toast.info(message);
    }
  },
  warning(message) {
    if (process.client) {
      Vue.$toast.warning(message);
    }
  },
};

export default ToasterService;
