<script setup lang="ts">
import useProducts from "../../../composables/useProducts";

const products = useProducts().productsLocalStorage.value;
const uProducts = useProducts();

// const usersAll = useUsers().usersLocalStorage;
// const userActiveId = useUsers().activityUserId;

// const userActive = computed(() => {
//   return usersAll.value[userActiveId.value] || null;
// });

// function methodName (arguments) {

// }
</script>

<template>
    <h2>ProductList</h2>
    <div class="main-container">
        <div class="container" v-for="product in products">
            <label for="name">Название</label>
            <input name="name" type="text" v-model="product.name">

            <label for="description">Описание</label>
            <input name="description" type="text" v-model="product.description">

            <label for="price">Price</label>
            <input name="price" type="number" v-model="product.price">

            <label for="image">Картинка</label>
            <select v-model="product.picture" name="image">
                <!-- Устанавливаем путь относительно хранилища -->
                <!-- В нашем случае useProducts.js -->
                <option value="https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/011.png">Сумка</option>
                <option value="https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/top1.jpg">Шорты</option>
                <option value="https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/90016509-gwear-pro-high-tops-red-black-2.png">Кросовок</option>
                <option value="https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/91877120-tracey-cropped-hoodie-beige-01.jpg">Толстовка</option>
                <option value="https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/91954800-colby-leggings-gray-9.png">Лосины</option>
                <option value="https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/99221188-gradient-water-bottle-green-orange-101.jpg">Бутылка</option>
                <option value="https://nixos.org/_astro/nixos-logo-default-gradient-black-regular-horizontal-none.BPpok6mb_1zvrCw.svg">NixOS</option>
                <option v-for="image in uProducts.imageURLs.value" :value="image.url">{{ image.name }}</option>
            </select>
            <img :src="product.picture">

            <button @click="uProducts.DeleteProduct(product)">Delete</button>
        </div>
    </div>
</template>

<style scoped>
    @import './style.css';
</style>