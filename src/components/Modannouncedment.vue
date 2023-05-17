<script setup>
import { computed, inject, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();



const props = defineProps(
    {
        updatePackage: {
            type: Object,
        }
    }
)
const updateCheck = ref(false)
watch(() => props.updatePackage, (newv) => {
    if (JSON.stringify(newv).length > 0) {
        updateCheck.value = true
        updateInit();
    } else {
        updateCheck.value = false
    }
})

const category = ref([])
const announcementTitle = ref("")
const categoryId = ref(Number)
const announcementDescription = ref("")
const publishDate = ref("")
const publishTime = ref("")
const closeDate = ref("")
const closeTime = ref("")
const announcementDisplay = ref("")
const router = useRouter()
const role = inject('role')
const test = ref("testtest")
watch(()=>props.updatePackage.announcementDescription ,(newC)=>{
    test.value = newC
})
const updateInit = () => {
    announcementTitle.value = props.updatePackage.announcementTitle
    categoryId.value = props.updatePackage.categoryId
    announcementDescription.value = props.updatePackage.announcementDescription
    publishDate.value = props.updatePackage.newPublishDate
    publishTime.value = props.updatePackage.newPublishTime
    closeDate.value = props.updatePackage.newCloseDate
    closeTime.value = props.updatePackage.newCloseTime
    announcementDisplay.value = props.updatePackage.announcementDisplay
}

const compObj = computed(() => {
    return {
        "announcementTitle": announcementTitle.value,
        "announcementDescription": announcementDescription.value,
        "newPublishDate": publishDate.value,
        "newPublishTime": publishTime.value,
        "newCloseDate": closeDate.value,
        "newCloseTime": closeTime.value,
        "announcementDisplay": announcementDisplay.value,
        "categoryId": categoryId.value
    }
})
let change = ref(false)
watch(() => compObj, () => {
    if (!updateCheck.value) return
    change.value = false
    for (const property in compObj.value) {
        if (compObj.value[property] !== props.updatePackage[property]) {
            change.value = true;
            break;
        }
    }
}, { deep: true })
onMounted(async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}categories`
        );
        if (response.status === 200) {
            category.value = await response.json();
            console.log(response);
            if (!updateCheck.value) {
                categoryId.value = category.value[0].categoryId
            }
        }
    } catch (err) {
        console.log(err);
    }
})


const publishDatePlusTime = computed(() => {
    if (!publishDate.value || !publishTime.value) return null
    return new Date(`${publishDate.value}T${publishTime.value}:00`).toISOString()
});


const closeDatePlusTime = computed(() => {
    if (!closeDate.value || !closeTime.value) return null
    return new Date(`${closeDate.value}T${closeTime.value}:00`).toISOString()
});
const checkDisableTime = (date) => {
    if (date === null) return true
    return date.length !== 10
}


const comeTime = ref(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }))
const comeDate = ref(new Date().toLocaleDateString("en-Us"))
const sixhour = new Date('August 19, 1975 00:00:00');
sixhour.setHours(sixhour.getHours() + 6);
const eighteenth = new Date('August 19, 1975 00:00:00');
eighteenth.setHours(eighteenth.getHours() + 18);

const compareDates = (d1, d2) => {
    if (!d1 || !d2) {
        return false;
    }
    console.log(d1, d2)
    const date1 = new Date(d1);
    date1.setHours(0, 0, 0, 0);
    const date2 = new Date(d2);
    date2.setHours(0, 0, 0, 0);
    console.log(date1, date2)
    return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
};
const compareTimes = (t1, t2) => {
    if (!t1 || !t2) {
        return false;
    }
    const date1 = new Date(`1970-01-01 ${t1}`);
    const date2 = new Date(`1970-01-01 ${t2}`);
    return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
};
const checkPublishDate = () => {
    if (!publishDate.value) {
        publishTime.value = null;
        return true;
    }
    if (publishDate.value.length > 10) {
        return false;
    }
    if (compareDates(publishDate.value, comeDate.value) < 0) {
        alert("Please enter a correct publish date.");
        return false;
    }
    return true;
};
const checkPublishTime = () => {
    if (!publishTime.value && publishDate.value) {
        publishTime.value = sixhour.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    }
    if (!publishTime.value) {
        return true;
    }
    if (publishTime.value.length > 5) {
        return false;
    }
    if (compareDates(publishDate.value, comeDate.value) === 0 && compareTimes(publishTime.value, comeTime.value) < 0) {
        alert("Please enter a correct publish time.");
        return false;
    }
    return true;
};
const checkCloseDate = () => {
    if (closeDate.value === null || closeDate.value === "") {
        closeTime.value = null;
        return true
    }
    if (closeDate.value.length > 10) return false
    if (publishDate.value !== null || publishDate.value !== "") {
        if ((compareDates(closeDate.value, publishDate.value) < 0)) {
            alert("Please enter correct date format close")
            return false
        }
    }
    return true
}
const checkCloseTime = () => {
    if ((closeTime.value === null || closeTime.value === "") && (closeDate.value !== null && closeDate.value !== "")) {
        closeTime.value = eighteenth.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
    }
    if (closeTime.value === null || closeTime.value === "") return true
    if (closeTime.value.length > 5) return false
    if (compareDates(closeDate.value, publishDate.value) === 0 && compareTimes(closeTime.value, publishTime.value) <= 0) {
        alert("Please enter correct time format close")
        return false
    }
    return true
}
const errm = ref();
const sendSubmit = async (event) => {
    if (!(checkPublishDate() && checkPublishTime() && checkCloseDate() && checkCloseTime())) {
        event.preventDefault();
        return
    }
    event.preventDefault();
    if (announcementDisplay.value) {
        announcementDisplay.value = "Y"
    } else {
        announcementDisplay.value = "N"
    }
    console.log(categoryId.value)
    const sendPackage = {
        announcementTitle: announcementTitle.value,
        announcementDescription: announcementDescription.value,
        announcementDisplay: announcementDisplay.value,
        categoryId: categoryId.value,
    }
    if (publishDatePlusTime.value !== null) sendPackage.publishDate = publishDatePlusTime.value
    if (closeDatePlusTime.value !== null) sendPackage.closeDate = closeDatePlusTime.value
    if (updateCheck.value) {
        try {
            console.log(JSON.stringify(sendPackage))
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}announcements/${route.params.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(sendPackage),
                }
            );
            if (response.status === 200) {
                alert("update announcement success")
                await router.push({ name: `${role}homepage` })
            } else {
                console.log(response)
                alert("update announcement fail")
                errm.value = response
            }
        } catch (err) {

            alert(err)
        }
    } else {
        try {
            console.log(JSON.stringify(sendPackage))
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}announcements`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(sendPackage),
                }
            );
            if (response.status === 200) {
                alert("Create announcement success")
                await router.push({ name: `${role}homepage` })
            } else {
                alert("Create announcement fail")
                console.log(response)
                alert(response)
                errm.value = response.errors
            }
        } catch (err) {
            alert(err)
        }
    }

}

