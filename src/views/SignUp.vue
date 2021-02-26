<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Регистрация</h1>

    <div class="form-control" :class="{invalid: eError}">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur">
      <small v-if="eError">{{eError}}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting">Зарегистрироваться</button>
    <router-link to="/auth">Авторизоваться</router-link>
  </form>
</template>

<script>
import {useAuthForm} from "@/use/auth-form";

export default {
  setup() {
    return {
      ...useAuthForm('signUp')
    }
  }
}
</script>

<style scoped>

</style>
