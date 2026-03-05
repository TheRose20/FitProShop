<!-- Основная страница, использующаяся на каждой странице (шапка и подвал) -->

<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';

const route = useRoute()
const router = useRouter()

import { computed, ref } from 'vue';
import useUsers from '../composables/useUsers';

const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;

// Получение активного пользователя через computed
const userActive = computed(() => {
	// Проверяем, если индекс пользователя существует, то возвращаем его данные
	return usersAll.value[userActiveId.value] || null;
});

// Часть с меню-бургером
const isMenuOpen = ref(false)

function toggleMenu() {
	isMenuOpen.value = true
}

function noToggleMenu() {
	isMenuOpen.value = false
}

</script>


<template>
	<!-- Шапка сайта -->
	<header class="stickyHeader">
		<!-- Логотип — клик возвращает на первую страницу -->
		<div class="logotip">
			<img @click="router.push({ name: 'index' })" class="logoImg" src="/src/img/logotip.png" alt="logotipe">
		</div>

		<!-- Навигационное меню -->
		<!-- Кнопка бургера (меню для адаптации) -->
		<button class="burger" @click="toggleMenu">
			<span class="burger-line"></span>
			<span class="burger-line"></span>
			<span class="burger-line"></span>
		</button>
		<!-- Меню для ПК -->
		<nav class="nav" :class="{ open: isMenuOpen }">
			<!-- Кнопки навигации с подсветкой активной страницы -->
			<RouterLink :to="{ name: 'index' }" class="navBtnRoute">
				<button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/' }"
					@click="noToggleMenu">Главная</button>
			</RouterLink>

			<RouterLink :to="{ name: 'catalog' }" class="navBtnRoute" @click="noToggleMenu">
				<button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/catalog' }">Каталог</button>
			</RouterLink>

			<RouterLink :to="{ name: 'sale' }" class="navBtnRoute" @click="noToggleMenu">
				<button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/sale' }">Акции</button>
			</RouterLink>

			<RouterLink :to="{ name: 'about' }" class="navBtnRoute" @click="noToggleMenu">
				<button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/about' }">О нас</button>
			</RouterLink>

			<RouterLink :to="{ name: 'contacts' }" class="navBtnRoute" @click="noToggleMenu">
				<button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/contacts' }">Контакты</button>
			</RouterLink>

			<RouterLink :to="{ name: 'FAQ' }" class="navBtnRoute" @click="noToggleMenu">
				<button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/FAQ' }">FAQ</button>
			</RouterLink>

			<!-- TODO v-if authorization only -->
			<RouterLink :to="{ name: 'basket' }" class="navBtnRoute" @click="noToggleMenu">
				<button class="navBtn" :class="{ 'activePage': route.path === '/FitProShop/basket' }">Корзина</button>
			</RouterLink>

			<!-- Кабинет: выделяем активной любую из 3х вложенных страниц -->
			<RouterLink :to="{ name: 'accountData' }" class="navBtnRoute" @click="noToggleMenu">
				<button class="navBtn"
					:class="{ 'activePage': (route.path === '/FitProShop/account/accountData' || route.path === '/FitProShop/account/accountFav' || route.path === '/FitProShop/account/accountOrder') }">Кабинет</button>
			</RouterLink>

			<RouterLink v-if="(userActive && userActive?.role !== 'Пользователь')" :to="{ name: 'usersList' }"
				class="navBtnRoute" @click="noToggleMenu">
				<button class="navBtn"
					:class="{ 'activePage': (route.path === '/FitProShop/admin' || route.path === '/FitProShop/admin/usersList' || route.path === '/FitProShop/admin/addProduct') }">Админская</button>
			</RouterLink>
		</nav>
	</header>

	<!-- Основная часть и футер -->
	<div class="container">
		<main class="main">
			<!-- Контент текущей страницы -->
			<RouterView />
		</main>

		<!-- Подвал сайта -->
		<footer>
			<div class="footer">
				<!-- Контактный Email -->
				<div class="mail">
					<a href="mailto:fitproshop@mail.ru">fitproshop@mail.ru</a>
				</div>

				<!-- Социальные сети -->
				<div class="social">
					<a href="https://www.instagram.com/fit_pro_gorillawear/">
						<img class="iconSoc" src="/src/img/instagram.png" alt="Instagram">
					</a>
					<a href="https://t.me/fitprogorillawear">
						<img class="iconSoc" src="/src/img/telegram.png" alt="Telegram">
					</a>
					<a href="https://vk.com/fitproshop">
						<img class="iconSoc" src="/src/img/vk.png" alt="VK">
					</a>
				</div>

				<!-- Быстрая навигация по сайту -->
				<div class="navFooter">
					<button class="navFooterElem">
						<RouterLink :to="{ name: 'catalog' }">Каталог</RouterLink>
					</button>
					<button class="navFooterElem">
						<RouterLink :to="{ name: 'contacts' }">Контакты</RouterLink>
					</button>
					<button class="navFooterElem">
						<RouterLink :to="{ name: 'FAQ' }">FAQ</RouterLink>
					</button>
					<button class="navFooterElem">
						<RouterLink :to="{ name: 'documents' }">Документы</RouterLink>
					</button>
				</div>
			</div>

			<!-- Юридическая приписка -->
			<div class="security">© Все права защищены, 2025 год</div>
		</footer>
	</div>
