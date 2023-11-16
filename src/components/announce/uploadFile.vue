<script setup>
import placeHolderImage from '@/assets/images/placeholder.png'
import pdfPreviewValue from '@/assets/images/pdf-icon.png'
import textPreviewValue from '@/assets/images/text-icon.png'
import audioPreviewValue from '@/assets/images/music-icon.png'
import apkPreviewValue from '@/assets/images/apk-icon.png'
import zipPreviewValue from '@/assets/images/zip-icon.png'
import sqlPreviewValue from '@/assets/images/sql-icon.png'
import filePreviewValue from '@/assets/images/file-icon.png'
import {ref, watch} from 'vue'

const fileInput = ref(null)
const isUploading = ref(false)
const filesPreview = ref([])
const files = ref([])
const newFilesInput = ref(null)
const fileInputRefs = ref(null)
const accept = ref('')
const maxFile = 5;
const maxFileSize = 10 * 1024 * 1024; // 10MB
const selectFiles = () => {
  if (isUploading.value) {
    return;
  }
  const fileInputRef = newFilesInput.value instanceof HTMLInputElement ? newFilesInput.value : null;
  if (fileInputRef) {
    fileInputRef.click();
  }
};
const uploadDefaultImage = (event, index, action) => {

  console.log('uploadDefaultImage');
  console.log('k'+index);
  const files = event.target.files;
  
  for (let i = 0; i < files.length; i++) {
    try {
      if (files[i].size > maxFileSize) {
        alert('File size is too large. Max file size is 10MB.');
        continue;
      }
      if (i >= maxFile) {
        alert('Max file is 5');
        return
      }
      previewFile(files[i], index + i, action);
    } catch (error) {
      console.error('error : ', error);
    }
  }
};

const previewFile = (file, index, action) => {
  console.log('index : ', index);
  const reader = new FileReader();
  console.log('file : ', file);
  reader.onload = () => {
    const obj = {
      previewType: 'image',
      previewUrl: placeHolderImage,
      previewName: file.name,
      isDragging: false,
    };
    if (file.type.startsWith('image/')) {
      obj.previewUrl = reader.result;
    } else if (file.type === 'text/plain') {
      obj.previewUrl = textPreviewValue;
    } else if (file.type === 'application/pdf') {
      obj.previewUrl = pdfPreviewValue;
    } else if (file.type.startsWith('video/')) {
      obj.previewType = 'video';
      obj.previewUrl = URL.createObjectURL(file);
    } else if (file.type.startsWith('audio/')) {
      obj.previewUrl = audioPreviewValue;
    } else if (file.type === 'application/vnd.android.package-archive') {
      obj.previewUrl = apkPreviewValue;
    } else if (file.type === 'application/zip') {
      obj.previewUrl = zipPreviewValue;
    } else if (file.type === 'application/sql') {
      obj.previewUrl = sqlPreviewValue;
    } else {
      obj.previewUrl = filePreviewValue;
    }

    if (action === 'reset') {
      console.log('obj : ', obj);
      update(obj.previewType, obj.previewUrl, obj.previewName, obj.isDragging, index);
      files.value[index] = file;
    } else {
      add(obj.previewType, obj.previewUrl, obj.previewName, obj.isDragging);
      files.value.push(file);
    }
  };
  reader.onerror = (error) => {
    console.error(`Error reading file ${file.name}: ${error}`);
  };
  reader.readAsDataURL(file);
};
const add = (previewType, previewUrl, previewName, isDragging) => {
  filesPreview.value.push({
    previewType: previewType,
    previewUrl: previewUrl,
    previewName: previewName,
    isDragging: isDragging,
  });
};

const update = (previewType, previewUrl, previewName, isDragging, index) => {
  console.log('index : ', index);
  console.log('filesPreview.value[index] : ', filesPreview.value[index]);
  filesPreview.value[index].previewType = previewType;
  filesPreview.value[index].previewUrl = previewUrl;
  filesPreview.value[index].previewName = previewName;
  filesPreview.value[index].isDragging = isDragging;
};
const removeImg = (index) => {
  if (isUploading.value) {
    return;
  }
  filesPreview.value.splice(index, 1);
  files.value.splice(index, 1);
};
const handleDragOver = (event, index, action) => {
  if (isUploading.value) {
    return;
  }
  event.preventDefault();
  if (action === 'reset') {
    filesPreview.value[index].isDragging = true;
  } else {

  }
};

const handleDragLeave = (event, index, action) => {
  event.preventDefault();
  if (action === 'reset') {
    filesPreview.value[index].isDragging = false;
  } else {

  }
};
const selectFile = (index) => {
  if (isUploading.value) {
    return;
  }
  const fileInput = fileInputRefs.value[index]; // Removed the type assertion
  if (fileInput instanceof HTMLInputElement && fileInput !== null) {
    fileInput.click();
  }
};
const handleDrop = (event, index, action) => {
  if (isUploading.value) {
    return;
  }
  event.preventDefault();
  if (action === 'reset') {
    filesPreview.value[index].isDragging = false;
  } else {

  }
  const files = event.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    try {
        previewFile(files[i], index + i, action);
    } catch (error) {
      console.error('error : ', error);
    }
  }
};

</script>

<template>
  <div>
    <div v-for="(file, k) in filesPreview" :key="k" class="flex cursor-pointer"
      @click="selectFile(k)"
      @dragover.prevent="handleDragOver($event, k, 'reset')"
      @dragleave.prevent="handleDragLeave($event, k, 'reset')"
      @drop="handleDrop($event, k, 'reset')"
  >
          <input
              ref="fileInputRefs"
              :accept="accept"
              class="hidden"
              type="file"
              :disabled="filesPreview.length >= maxFile"
              @change="uploadDefaultImage($event, k, 'reset')"
          />
      <div v-if="file" class="m-5">
        <div class="flex justify-end">
        <button
            class="remove-btn bg-[#ccc] h-7 rounded-full dark:bg-stone-500 dark:text-white px-2.5 "
            type="button"
            @click="removeImg(k)"
        >
          x
        </button></div>
        <div class="w-full h-64">

          <img
              v-if="file.previewType != 'video'"
              :src="file.previewUrl"
              alt=""
              class="h-full w-full object-contain rounded-2xl"
          />
          <video v-else autoplay class="h-full w-full object-contain" loop>
            <source :src="file.previewUrl" type="video/mp4"/>
          </video>
        </div>
        <p class="flex items-center justify-center text-center w-full mt-5">
          {{ file ? file.previewName : '' }}
        </p>


      </div>
    </div>


    <div
        @click="selectFiles"
        @dragover.prevent="handleDragOver($event, filesPreview.length, 'add')"
        @drop="handleDrop($event, filesPreview.length, 'add')"
    >
        <label
            class="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            for="dropzone-file"
        >
        <input
            ref="fileInput"
            type="file"
            class="hidden"
            :accept="accept"
            @change="uploadDefaultImage($event, k, 'reset')"
            :disabled="filesPreview.length >= maxFile"
        />
        <svg
            aria-hidden="true"
            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 20 16"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
          />
        </svg>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>

    </label>   </div>
    <input
        ref="newFilesInput"
        :accept="accept"
        class="hidden"
        multiple
        type="file"
        @change="uploadDefaultImage($event, filesPreview.length, 'add')"
        :disabled="filesPreview.length >= maxFile"
    /></div>

</template>

<style scoped>

</style>