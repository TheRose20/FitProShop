<!-- Страница с избранным пользователя -->

<script setup>

import useProducts from '../../composables/useProducts';
import cards from '../cards.vue';

const productFav = useProducts().favoriteLocalStorage.value

import { computed } from 'vue';
import useUsers from '../../composables/useUsers';
import { useRouter } from 'vue-router';


const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;
const router = useRouter()

// Получение активного пользователя через computed
const userActive = computed(() => {
  // Проверяем, если индекс пользователя существует, то возвращаем его данные
  return usersAll.value[userActiveId.value] || null;
});

// Проверка, чтобы на страницу мог зайти только авторизированный пользователь
if (!userActive.value) {
  router.push({ name: 'authorization' });
}

// Получение массива избранного.
// Если нет активного пользователя --> возвращает пустой массив. 
// Иначе --> из массива products проходимся по элементам. Если id пользователя и id активного пользователя совпадают --> Добавляем в массив товар
const massFav = computed(() => {
  const result = [];
  if (!userActive.value) {
    return result;
  } else {
    productFav.forEach(item => {
      if (item.userId === userActive.value.id) {
        result.push(item.productData);
      }
    });
    return result;
  }
});

</script>



<template>

  <!-- Если пользователь авторизован -->
  <div v-if="userActive">
    <h3>Избранное</h3>
    <!-- Вывод карточек товаров -->
    <cards v-if='userActive.value?.id === productFav.value?.user_id' :propsList="massFav" />

  </div>
  <!-- Если пользователь НЕ авторизован -->
  <div class="classNotAuth" v-else>
    <!-- <h2>Вход в личный кабинет</h2> -->
    <p>Вы ещё не авторизовались</p>
    <br>
    <p>Чтобы зайти в личный кабинет необходимо
      <RouterLink class="bold" :to="{ name: 'authorization' }">Войти</RouterLink>
      или
      <RouterLink class="bold" :to="{ name: 'registration' }">Зарегистрироваться</RouterLink>

    </p>



  </div>

</template>




<style scoped>
/* Заголовок страницы с данными пользователя */
h3 {
  font-family: 'ShriftMontserratLight';
  text-align: left;
  margin-left: 5rem;
  margin-block: 2rem;
}

/* Блок для отображения информации, когда пользователь не авторизован */
.classNotAuth {
  margin: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Класс для выделения текста жирным шрифтом */
.bold {
  font-weight: bold;
}
</style>
