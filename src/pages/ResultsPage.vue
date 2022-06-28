<template>
  <div class="q-ma-xl flex flex-center">
    <q-table
      title="Results"
      :rows="rows"
      :columns="columns"
      row-key="name"
      style="width: 1000px"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="profile" :props="props">
            <q-img
              style="width: 60px; border-radius: 50%"
              :src="props.row.photoURL"
            />
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.username }}
          </q-td>
          <q-td key="roll" :props="props">
            <q-badge color="accent">
              {{ props.row.roll }}
            </q-badge>
          </q-td>
          <q-td key="marks" :props="props">
            <q-badge color="green">
              {{ props.row.totalMarks }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

const $q = useQuasar();

const columns = ref([
  {
    name: "profile",
    label: "Photo",
    sortable: true,
  },
  {
    name: "name",
    label: "Name",
    field: "name",
    sortable: true,
  },
  { name: "roll", label: "Roll No.", field: "roll", sortable: true },
  { name: "marks", label: "Marks", field: "marks", sortable: true },
]);
const rows = ref([]);

onMounted(() => {
  api.get("/results").then((res) => {
    rows.value = res.data;
  });
});
</script>
