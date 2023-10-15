<script setup>
import {fetchDeleteUser} from "@/services/userApi";

const props = defineProps({
  annItem: {
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

const deleteUser = async (id) => {
  if (
      confirm("Are you sure you want to delete this User?") === false
  ) {
    return;
  }
  try {
    const response = await fetchDeleteUser(id)
    if (response.status === 200) {
      alert("User deleted")
      window.location.reload()
    } else if (response.status === 404 || response.status === 400) {
      const errorResponse = await response.json();
      alert(errorResponse.message)
      window.location.reload()
    } else {
      const errorResponse = await response.json();
      // printError(errorResponse)
    }
  } catch (err) {
    console.log(err)
  }
}

</script>

<template>
  <!-- <div class="ann-item"> -->
  <!-- <tbody>
    <tr> -->
  <th class="py-4 px-6 whitespace-nowrap" scope="row">
    {{ index + 1 }}
  </th>
  <td class="py-4 px-6 ann-username">
    {{ annItem.username }}
  </td>
  <td class="py-4 px-6 ann-name">
    {{ annItem.name }}
  </td>
  <td class="py-4 px-6 ann-email">
    {{ annItem.email }}
  </td>
  <td class="py-4 px-6 ann-role">
    {{ annItem.role }}
  </td>
  <td class="py-4 px-6 ann-created-on">
    {{ changeTime(annItem.createdOn) }}
  </td>
  <td class="py-4 px-6 ann-updated-on">
    {{ changeTime(annItem.updatedOn) }}
  </td>
  <td class="py-4 px-6 text-right">
    <div class="inline-flex">
      <button class="px-4 py-2 rounded-l bg-gray-50 dark:bg-gray-700 ann-button" @click="
              $router.push({
                name: 'edituser',
                params: { id: annItem.id },
              })
            ">
        edit
      </button>
      <button class="px-4 py-2 rounded-r bg-gray-50 dark:bg-gray-700 ann-button" @click="deleteUser(annItem.id)">
        delete
      </button>
    </div>
  </td>

</template>

<style scoped></style>
