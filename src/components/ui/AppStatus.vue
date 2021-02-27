<template>
  <span :class="['badge',  className]">{{ text }}</span>
</template>

<script>
import {ref, watch} from 'vue';

export default {
  props: ['type'],
  setup(props) {
    const classesMap = {
      active: 'primary',
      cancelled: 'danger',
      done: 'primary',
      pending: 'warning',
    };

    const textMap = {
      active: 'Активен',
      cancelled: 'Отменен',
      done: 'Завершен',
      pending: 'Выполняется',
    };

    const className = ref(classesMap[props.type]);
    const text = ref(textMap[props.type]);

    watch(props, val => {
      className.value = classesMap[val.type];
      text.value = textMap[val.type];
    })

    return {
      className,
      text,
    }
  }
}
</script>
