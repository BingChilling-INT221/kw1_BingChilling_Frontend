<script setup>
import { computed, inject, onMounted, ref } from "vue";
import AnnBox from "@/components/AnnBox.vue";
import { useAnnouncerStore } from "@/stores/announcer";

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

const wantPage = computed(() => {
    const newArray = [];
    const page = store.page + 1;
    const startLength = page - 9 > 1 ? page - 9 : 1;
    const endLength = startLength + 9 > data.value.totalPages ? data.value.totalPages : startLength + 9;

    for (let i = startLength; i <= endLength; i++) {
        newArray.push(i);
    }

    return newArray;
});


onMounted(async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`);
        if (response.status === 200) {
            fetchCat.value = true;
            category.value = await response.json();
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
});


onMounted(async () => {
    if (checkAdmin()) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}announcements`
            );

            if (response.status === 200) {
                fetchDate.value = true;
                announces.value = await response.json();
                if (announces.value.length === 0) {
                    notFound.value = true;
                }
            }
        } catch (err) {
            alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
            window.location.reload();
            console.log(err);
        }
    } else {
        await fetched();
    }
});
const fetches = async () => {
    if (!isOpen.value) {
        store.setMode("active");
        store.setPage(0)
    } else {
        store.setMode("close");
        store.setPage(0)
    }
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}announcements/pages?mode=${store.mode
            }&page=${store.page}&size=${store.pageSize}`
        );
        if (response.status === 200) {
            fetchDate.value = true;
            data.value = await response.json();
            announces.value = data.value.content;
            if (announces.value.length === 0) {
                notFound.value = true;
            }
        }
    } catch (err) {
        alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
        window.location.reload();
        console.log(err);
    }
};

const fetched = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}announcements/pages?mode=${store.mode
            }&page=${store.page}&size=${store.pageSize}`
        );

        if (response.status === 200) {
            fetchDate.value = true;

            data.value = await response.json();
            announces.value = data.value.content
            if (announces.value.length === 0) {
                notFound.value = true;
            }
        }
    } catch (err) {
        alert("ยังหาข้อมูลไม่พบโปรดรีเฟรชหน้าอีกครั้งครับ");
        window.location.reload();
        console.log(err);
    }
};


const goToPreviousPage = () => {
    if (store.page > 0) {
        store.setPage(store.page - 1);
        fetched()
    }
}

const goToNextPage = () => {
    store.setPage(store.page + 1);
    fetched()
}
const clickPage = (page) => {
    store.setPage(page);
    fetched()
}

</script>

<template>
    <div class="h-auto min-w-full min-h-screen pt-5 md:px-12 xl:px-36 md:pt-12">
        <p class="hidden m-auto text-4xl font-bold md:block"> <img src="../assets/annou.png" alt=""
                class="inline-block w-20 h-12 mr-4" />SIT Announcement System</p>
        <div class="flex w-1/3 m-auto text-2xl font-semibold text-center md:hidden">
            <img src="../assets/annou.png" alt="" class="w-20 h-12 mr-4" /><span class="m-auto">SAS</span>
        </div>
        <div v-if="!loading" class="absolute mt-2 mr-2 ">
            <svg class="w-20 h-20 bg-transparent border-2 border-transparent border-opacity-50 rounded-full animate-spin"
                style="border-right-color: white; border-top-color: white;" viewBox="0 0 24 24"></svg>
        </div>
        <div v-else class="flex flex-col pt-16 md:flex-row ">

            <div class="flex flex-col md:basis-4/6 ">
                <div class="flex flex-col lg:hidden basis-full ">
                    <div class="flex ">
                        <img src="../assets/1845948.png" alt="" class="w-6 h-6 my-auto md:hidden" />
                        <p class="h-8 py-1 my-auto text-xl font-normal"><span class="hidden md:inline-block"> Date/Time
                                shown in
                                Timezone:</span>{{
                                    timezone
                                }}</p>
                    </div>
                    <div class="flex">
                        <p class="my-auto text-xl ">Choose Category:</p>
                        <div class="">
                            <div class="flex font-normal ">
                                <p class="py-2 text-xl ">Category:</p>
                                <select v-model="store.category" class="pl-10 ml-2 text-black ann-category-filter select ">
                                    <option disabled selected value="">Pick category </option>
                                    <option v-for="(data) in category" :key="data.id" :value="data.category_Id"
                                        class="text-black">{{
                                            data.categoryName
                                        }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-10 lg:pt-0">
                    <p class="pl-5 text-2xl font-semibold md:max-h-16 md:min-h-16">Announcement</p>
                    <div v-if="!checkAdmin()" class="flex ">
                        <button class="px-2 py-1 rounded-md ann-button " @click="fetches()">
                            {{ isOpen ? 'Closed announments' : 'Active announments' }}
                        </button>
                        <div :class="isOpen ? 'bg-green-400' : 'bg-red-400'" class="w-3 h-3 m-auto rounded-full"></div>
                    </div>
                    <button v-else class="px-2 py-1 rounded-md bg-black2Cus hover:bg-black3Cus ann-button"
                        @click="$router.push({ name: 'addannouncement' })">Add
                        Announcement
                    </button>
                </div>

                <div class="min-w-full ">
                    <div class="flex flex-col justify-center text-center ">

                        <p v-if="announces.length <= 0" class="flex justify-center text-5xl text-center text-gray-400">
                            No Announcement
                        </p>
                        <div v-for="(announce, index) in announces " v-else class="h-auto">
                            <AnnBox :ann-data="announce" :index="(index + store.pageSize * store.page)"></AnnBox>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center py-5 text-2xl">
                    <div class="flex items-center space-x-2 ">
                        <button :disabled="data.first" @click="goToPreviousPage" v-if="data.totalPages !== 1"
                            class="ann-page-prev" :class="data.first ? 'opacity-25' : ''">
                            Prev
                        </button>
                        <ul class="flex flex-row space-x-2">
                            <li v-for="(pageNumber, index) in wantPage" :key="pageNumber"
                                :class="[{ 'text-red-500': store.page === pageNumber - 1 }, `ann-page-${index}`]"
                                @click="clickPage(pageNumber - 1)">
                                {{ pageNumber }}
                            </li>
                        </ul>
                        <button @click="goToNextPage" :disabled="data.last" class="ann-page-next"
                            :class="data.last ? 'opacity-25' : ''" v-if="data.totalPages !== 1">Next</button>
                    </div>
                </div>
            </div>
            <div class="hidden lg:pl-20 md:basis-1/2 lg:block">
                <p class="py-1 text-xl font-normal ">Date/Time shown in Timezone: <span class="font-normal">{{
                    timezone
                }}</span></p>
                <div class="flex font-normal ">
                    <p class="py-2 text-xl ">Category:</p>
                    <select v-model="store.category" class="pl-10 ml-2 text-black ann-category-filter select ">
                        <option disabled selected value="">Pick category </option>
                        <option v-for="(data) in category" :key="data.id" :value="data.category_Id" class="text-black">{{
                            data.categoryName
                        }}
                        </option>
                    </select>
                </div>

                <div>


                </div>
            </div>
        </div>

    </div>
</template>

<style scoped></style>
