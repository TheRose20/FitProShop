<script setup lang="ts">
import { reactive } from 'vue';
import useProducts from '../../../composables/useProducts';


const products = useProducts();

const newProduct = reactive({
    name: "" as string,
    description: "" as string,
    price: 100 as number,
    picture: "" as string, //image URL
    gender: "Уни" as string
})

function addBasket(productItem, userId) {
  useProducts().addInBasket(productItem, userId)
  local.modalShow = true
  local.modalType = 'addBasket'
  setTimeout(() => {
    local.modalShow = false;
  }, 5000);
}

// Fun start here
function ChangePrice(increaseDecraeseValue: number) {
    newProduct.price += increaseDecraeseValue;
}
</script>

<template>
    <h2>Add product</h2>
    
    <div class="container-column">
        <div class="container center">
            <label for="name">Название</label>
            <input name="name" type="text" v-model="newProduct.name">

            <label for="description">Описание</label>
            <textarea name="description" type="textbox" v-model="newProduct.description"></textarea>

            <label for="price">Price</label>
            <input name="price" type="number" @wheel="ChangePrice(10)" v-model="newProduct.price">

            <label for="sex">Гендер</label>
            <select v-model="newProduct.gender" name="sex">
                <option value="Уни">Унисекс</option>
                <option value="Муж">Муржское</option>
                <option value="Жен">Женское</option>
            </select>

            <br>

            <label for="image URL">Ссылка на изображение</label>
            <input name="image URL" type="text" v-model="newProduct.picture">
            <img :src="newProduct.picture">
        </div>
        <button @click="products.AddNewProduct(newProduct)">Add</button>
    </div>
    <!-- TODO preview card with image -->

</template>

<style scoped>
    @import './style.css';

    textarea{
        height: 50px;
        max-width: 290px;
        resize: vertical;
        background-color: #cecece;
    }
    .container-column {
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    button:hover{
        transition: 100ms;
        background-color: black;
        color: white;
        font-weight: bold;
    }
    .center {
        align-self: center;
    }
</style>