<script setup>
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const props = defineProps({
    annData: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true
    }
})
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
    return `${newDate.toLocaleDateString("en-GB", options).replace(/,/gi, '') +
    ", " +
    newDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})

    }`;
};
const deleteAnnouncement = async (id) => {
    if (
        confirm("Are you sure you want to delete this announcement?") === false
    ) {
        return;
    }

    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}announcements/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );
        if (response.status === 200) {
            alert("Announcement deleted")
            window.location.reload()
        } else if (response.status === 404 || response.status === 400) {
            console.log("404")
            alert("The request page is not available")
        } else {
            console.log("Something went wrong")
        }
    } catch (err) {
        console.log(err)
    }
}
const padStart = (number, length) => {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}
const checkAdmin = computed(() => {
    return route.path.includes('admin')
})
const role = computed(() => {
    return checkAdmin.value ? 'admin' : 'user'
})
const seeDetail = (env) => {
    console.log(checkAdmin.value)

    if (checkAdmin.value) {
        env.preventDefault()
    } else {
        router.push({name: `${role.value}announcementdetail`, params: {id: `${props.annData.id}`}})
    }
}
</script>

<template>
    <div class="my-2 text-xl font-semibold ann-item max-w-full" @click="seeDetail">
        <div
                class="flex flex-col p-2 m-auto rounded-md min-h-20 bg-black2Cus md:min-w-fit md:flex-row md:max-w-2xl xl:max-w-none ">

            <div class="flex flex-row  flex-grow">
                <div class="flex items-center justify-center w-16 my-auto font-semibold break-all border-r-2">
                    {{ padStart(index + 1, 2) }}
                </div>
                <div class="flex flex-grow overflow-hidden">
                    <div class="w-52 xl:1/2 pt-1 my-auto ">
                        <p
                                class="pl-2 my-auto text-left ann-title hover:animate-marquee  whitespace-nowrap max-h-16">
                            {{ annData.announcementTitle }}</p>
                    </div>
                </div>
                <div
                        class=" bg-[#25B881] w-24 px-2 h-6 text-sm my-auto ml-2  font-normal rounded-lg py-1 ann-category ">
                    {{ annData.announcementCategory }}
                </div>
            </div>
            <div class="flex flex-col w-64 md:ml-20 ">
                <div class="text-left">
                    <p class="pt-1 text-[#545454] text-m ann-publish-date">
                        Publishdate: {{
                        changeTime(annData.publishDate) !== null ? changeTime(annData.publishDate) : '-'
                        }}
                    </p>
                    <p class="pt-1 text-[#545454] text-m  ann-close-date">
                        Close Date: {{ changeTime(annData.closeDate) !== null ? changeTime(annData.closeDate) : '-' }}
                    </p>
                </div>
            </div>
            <div class="flex flex-row">
                <div :class="annData.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'"
                     class="flex justify-center w-10 m-auto text-sm text-center text-white bg-green-500 rounded-lg ann-display">
                    {{ annData.announcementDisplay }}

                </div>
                <div class="my-auto w-24">views: {{ annData.viewCount }}</div>
                <div v-show="checkAdmin" class="flex flex-row m-auto md:flex-col ">
                    <button class="px-2 py-1 ml-2 text-sm font-medium rounded-lg hover:bg-green-500 ann-button"
                            @click="$router.push({ name: `${role}announcementdetail`, params: { id: annData.id } })">
                        view
                    </button>
                    <button class="px-2 py-1 ml-2 text-sm font-medium rounded-lg hover:bg-red-500 ann-button"
                            @click="deleteAnnouncement(annData.id)">delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>