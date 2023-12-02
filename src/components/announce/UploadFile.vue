<script setup>

import {ref, watch, watchEffect} from 'vue'
import placeHolderImage from '@/assets/images/placeholder.png'
import pdfPreviewValue from '@/assets/images/pdf-icon.png'
import textPreviewValue from '@/assets/images/text-icon.png'
import audioPreviewValue from '@/assets/images/music-icon.png'
import apkPreviewValue from '@/assets/images/apk-icon.png'
import zipPreviewValue from '@/assets/images/zip-icon.png'
import sqlPreviewValue from '@/assets/images/sql-icon.png'
import filePreviewValue from '@/assets/images/file-icon.png'
import previewFileC from '@/components/announce/PreviewFile.vue'
const fileInput = ref(null)
const isUploading = ref(false)
const filesPreview = ref([])
const files = ref([])
const oldFiles = ref([])
const newFilesInput = ref(null)
const fileInputRefs = ref(null)
const accept = ref('')
const maxFile = 5;
const maxFileSize = 20 * 1024 * 1024; // 20MB
const props=defineProps(
    {
      preview: {
        type: Array,
        default: () => [],
      },
    }
)
const emit = defineEmits(['upload'])
watch(() => props.preview, (value) => {
  console.log('value : ', value);
  filesPreview.value = JSON.parse(JSON.stringify(value));
});
watch(()=>oldFiles,(value)=>{
  console.log('oldFiles : ', oldFiles);
  emit('upload',files.value, oldFiles.value)
}, {deep: true})
watch(()=>files,(value)=>{
  console.log('files : ', files);
  emit('upload',files.value, oldFiles.value)
}, {deep: true})
const selectFiles = () => {
  if (isUploading.value) {
    return;
  }
  const fileInputRef = newFilesInput.value instanceof HTMLInputElement ? newFilesInput.value : null;
  if (fileInputRef) {
    fileInputRef.click();
  }
};
const uploadDefault = (event, index, action) => {

  console.log('uploadDefaultImage');
  console.log('k' + index);
  const files = event.target.files;
  uploadFile(files,index,action)

};
const uploadFile =(files, index, action)=>{
  for (let i = 0; i < files.length; i++) {
    console.log('files[i] : ', files[i]);
    try {
      console.log('files[i].size : ', files[i].size);
      console.log('maxFileSize : ', maxFileSize);
      console.log('files[i].size > maxFileSize : ', files[i].size > maxFileSize);
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
}
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
    console.log('file.type : ', file.type);
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
    // console.log('obj : ', obj);
    if (action === 'reset') {
      console.log('obj : ', obj);
      if (filesPreview.value.every((item) => item.fileName !== obj.previewName)|| oldFiles.value.some((item) => item === obj.previewName)) {
        update(obj.previewType, obj.previewUrl, obj.previewName, obj.isDragging, index);
      }
      if (props.preview.every((item) => item.fileName !== obj.previewName)) {
        files.value[index] = file;
      }

      console.log('files.value : ', files.value);

    } else {
      if (filesPreview.value.every((item) => item.fileName !== obj.previewName)) {
        add(obj.previewType, obj.previewUrl, obj.previewName, obj.isDragging);
      }
      else {
        alert('File already exists')
        return
      }
      // add(obj.previewType, obj.previewUrl, obj.previewName, obj.isDragging);
      if (props.preview.every((item) => item.fileName !== obj.previewName) || oldFiles.value.some((item) => item === obj.previewName)) {
        files.value.push(file);
      }


    }
  };
  reader.onerror = (error) => {
    console.error(`Error reading file ${file.name}: ${error}`);
  };
  reader.readAsDataURL(file);
};
const add = (previewType, previewUrl, previewName, isDragging) => {
  console.log('add');
  // console.log('previewType : ', previewType);
  filesPreview.value.push({
    fileType: previewType,
    fileUrl: previewUrl,
    fileName: previewName,
  });
};

const update = (previewType, previewUrl, previewName, isDragging, index) => {
  console.log('index : ', index);
  if (props.preview[index].fileName === filesPreview.value[index].fileName) {
    oldFiles.value.push(filesPreview.value[index].fileName);
  }
  filesPreview.value[index].fileType = previewType;
  filesPreview.value[index].fileUrl = previewUrl;
  filesPreview.value[index].fileName = previewName;
};
const removeImg = (index) => {
  if (isUploading.value) {
    return;
  }
  console.log('index : ', index);
  console.log('filesPreview.value : ', filesPreview.value);
  // filesPreview.value.splice(index, 1);
  // console.log('filesPreview.value : ', filesPreview.value);
  if (props.preview.some((item) => item.fileName === filesPreview.value[index].fileName)) {
    oldFiles.value.push( filesPreview.value[index].fileName);
  }
  else {
  const indefinable = files.value.indexOf((item) => {
    console.log('item : ', item);
    console.log('filesPreview.value[index].fileName : ', filesPreview.value[index].fileName);
    console.log('item.name : ', item.name);
    return item.name === filesPreview.value[index].fileName;
  });
  files.value.splice(indefinable, 1);}
  console.log('files.value : ', files.value);
  filesPreview.value.splice(index, 1);
  // console.log('files.value : ', files.value);
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
  if (fileInput instanceof HTMLInputElement) {
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
  console.log('event.dataTransfer.files : ', event.dataTransfer.files);
  const files = event.dataTransfer.files;
  uploadFile(files,index,action)
};

</script>

<template>

  <div>
    <div class="text-amber">{{props.preview}}</div>
    <div class="text-amber">{{files}}</div>
    <div class="text-red">{{oldFiles}}</div>
<!--    <div class="text-blue">{{ filesPreview}}</div>-->
    <div v-for="(file, k) in filesPreview" :key="k" class="flex cursor-pointer"

    >
      <input
          ref="fileInputRefs"
          :accept="accept"
          :disabled="filesPreview.length -1 >= maxFile"
          class="hidden"
          type="file"
          @change="uploadDefault($event, k, 'reset')"
      />
      <div v-if="file" class="m-5">
        <div class="flex justify-end">
          <button
              class="remove-btn bg-[#ccc] h-7 rounded-full dark:bg-stone-500 dark:text-white px-2.5 "
              type="button"
              @click="removeImg(k)"
          >
            x
          </button>
        </div>
        {{file.fileType}}
        <preview-file-c :previewName="file.fileName" :previewType="file.fileType" :previewUrl="file.fileUrl" v-if="file"  @click="selectFile(k)"
                        @drop="handleDrop($event, k, 'reset')"
                        @dragover.prevent="handleDragOver($event, k, 'reset')"
                        @dragleave.prevent="handleDragLeave($event, k, 'reset')"/>
      </div>
    </div>


    <div
        v-if="filesPreview.length < maxFile"
        @click="selectFiles"
        @drop="handleDrop($event, filesPreview.length, 'add')"
        @dragover.prevent="handleDragOver($event, filesPreview.length, 'add')"
    >
      <label
          class="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          for="dropzone-file"
      >
        <input
            ref="fileInput"
            :accept="accept"
            :disabled="filesPreview.length-1 >= maxFile"
            class="hidden"
            type="file"
            @change="uploadDefault($event, k, 'reset')"
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
        <div class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>

      </label>
    <input
        ref="newFilesInput"
        :accept="accept"
        :disabled="filesPreview.length >= maxFile"
        class="hidden"
        multiple
        type="file"
        @change="uploadDefault($event, filesPreview.length, 'add')"
    /></div></div>

</template>

<style scoped>

</style>