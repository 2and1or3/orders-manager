<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import {ref, computed, onMounted, watch} from 'vue';
import {useStore} from "vuex";
import AppPage from "@/components/ui/AppPage";
import RequestTable from "@/components/request/RequestTable";
import AppModal from "@/components/ui/AppModal";
import RequestModal from "@/components/request/RequestModal";
import AppLoader from "@/components/ui/AppLoader";
import RequestFilter from "@/components/request/RequestFilter";

export default {
  name: 'Home',
  components: {AppPage, RequestTable, AppModal, RequestModal, AppLoader, RequestFilter},
  setup() {
    const store = useStore();
    const modal = ref(false);
    const loading = ref(false);
    const filter = ref({});

    const requests = computed(() => store
        .getters['request/requests']
        .filter((r) => {
          if (filter.value.name) {
            return r.name.includes(filter.value.name);
          }

          return true;
        })
        .filter((r) => {
          if (filter.value.status) {
            return r.status === filter.value.status;
          }

          return true;
        }));

    onMounted(async () => {
      loading.value = true;
      await store.dispatch('request/load');
      loading.value = false;
    })

    return {
      modal,
      requests,
      loading,
      filter,
    }
  }
}
</script>
