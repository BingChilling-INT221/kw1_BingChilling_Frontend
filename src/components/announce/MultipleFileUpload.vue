<script setup>
import placeHolderImage from '@/assets/images/placeholder.png'
import pdfPreviewValue from '@/assets/images/pdf-icon.png'
import textPreviewValue from '@/assets/images/text-icon.png'
import audioPreviewValue from '@/assets/images/music-icon.png'
import apkPreviewValue from '@/assets/images/apk-icon.png'
import zipPreviewValue from '@/assets/images/zip-icon.png'
import sqlPreviewValue from '@/assets/images/sql-icon.png'
import filePreviewValue from '@/assets/images/file-icon.png'

import {onMounted, ref} from 'vue'

const isDragging = ref(false)
const isUploading = ref(false)
const errorAlertVisible = ref(false)
const errorMessage = ref('Something went wrong')
const settingSavedSuccess = ref(false)
const filesPreview = ref([])
const files = ref([])
const newfilesInput = ref(null)
const props = defineProps({
  accept: {
    type: String
  },
  removeBtnText: {
    type: String,
    default: 'x'
  },
  uploadBtnText: {
    type: String,
    default: 'Upload'
  },
  progressBtnText: {
    type: String,
    default: 'Uploading...'
  },
  uploadedFiles: {
    type: Array,
    required: true,
    validator: (files) =>
        Array.isArray(files) &&
        files.every((file) =>
            typeof file === 'object' &&
            'fileType' in file &&
            'fileUrl' in file &&
            'fileName' in file
        )
  },
  callback: {
    type: Function,
    required: true
  },
  pdfPreview: {
    type: String,
    default: 'pdfPreviewValue' // ระบุค่า default ที่ต้องการ
  },
  textPreview: {
    type: String,
    default: 'textPreviewValue' // ระบุค่า default ที่ต้องการ
  },
  audioPreview: {
    type: String,
    default: 'audioPreviewValue' // ระบุค่า default ที่ต้องการ
  },
  apkPreview: {
    type: String,
    default: 'apkPreviewValue' // ระบุค่า default ที่ต้องการ
  },
  zipPreview: {
    type: String,
    default: 'zipPreviewValue' // ระบุค่า default ที่ต้องการ
  },
  sqlPreview: {
    type: String,
    default: 'sqlPreviewValue' // ระบุค่า default ที่ต้องการ
  },
  filePreview: {
    type: String,
    default: 'filePreviewValue' // ระบุค่า default ที่ต้องการ
  }
})
onMounted(() => {

  if (props.uploadedFiles) {
    for (let i = 0; i < props.uploadedFiles.length; i++) {
      filesPreview.value.push({
        previewType: props.uploadedFiles[i].fileType,
        previewUrl: props.uploadedFiles[i].fileUrl,
        previewName: props.uploadedFiles[i].fileName,
        isDragging: false,
      });
      files.value.push({
        fileType: props.uploadedFiles[i].fileType,
        fileUrl: props.uploadedFiles[i].fileUrl,
        fileName: props.uploadedFiles[i].fileName,
      });
    }
  }
});
const uploadingFunction = async () => {
  if (files.value.length > 0) {
    isUploading.value = true;
    await callback(files.value);
    filesPreview.value = [];
    files.value = [];
    if (props.uploadedFiles) {
      for (let i = 0; i < props.uploadedFiles.length; i++) {
        filesPreview.value.push({
          previewType: props.uploadedFiles[i].fileType,
          previewUrl: props.uploadedFiles[i].fileUrl,
          previewName: props.uploadedFiles[i].fileName,
          isDragging: false,
        });
        files.value.push({
          fileType: props.uploadedFiles[i].fileType,
          fileUrl: props.uploadedFiles[i].fileUrl,
          fileName: props.uploadedFiles[i].fileName,
        });
      }
    }
    isUploading.value = false;
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

const selectFiles = () => {
  if (isUploading.value) {
    return;
  }
  const fileInputRef = newfilesInput.value instanceof HTMLInputElement ? newfilesInput.value : null;
  if (fileInputRef) {
    fileInputRef.click();
  }
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

const uploadDefaultImage = (event, index, action) => {
  const files = event.target.files;
  console.log('files : ', files);
  for (let i = 0; i < files.length; i++) {
    try {
      previewFile(files[i], index + i, action);
    } catch (error) {
      console.error('error : ', error);
    }
  }
};

const previewFile = (file, index, action) => {
  const reader = new FileReader();
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
      obj.previewUrl = props.textPreview;
    } else if (file.type === 'application/pdf') {
      obj.previewUrl = props.pdfPreview;
    } else if (file.type.startsWith('video/')) {
      obj.previewType = 'video';
      obj.previewUrl = URL.createObjectURL(file);
    } else if (file.type.startsWith('audio/')) {
      obj.previewUrl = props.audioPreview;
    } else if (file.type === 'application/vnd.android.package-archive') {
      obj.previewUrl = props.apkPreview;
    } else if (file.type === 'application/zip') {
      obj.previewUrl = props.zipPreview;
    } else if (file.type === 'application/sql') {
      obj.previewUrl = props.sqlPreview;
    } else {
      obj.previewUrl = props.filePreview;
    }

    if (action === 'reset') {
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
const handleDragOver = (event, index, action) => {
  if (isUploading.value) {
    return;
  }
  event.preventDefault();
  if (action === 'reset') {
    filesPreview.value[index].isDragging = true;
  } else {
    isDragging.value = true;
  }
};

const handleDragLeave = (event, index, action) => {
  event.preventDefault();
  if (action === 'reset') {
    filesPreview.value[index].isDragging = false;
  } else {
    isDragging.value = false;
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
    isDragging.value = false;
  }
  const files = event.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    try {
      if (props.accept ? props.accept.split(', ').includes(files[i].type) : true) {
        previewFile(files[i], index + i, action);
      }
    } catch (error) {
      console.error('error : ', error);
    }
  }
};
</script>

<template>
<!--  {{filesPreview}}-->
  <div class="flex" v-for="(file, k) in filesPreview" :key="k">
    <div
        class="cursor-pointer"
        @click="selectFile(k)"
        @dragover.prevent="handleDragOver($event, k, 'reset')"
        @dragleave.prevent="handleDragLeave($event, k, 'reset')"
        @drop="handleDrop($event, k, 'reset')"
    >
<!--      {{k}}-->
      <slot :file="file"></slot>
      <input
          ref="fileInput"
          type="file"
          class="hidden"
          :accept="accept"
          @change="uploadDefaultImage($event, k, 'reset')"
      />
    </div>
    <button
        type="button"
        class="remove-btn bg-[#ccc] h-7 rounded-full dark:bg-stone-500 dark:text-white px-2.5"
        @click="removeImg(k)"
    >
      {{ removeBtnText }}
    </button>
  </div>

  <div
      @click="selectFiles"
      @dragover.prevent="handleDragOver($event, filesPreview.length, 'add')"
      @dragleave.prevent="handleDragLeave($event, filesPreview.length, 'add')"
      @drop="handleDrop($event, filesPreview.length, 'add')"
  >
    <slot></slot>
    <input
        ref="newfilesInput"
        type="file"
        class="hidden"
        :accept="accept"
        @change="uploadDefaultImage($event, filesPreview.length, 'add')"
        multiple
    />

  </div>

  <div class="upload-btn relative" :class="{ 'progress progress-striped active': isUploading }">
    <button
        type="button"
        class="flex items-center justify-center bg-slate-700 dark:text-slate-300 dark:bg-blue-700 text-white flex-none py-3 px-8 rounded-full bottom-0 absolute disabled:opacity-70 disabled:cursor-not-allowed"
        :class="{ 'progress-bar cursor-wait': isUploading }"
        @click="uploadingFunction"
        :disabled="filesPreview.length == 0 ? (files.length == 0 ? true : false) : false"
    >
      {{ isUploading ? progressBtnText : uploadBtnText }}
    </button>
  </div>
</template>

<style scoped>

</style>