<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: nError}">
      <label for="name">ФИО</label>
      <input type="text" id="name" name="name" v-model="name" @blur="nBlur">
      <small v-if="nError">{{ nError }}</small>
    </div>

    <div class="form-control" :class="{invalid: tError}">
      <label for="tel">Телефон</label>
      <input type="text" id="tel" name="tel" v-model="tel" @blur="tBlur">
      <small v-if="tError">{{ tError }}</small>
    </div>

    <div class="form-control" :class="{invalid: aError}">
      <label for="amount">Сумма</label>
      <input type="number" id="amount" name="amount" v-model.number="amount" @blur="aBlur">
      <small v-if="aError">{{ aError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" name="status" v-model="status" @blur="">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import {useRequestForm} from '../../use/request-form';
import {useStore} from "vuex";

export default {
  emits: ['created'],
  setup(_, {emit}) {

    const store = useStore();

    const submit = async values => {
      await store.dispatch('request/create', values);
      emit('created');
    }

    return {
      ...useRequestForm(submit),
    }
  }

}
</script>
