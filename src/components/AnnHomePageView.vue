<script setup>
import { computed, inject, onMounted, ref, watch } from "vue";
import AnnBox from "@/components/AnnBox.vue";
import { useAnnouncerStore } from "@/stores/announcer";
import { fetched_api, fetchCate } from "../api.js";
import Navbar from "./Navbar.vue";
import AnnBox2 from "./AnnBox2.vue";
import dateTimeBox from "./dateTimeBox.vue";
import timeZoneBox from "./timeZoneBox.vue";
import Pagination from "./Pagination.vue";
const store = useAnnouncerStore();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const role = inject("role");
const checkAdmin = () => {
  return role === "admin";
};

const announces = ref([]);
const data = ref({});
const category = ref([]);
const isOpen = computed(() => {
  return store.mode === "active";
});
const fetchCat = ref(false);
const fetchDate = ref(false);
const loading = computed(() => {
  return fetchCat.value && fetchDate.value;
});
const notFound = ref(false);
const wantPage = computed(() => {
  const newArray = [];
  const page = store.page + 1;
  const startLength = page - 9 > 1 ? page - 9 : 1;
  const endLength =
    startLength + 9 > data.value.totalPages
      ? data.value.totalPages
      : startLength + 9;

  for (let i = startLength; i <= endLength; i++) {
    newArray.push(i);
  }

  return newArray;
});

onMounted(async () => {
  try {
    const categoryResponse = await fetchCate();
    fetchCat.value = true;
    category.value = categoryResponse;
  } catch (err) {
    alert(err.message);
  }
  await fetched();
});

watch(
  () => store.category,
  async () => {
    await fetched();
  }
);

const fetches = async () => {
  if (!isOpen.value) {
    store.setMode("active");
    store.setPage(0);
  } else {
    store.setMode("close");
    store.setPage(0);
  }
  await fetched();
};

const fetched = async () => {
  const response = await fetched_api(
    role,
    store.category,
    store.mode,
    store.page,
    store.pageSize
  );
  if (response.status === 200) {
    fetchDate.value = true;
    data.value = await response.json();
    announces.value = data.value.content;
    if (announces.value.length === 0) {
      notFound.value = true;
    }
  } else {
    const errorResponse = await response.json();
    alert(errorResponse.message);
  }
};

const goToPreviousPage = () => {
  if (store.page > 0) {
    store.setPage(store.page - 1);
    fetched();
  }
};

const goToNextPage = () => {
  store.setPage(store.page + 1);
  fetched();
};
const clickPage = (page) => {
  store.setPage(page);
  fetched();
};
</script>

<template>
  <div class="w-full">
    <Navbar></Navbar>
    <dateTimeBox></dateTimeBox>
    <timeZoneBox></timeZoneBox>
    <div>Closed Announcement</div>
    <AnnBox2></AnnBox2>
    <Pagination></Pagination>
  </div>
</template>

<style scoped></style>
