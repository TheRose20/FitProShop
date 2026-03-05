<!-- Страница с навигацией для разделов аккаунта -->

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import useUsers from '../../composables/useUsers';
import { useRouter } from 'vue-router';
import BadAuthorization from './SubModules/BadAuthorization.vue';

const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;
const router = useRouter()
const route = useRoute()

// Получение активного пользователя через computed
const userActive = computed(() => {
  // Проверяем, если индекс пользователя существует, то возвращаем его данные
  return usersAll.value[userActiveId.value] || null;
});

// Проверка, чтобы на страницу мог зайти только авторизированный пользователь
if (!userActive.value) {
  router.push({ name: 'account' });
}
</script>

<template>
  <h1>Личный кабинет</h1>
  <!-- Навигация, если пользователь активен -->
  <div v-if="userActive">
    <nav class="nav">
      <RouterLink :to="{ name: 'accountData' }" class="navBtnRouter">
        <button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/account/accountData' }">Данные</button>
      </RouterLink>
      <RouterLink :to="{ name: 'accountFav' }" class="navBtnRouter">
        <button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/account/accountFav' }">Избранное</button>
      </RouterLink>
      <RouterLink :to="{ name: 'modalAllOrders' }" class="navBtnRouter">
        <button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/account/modalAllOrders' }">Заказы</button>
      </RouterLink>
    </nav>
    <RouterView></RouterView>
  </div>
  <!-- Если пользователь НЕ авторизован -->
  <div class="classNotAuth" v-else>
    <p>Вы ещё не авторизовались</p>
    <br>
    <BadAuthorization/>
  </div>
</template>

<style scoped>
/* Контейнер для навигационных кнопок */
.nav {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

/* Стиль для кнопок навигации */
.navBtn {
  width: 100%;
  border: none;
  color: var(--white);
  padding: 15px;
  font-size: 1.15rem;
  border-radius: 0;
  height: auto;
  filter: none;
  background-color: var(--black);
}

/* Контейнер для ссылки, чтобы кнопка была ссылкой */
.navBtnRouter {
  width: 100%;
}

/* Ссылка внутри кнопки */
.navBtn a {
  color: var(--white);
}

/* Выделение активной кнопки навигации */
.activePage {
  font-weight: bold;
}

/* Блок для отображения информации, когда пользователь не авторизован */
.classNotAuth {
  margin: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
