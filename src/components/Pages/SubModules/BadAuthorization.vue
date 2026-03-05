
<template>
    <p>
      Чтобы зайти в личный кабинет необходимо
    </p>
    <p>
      <RouterLink class="bold" :to="{ name: 'authorization' }">Войти</RouterLink>
    </p>
    <p>
      или
    </p>
    <p>
      <RouterLink class="bold" :to="{ name: 'registration' }">Зарегистрироваться</RouterLink>
    </p>
</template>

<style lang="css" scoped>
.bold {
  font-weight: bold;
  color: brown;
}
</style>