const countTitleCharac = computed(() => {
    const maxLength = 200;
    return maxLength - (announcementTitle.value.length || 0);
});

const countDesCharac = computed(() => {
    const maxLength = 10000;
    return maxLength - (announcementDescription.value.length || 0);
});




</script>

<template>
    <div class="flex w-full ">
        <div class=" w-[80%] mx-[10%]   ">
            <div class="mt-5 text-white ">
                <button class="text-2xl font-bold ann-button " @click="$router.back()"><span>&lt;</span> Back</button>
                <p class="pt-5 text-5xl font-bold ">{{ updateCheck ? "Edit" : "Create " }} Announcement</p>
            </div>
            <div class="px-20 pt-10 pb-2 m-auto mt-5 bg-white border-2 rounded-lg text-purpleCustom1 ">
                <!-- <p class="text-2xl font-bold ">Announcement Detail:</p> -->
                <form action="" class="w-full" @submit="sendSubmit">
                    <div class="flex w-full">
                        <p class="w-1/4 py-2 text-2xl font-bold ">Title</p>
                        <input v-model="announcementTitle" class="w-3/4 ml-2 bg-gray-200 border-2 rounded-md ann-title"
                            required maxlength="200" type="text" />

                    </div>

                    <p class="flex justify-end">Remaining: {{ countTitleCharac }}</p>

                    <div class="flex w-full mt-2">
                        <p class="w-1/4 py-2 text-2xl font-bold">Category</p>
                        <select v-model="categoryId" class="w-3/4 ml-2 bg-gray-200 shadow-md shadow-slate-300 ann-category"
                            required>
                            <option v-for="(data) in category" :key="data.id" :value="data.categoryId">{{
                                data.categoryName
                            }}
                            </option>
                        </select>
                    </div>
                    <div class="flex w-full mt-6">
                        <p class="w-1/4 py-2 text-2xl font-bold">Publish Date</p>
                        <div class="flex w-3/4 space-x-4 ">
                            <input v-model="publishDate" :placeholder="'  ' + comeDate + ''"
                                class="w-1/4 py-1 ml-2 bg-gray-200 border-2 rounded-md ann-publish-date" type="date" />
                            <input v-model="publishTime" :class="checkDisableTime(publishDate) ? 'opacity-50' : ''"
                                :disabled="checkDisableTime(publishDate)" :placeholder="'  ' + comeTime + ''"
                                class="w-1/4 py-1 ml-2 bg-gray-200 border-2 rounded-md ann-publish-time" type="time" />
                        </div>
                    </div>
                    <div class="flex w-full mt-6">
                        <p class="w-1/4 py-2 text-2xl font-bold">Close Date</p>
                        <div class="flex w-3/4 space-x-4">
                            <input v-model="closeDate" :placeholder="'  ' + comeDate + ''"
                                class="w-1/4 py-1 ml-2 bg-gray-200 border-2 rounded-md ann-close-date" type="date" />
                            <input v-model="closeTime" :class="checkDisableTime(closeDate) ? 'opacity-50' : ''"
                                :disabled="checkDisableTime(closeDate)" :placeholder="'  ' + comeTime + ''"
                                class="w-1/4 py-1 ml-2 bg-gray-200 border-2 rounded-md ann-close-time" type="time" />
                        </div>
                    </div>
                    <div class="flex py-2 mt-5">
                        <p class="w-1/4 text-2xl font-bold ">Display</p>
                        <input v-model="announcementDisplay" class="w-[2%] ann-display" type="checkbox" />
                        <label class="m-auto ml-2"> Check to show this announcement</label>
                    </div>
                    <p class="py-2 mt-5 text-2xl font-bold ">Description</p>
                    <QuillEditor v-model:content="announcementDescription" contentType="html" class="w-full border-2 rounded-md ann-description"
                        required maxlength="10000" theme="snow" toolbar="full"  />
                    <p class="flex justify-end">Remaining: {{ countDesCharac }}</p>

                    <div class="flex justify-end py-5 space-x-2">
                        <button :class="change || !updateCheck ? '' : 'opacity-40'" :disabled="!change && updateCheck"
                            class="px-4 py-1 bg-gray-300 rounded-md ann-button submit">
                            {{ updateCheck ? "edit" : "submit" }}
                        </button>
                        <button class="px-4 py-1 bg-gray-300 rounded-md ann-button"
                            @click="$router.push({ name: `${role}homepage` })">
                            Cancel
                        </button>
                    </div>

                </form>

            </div>
        </div>

    </div>
</template>

<style scoped></style>
