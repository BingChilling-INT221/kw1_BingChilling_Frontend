<script setup>
import { onMounted, ref } from "vue";
import { useRoute ,useRouter} from "vue-router";
const queryAnnounce = ref({});
const route = useRoute();
const router = useRouter();
const status_ok = ref(false);
onMounted(async () => {
  try {
    const result = await fetch(
      `${import.meta.env.VITE_BASE_URL}/${route.params.id}`
    );
    console.log(result);
    if (result.status === 200) {
      status_ok.value = true;
      const response = await result.json();
      queryAnnounce.value = response;
      console.log(queryAnnounce.value);
    }
    else if (result.status === 404 || result.status === 400) {
      alert("The requested page is not available!")
      router.push(`/admin/announcement/`)
    }
  } catch (err) {
    console.log("fetch failed")
    console.log(err);
  }
});

const changeTime = (time) => {
  if (time === null) {
    return "-"
  }
  const newDate = new Date(time);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return `${newDate.toLocaleDateString("en-GB", options).replace(/[,]/gi, '') +
    ", " +
    newDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

    }`;
};


</script>
 
<template>
  <div class="mx-[2%] w-[96%]" v-show="status_ok === true">
    <p class="text-black text-3xl font-bold py-5">Announcement Detail:</p>
    <div class="border-2 flex flex-row space-x-5 p-5">
      <div class="font-bold flex flex-col space-y-5">
        <p>Title</p>
        <p>Category</p>
        <p>Description</p>
        <p>Publish Date</p>
        <p>Close Date</p>
        <p>Display</p>
      </div>
      <div class="flex flex-col space-y-5">
        <p>{{ queryAnnounce.announcementTitle }}</p>
        <p>{{ queryAnnounce.announcementCategory }}</p>
        <p>{{ queryAnnounce.announcementDescription }}</p>
        <p>{{ changeTime(queryAnnounce.publishDate) }}</p>
        <p>{{ changeTime(queryAnnounce.closeDate) }}</p>
        <p>{{ queryAnnounce.announcementDisplay }}</p>
      </div>
    </div>
    <div class="py-5">
      <button class="bg-gray-300 px-4 py-1 rounded-md " @click="$router.back()">Back</button>
    </div>
  </div>
</template>
 
<style scoped></style>