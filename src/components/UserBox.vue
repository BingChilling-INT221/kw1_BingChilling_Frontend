<script setup>
import { fetchDeleteUser } from "../services/api.js";

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
    newDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })

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
      printError(errorResponse)
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
      <th scope="row" class="py-4 px-6 whitespace-nowrap">
        {{ index+1 }}
      </th>
      <td class="py-4 px-6 ann-username">
        {{ annItem.username}}
      </td>
      <td class="py-4 px-6 ann-name">
        {{ annItem.name}}
      </td>
      <td class="py-4 px-6 ann-email">
        {{ annItem.email}}
      </td>
      <td  class="py-4 px-6 ann-role">
        {{ annItem.role}}
      </td>
      <td class="py-4 px-6 ann-created-on">
        {{ changeTime(annItem.createdOn) }}
      </td>
      <td  class="py-4 px-6 ann-updated-on">
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
            Edit
          </button>
          <button class="px-4 py-2 rounded-r bg-gray-50 dark:bg-gray-700 ann-button" @click="deleteUser(annItem.id)">
            Delete
          </button>
        </div>
      </td>
    <!-- </tr>
    </tbody> -->
    
    <!-- <table class="w-full">
      
      <tbody>
        <tr>
          <td class="text-left">{{ annItem.id}}</td>
          <td class="text-left">{{annItem.username }}</td>
          <td class="">{{annItem.name}}</td>
          <td class="">{{ annItem.email }}</td>
          <td class="">{{ annItem.role }}</td>
          <td class="">{{ annItem.createdOn }}</td>
          <td class="">{{ annItem.updatedOn }}</td>
          <div class="flex flex-row space-x-3 my-a">
            <button class="px-4 py-1 rounded-md bg-gray-50 dark:bg-gray-700">
            Edit
          </button>
          <button class="px-4 py-1 rounded-md bg-gray-50 dark:bg-gray-700">
            Delete
          </button>
          </div>

        </tr>
      </tbody>
    </table> -->
  <!-- </div> -->

  <!-- <div class="w-full">
    <div class="w-full flex flex-col">
      <div class="flex flex-row space-y-5 w-full">
        <div class=" flex flex-col space-y-2 w-16 mt-5 break-words">
          <p>No.</p>
          <p>{{ index + 1 }} </p>
        </div>
        <div class=" flex flex-col space-y-2 w-36 break-words">
          <p>Username</p>
          <p>{{annItem.username }} </p>
        </div>
        <div class=" flex flex-col space-y-2 w-52 break-words">
          <p>Name</p>
          <p>{{ annItem.name }} </p>
        </div>
        <div class=" flex flex-col space-y-2 w-56 break-words">
          <p>Email</p>
           <p>{{ annItem.email }}</p>
        </div>
        <div class=" flex flex-col space-y-2 w-28 break-words">
          <p>Role</p>
         <p> {{ annItem.role }} </p>
        </div>
        <div class=" flex flex-col space-y-2 w-28 break-words">
          <p>CreatedOn</p>
           <p>{{ annItem.createdOn }}</p>
        </div>
        <div class=" flex flex-col space-y-2 w-28 break-words">
          <p>UpdatedOn</p>
           <p>{{ annItem.updatedOn }}</p>
        </div>
        <div class="space-x-3 pt-8">
            <button class="px-4 py-1 rounded-md bg-gray-50 dark:bg-gray-700">
            Edit
          </button>
          <button class="px-4 py-1 rounded-md bg-gray-50 dark:bg-gray-700">
            Delete
          </button>
          </div>
      </div> 
    
       
        
    </div>
  </div> -->
</template>

<style scoped></style>
