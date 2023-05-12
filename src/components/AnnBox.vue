<script setup>
import {computed} from "vue";
import router from "@/router";

const role = computed(router.currentRoute.value.path.includes('admin') ? () => 'admin' : () => 'user')
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

</script>

<template>
    <div class="my-2">
        <div class="flex h-auto p-3 m-auto bg-white rounded-md lg:max-w-5xl lg:min-w-sm">
            <div class="text-black w-[8%] flex break-all items-center justify-center border-r-2 font-semibold ">
                No.{{ index + 1 }}
            </div>
            <div class="h-full pl-4 w-[92%]">
                <div class="flex justify-between font-bold">
                    <p class="w-4/5 pt-1 text-xl text-black break-words ann-title">{{ annData.announcementTitle }}</p>

                    <div class="">
                        <button class="px-2 py-1 ml-2 text-black rounded-lg hover:bg-green-500 hover:text-white ann-button"
                                @click="$router.push({name: `${role}announcementdetail`, params: {id: annData.id}})">
                            view
                        </button>
                        <button v-show="role === 'admin'"
                                class="px-2 py-1 ml-2 text-black rounded-lg hover:bg-red-500 hover:text-white ann-button"
                                @click="deleteAnnouncement(annData.id)">delete
                        </button>
                    </div>
                </div>
                <div class="flex mt-2">
                    <p class="pt-1 text-[#4E6FE2] font-bold ann-publish-date">
                        Publishdate: {{
                        changeTime(annData.publishDate) !== null ? changeTime(annData.publishDate) : '-'
                        }}
                    </p>
                    <p class="pl-20 pt-1 text-[#A649A2] font-bold ann-close-date">
                        Close Date: {{ changeTime(annData.closeDate) !== null ? changeTime(annData.closeDate) : '-' }}
                    </p>

                </div>
                <div class="flex justify-between mt-4">
                    <div
                            class="text-white bg-[#628FB8] px-5 text-sm rounded-lg py-1 ann-category"
                    >{{ annData.announcementCategory }}
                    </div>
                    <div
                            :class="annData.announcementDisplay === 'Y' ? 'bg-green-500' : 'bg-red-500'"
                            class="flex justify-center w-24 text-center text-white bg-green-500 rounded-lg ann-display"
                    >
                        {{ annData.announcementDisplay }}

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>