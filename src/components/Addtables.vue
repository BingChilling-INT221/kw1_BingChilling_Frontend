<script setup>

</script>
 
<template>
    <div class="p-2 ">
<div class="border-2 m-auto p-4 rounded-lg">
<p class="text-black font-bold text-3xl">Announcement Detail: </p>
<form action="">
    <p class="text-black font-bold py-2">Title</p>
    <input type="text" class="border-2 rounded-md w-full py-1 ann-title">
    <p class="text-black font-bold py-2">Category</p>
    <select class="w-3/12 shadow-md shadow-slate-300 ann-category">
    <option value="ทั่วไป">ทั่วไป</option>
    <option value="ทุนการศึกษา">ทุนการศึกษา</option>
    <option value="หางาน">หางาน</option>
        <option value="ฝึกงาน">ฝึกงาน</option>
  </select>
  <p class="text-black font-bold py-2">Description</p>
  <textarea cols="100" rows="10" class="w-full border-2 rounded-md ann-description"></textarea>
  <p class="text-black font-bold py-2">Publish Date</p>
    <div class="flex space-x-4">
    <input type="text" class="border-2 rounded-md w-1/12 py-1 ann-publish-date" placeholder="  01/05/2023">
  <input type="text" class="border-2 rounded-md w-1/12 py-1 ann-publish-time" placeholder="  12:30">
  </div>
  <p class="text-black font-bold py-2">Close Date</p>
  <div class="flex space-x-4">
    <input type="text" class="border-2 rounded-md w-1/12 py-1 ann-close-date" placeholder="  01/05/2023">
  <input type="text" class="border-2 rounded-md w-1/12 py-1 ann-close-time" placeholder="  12:30">
  </div>
  <p class="text-black font-bold py-2">Display</p>
  <input type="checkbox" value="N">
  <label class="font-semibold">  Check to show this announcement</label>

  <div class="py-5 flex space-x-2">
      <button class="ann-button bg-gray-300 px-4 py-1 rounded-md">Submit</button>
      <button class="ann-button bg-gray-300 px-4 py-1 rounded-md">Cancel</button>
    </div>


</form>

</div>
    </div>

</template>
 
<style scoped>

</style>