</template>


<style scoped>
/* Стили для шапки сайта (header) */
header {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	position: sticky;
}

/* Выделение активной кнопки навигации */
.activePage {
	font-weight: bold;
}

/* Обёртка всей шапки */
.stickyHeader {
	position: sticky;
	top: 0;
	z-index: 1000;
	background-color: var(--black);
}

/* Общие стили для всех ссылок */
a {
	font-size: 1.2rem;
	color: var(--white);
}

/* Блок логотипа с чёрным фоном */
.logotip {
	background-color: var(--black);
	width: 100%;
}

/* Картинка логотипа по центру с отступом */
.logoImg {
	display: block;
	margin-left: auto;
	margin-right: auto;
	padding: 1rem;
	cursor: pointer;
}

/* Навигационное меню */
.nav {
	display: flex;
	justify-content: space-around;
	width: 100%;
	background-color: var(--red);
}

/* Кнопки навигации (внутри RouterLink) */
.navBtn {
	width: 100%;
	border: none;
	color: var(--white);
	padding: 15px;
	font-size: 1.15rem;
	border-radius: 0;
	height: auto;
	filter: none;
}

/* Основной контейнер сайта */
.container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

/* Контентный блок (main) */
.main {
	height: 100%;
}

/* Подвал сайта (footer) */
footer {
	background-color: var(--black);
	color: var(--white);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: auto;
}

/* Сетка внутри футера: почта, соцсети, навигация */
.footer {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 100%;
	padding-bottom: 1rem;
	align-items: center;
}

/* Центрирование почты */
.mail {
	display: block;
	margin-left: auto;
	margin-right: auto;
}

/* Соцсети */
.social {
	display: flex;
	justify-content: center;
	align-items: center;
}

/* Иконки соцсетей */
.iconSoc {
	height: 3rem;
	padding-inline: 1rem;
}

/* Кнопки навигации в футере */
.navFooterElem {
	display: flex;
	flex-direction: column;
	background-color: var(--black);
	border: none;
	color: var(--white);
	padding: 15px;
	font-size: 1rem;
	border-radius: 0;
	height: auto;
	filter: none;
	width: 10rem;
	height: 2rem;
}

/* Кнопка бургер-меню */
.burger {
	display: none;
	flex-direction: column;
	justify-content: space-between;
	width: 25px;
	height: 20px;
	margin: 10px;
	background: none;
	border: none;
	cursor: pointer;
}

/* Линии для бургер-меню */
.burger-line {
	width: 100%;
	height: 3px;
	background-color: var(--red);
}

/* Показывать бургер на узких экранах */
@media (max-width: 768px) {
	.burger {
		display: flex;
		position: absolute;
		right: 1rem;
		top: 1rem;
		z-index: 1100;
	}

	.nav {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background-color: var(--red);
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		max-height: 0;
		transition: max-height 0.3s ease-in-out;
	}

	.nav.open {
		max-height: 500px;
	}

	.navBtnRoute {
		width: 100%;
		text-align: center;
	}

	.navBtn {
		width: 100%;
	}

	.footer {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 1rem;
		width: 90%;
		padding-bottom: 1rem;
		align-items: center;
	}

	.footer div {
		margin: 1rem;
	}
}
</style>
