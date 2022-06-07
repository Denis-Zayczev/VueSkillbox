/* eslint-disable max-len */
<template>
  <component :is="currentPageComponent" :page-params="curentPageParams"  @gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)"/>
</template>

<script>
import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  data() {
    return {
      currentPage: 'main',
      curentPageParams: {},
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.curentPageParams = pageParams || {};
    },
  },
  components: {
    MainPage, ProductPage, NotFoundPage,
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFounPage';
    },
  },
};
</script>
