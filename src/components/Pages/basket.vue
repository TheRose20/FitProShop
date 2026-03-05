<script setup>
import { RouterView, useRouter } from 'vue-router';
import useProducts from '../../composables/useProducts';
import useUsers from '../../composables/useUsers';
import { computed } from 'vue';
import BadAuthorization from './SubModules/BadAuthorization.vue';

const products = useProducts().basketLocalStorage.value

// Получение активного пользователя через computed
const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;

const userActive = computed(() => {
  // Проверяем, если индекс пользователя существует, то возвращаем его данные
  return usersAll.value[userActiveId.value] || null;
});

// Получение массива корзины.
// Если нет активного пользователя --> возвращает пустой массив. 
// Иначе --> из массива products проходимся по элементам. Если id пользователя и id активного пользователя совпадают --> Добавляем в массив товар
const massBas = computed(() => {
  const result = [];
  if (!userActive.value) {
    return result;
  } else {
    products.forEach(item => {
      if (item.userId === userActive.value.id) {
        result.push(item.productData);
      }
    });
    return result;
  }
});

const router = useRouter()

// Вычисляем общую стоимость всех товаров в корзине
const totalCost = computed(() => {
  return massBas.value.reduce((sum, product) => {
    return sum + Number(product.price) * (product.count || 1);
  }, 0);
});

// Увеличение количества товара
function btnPlus(product) {
  const target = massBas.value.find(elem => elem.id === product.id);
  if (target) {
    target.count += 1;
  }
}

// Уменьшение количества товара
function btnMinus(product) {
  const target = massBas.value.find(elem => elem.id === product.id);
  if (target) {
    if (target.count > 1) {
      target.count -= 1;
    }
  }
}

// Функция для появления модального окна о подтвержении заказа
function orderFun() {
  router.push({ name: 'modalOrder' })
}

// Функция удаления товара из корзины
function deleteBasket(productItem, userId) {
  useProducts().deleteInBasket(productItem, userId)
}
</script>



<template>
  <h1>Корзина</h1>
  <div v-if="userActive">
    <div v-if="massBas.length !== 0">
      <table>
          <tbody>      
          <td class="th">Товар</td>
          <td class="th">Название</td>
          <td class="th">Стоимость</td>
          <td class="th">Количество</td>

          <!-- Перебираем все товары в корзине -->
          <template v-for="localProduct in massBas">
            <tr>
              <td>
                <RouterLink :to="{ name: 'productCard', params: { id: localProduct.id } }"><img class="product"
                    :src="localProduct.picture" alt=""></RouterLink>
              </td>
              <td>
                <RouterLink :to="{ name: 'productCard', params: { id: localProduct.id } }">{{ localProduct?.name }}
                </RouterLink>
              </td>
              <td>{{ localProduct?.price }} рублей</td>
              <td>
                <!-- Управление количеством товара -->
                <div class="countDiv">
                  <button v-if="localProduct?.count !== 1" class="btnCount" @click="btnMinus(localProduct)"><img
                      class="countBtnImg" src="/src/img/minus.png" alt=""
                      :class="{ 'zero': localProduct?.count === 1 }"></button>
                  <button v-else class="btnCount" @click="deleteBasket(localProduct, userActive?.id)"><img
                      class="countBtnImg" src="/src/img/bin_15470746.png" alt=""></button>
                  {{ localProduct?.count }}
                  <button class="btnCount" @click="btnPlus(localProduct)"><img class="countBtnImg"
                      src="/src/img/plus.png" alt=""></button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <!-- Отображение итоговой стоимости -->
      <div class="endCount">
        <p>Итого: </p>
        <p>{{ totalCost }} рублей</p>
      </div>
      <button @click="orderFun()" class="order">Заказать</button>
      <br>
      <RouterView></RouterView>
    </div>
    <div class="empty" v-if="massBas.length === 0">
      <h4>Сейчас здесь пусто( <br>Но вы можете добавить товары из <RouterLink class="bold" :to="{ name: 'catalog' }">
          Каталога</RouterLink>
      </h4>
    </div>
  </div>

  <!-- Если пользователь НЕ авторизован -->
  <div class="classNotAuth" v-else>
    <!-- <h2>Вход в личный кабинет</h2> -->
    <p>Вы ещё не авторизовались</p>
    <br>
    <BadAuthorization/>
  </div>
</template>




<style scoped>
/* Общие стили для таблицы */
table,
.th,
td {
  width: 80vw;
  height: 5rem;
  text-align: center;
  margin: auto;
  font-size: 1.1rem;
}

.th {
  font-weight: bold;
}

/* Изображение товара */
.product {
  width: 12rem;
}

/* Кнопка оформления заказа */
.order {
  margin-right: 14rem;
}

/* Блок с итоговой суммой */
.endCount {
  margin: 3rem;
  margin-right: 15rem;
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: flex-end;
}

/* Текст блока с итоговой суммой */
.endCount p {
  font-size: 1.2rem;
}

/* Контейнер управления количеством */
.countDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.2rem;
  align-items: center;
}

/* Кнопки + и - */
.btnCount {
  width: 1.8rem;
  height: 1.8rem;
  background-color: var(--white);
  filter: none;
  margin: 0;
}

/* Иконки кнопок */
.countBtnImg {
  width: 1.8rem;
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

/* Установка стиля тексту */
h4 {
  font-weight: normal;
}
</style>
