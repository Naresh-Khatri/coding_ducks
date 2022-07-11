<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-dark text-bold">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          style="z-index: 10000"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-body1"> Playground </q-toolbar-title>

        <div><q-icon style="text-white" name="user" /></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="true" v-model="leftDrawerOpen" show-if-above bordered dark>
      <q-item-label header> user profile </q-item-label>
      <div class="flex flex-center">
        <q-btn
          label="create"
          icon="add"
          flat
          class="bg-primary text-white rounded"
          style="width: 80%; height: 3px"
        />
      </div>
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="flex items-center">
              <q-icon name="code" class="q-mr-sm" />
              <span>Hello world</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="flex items-center">
              <q-icon name="code" class="q-mr-sm" />
              <span>Swaping</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="flex items-center">
              <q-icon name="code" class="q-mr-sm" />
              <span>for loop</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="flex items-center">
              <q-icon name="code" class="q-mr-sm" />
              <span>FizzBuzz</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        /> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
