<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
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
    return `${

        newDate.toLocaleDateString("en-GB", options).replace(/,/gi, '') +
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
</script>

<template>
    <div class="my-2 text-xl font-semibold">
        <div class="flex min-h-20 p-2 m-auto bg-black2Cus rounded-md  md:min-w-sm">
            <div class=" w-16 flex break-all items-center justify-center border-r-2 font-semibold ">
                {{ padStart(index + 1, 2) }}
            </div>
            <div class="w-40 pt-1 my-auto overflow-hidden">
                <p class="  break-words ann-title text-left pl-2 my-auto hover:animate-marquee hover:whitespace-nowrap max-h-16">
                    {{ annData.announcementTitle }}</p>
            </div>

            <div class=" bg-[#25B881] w-24 px-2 h-6 text-sm m-auto font-normal rounded-lg py-1 ann-category">
                {{ annData.announcementCategory }}
            </div>
            <div class="flex flex-col text-left w-64">
                <p class="pt-1 text-[#545454] text-m ann-publish-date">
                    Publishdate: {{
                    changeTime(annData.publishDate) !== null ? changeTime(annData.publishDate) : '-'
                    }}
                </p>
                <p class="pt-1 text-[#545454] text-m  ann-close-date">
                    Close Date: {{ changeTime(annData.closeDate) !== null ? changeTime(annData.closeDate) : '-' }}
                </p>
            </div>
            <div
                    :class="annData.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'"
                    class="flex justify-center w-10 m-auto text-center text-white bg-green-500 rounded-lg text-sm  ann-display"
            >
                {{ annData.announcementDisplay }}

            </div>


            <div class="flex flex-col m-auto">
                <button class="px-2 py-1 ml-2  rounded-lg hover:bg-green-500 font-medium text-sm  ann-button"
                        @click="$router.push({name: `${role}announcementdetail`, params: {id: annData.id}})">
                    view
                </button>
                <button v-show="checkAdmin"
                        class="px-2 py-1 ml-2  rounded-lg hover:bg-red-500 font-medium text-sm  ann-button"
                        @click="deleteAnnouncement(annData.id)">delete
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>