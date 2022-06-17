<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :priceFrom.sync="filterPriceFrom" :priceTo.sync="filterPriceTo" :categoryId.sync="filterCategoryId"
        :filterColor.sync="filterColor" />
      <section class="catalog">
        <div v-if="productsLoading" class="preloader">
        <div class="preloader__container">
          <div class="preloader__circle"></div>
          <div class="preloader__circle"></div>
          </div>
          <h2>Загрузка...</h2>
        </div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров<button
            @click.prevent="loadProducts">Попробовать ещё раз</button></div>
        <ProductList :products="products" />
        <BasePagination v-model="page" :page="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import { API_BASE_URL } from '../config';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 5000,
      filterPriceTo: 35000,
      filterCategoryId: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      filterColor: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      })) : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            filterColorId: this.filterColor,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 2000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },

};
</script>

<style>
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.preloader .preloader__container {
  position: relative;
  width: 200px;
  height: 200px;
  animation: rotateBox 10s linear infinite;
}

@keyframes rotateBox {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.preloader .preloader__container .preloader__circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #38c1ff;
  border-radius: 50%;
  animation: animate 5s linear infinite;
}

@keyframes animate {
  0%{
    transform: scale(1);
    transform-origin: left;
  }
  50%{
    transform: scale(0);
    transform-origin: left;
  }
  50.01%{
    transform: scale(0);
    transform-origin: right;
  }
  100%{
    transform: scale(1);
    transform-origin: right;
  }
}

.preloader .preloader__container .preloader__circle:nth-child(2) {
  background-color: #ff3378;
  animation-delay: -2.5s;
}

.preloader h2{
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 4px;
  color: #444;
}
</style>
