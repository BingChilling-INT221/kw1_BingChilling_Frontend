<script setup>
import {ref} from 'vue';
import pdfPreviewValue from '@/assets/images/pdf-icon.png'
import textPreviewValue from '@/assets/images/text-icon.png'
import audioPreviewValue from '@/assets/images/music-icon.png'
import apkPreviewValue from '@/assets/images/apk-icon.png'
import zipPreviewValue from '@/assets/images/zip-icon.png'
import sqlPreviewValue from '@/assets/images/sql-icon.png'
import filePreviewValue from '@/assets/images/file-icon.png'
import MultipleFileUpload from '@/components/announce/MultipleFileUpload.vue';

const uploadedFile = ref({
  fileType: '',
  fileUrl: '',
  fileName: ''
});

const uploadedFiles = ref([]);

async function handleFileUploading(file) {
  // add your fileuploading logic to server and set data to the uploadedFile
  uploadedFile.value.fileType = 'image';
  uploadedFile.value.fileUrl = 'https://picsum.photos/300/224';
  uploadedFile.value.fileName = file.name;

  await new Promise((resolve) => setTimeout(resolve, 2000));
}

async function handleMultipleFileUpload(files) {
  uploadedFiles.value = [];

  // add your fileuploading logic to server and set data to the uploadedFiles
  for (let i = 0; i < files.length; i++) {
    uploadedFiles.value.push({
      fileType: 'image',
      fileUrl: 'https://picsum.photos/300/224',
      fileName: 'example-image.jpg'
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
}
function checkFile( PreviewImage)
{
  const file = ref(null);
  console.log(PreviewImage);
  if (PreviewImage == 'pdfPreviewValue') {
    console.log('pdfPreviewValue');
    file.value = pdfPreviewValue;
  }
  else if (PreviewImage == 'textPreviewValue') {
    file.value = textPreviewValue;
  }
  else if (PreviewImage == 'audioPreviewValue') {
    file.value = audioPreviewValue;
  }
  else if (PreviewImage == 'apkPreviewValue') {
    file.value = apkPreviewValue;
  }
  else if (PreviewImage == 'zipPreviewValue') {
    file.value = zipPreviewValue;
  }
  else if (PreviewImage == 'sqlPreviewValue') {
    file.value = sqlPreviewValue;
  }
  else if (PreviewImage == 'filePreviewValue') {
    file.value = filePreviewValue;
  }
  else {
    file.value = PreviewImage;
  }

    return file.value;
}
</script>

<template>
  <p class="mt-5 ms-6">Attachment</p>
  <div class="flex flex-wrap">
    <MultipleFileUpload
        :callback="handleMultipleFileUpload"
        :progressBtnText="'Saving...'"
        :removeBtnText="'remove'"
        :uploadBtnText="'Save'"
        :uploadedFiles="uploadedFiles"
    >
      <template v-slot="file">
        <div class="m-5">
          <div class="flex items-center justify-center">
            <label
                v-if="!file.file"
                class="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                for="dropzone-file"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6 px-10">
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
              </div>
            </label>
            <div v-else>
<!--              {{ file.file.previewUrl}}-->
              <div class="w-full h-64">

                <img
                    v-if="file.file.previewType != 'video'"
                    :src="`${checkFile(file.file.previewUrl)}`"
                    alt=""
                    class="h-full w-full object-contain rounded-2xl"
                />
                <video v-else autoplay class="h-full w-full object-contain" loop>
                  <source :src="file.file.previewUrl" type="video/mp4"/>
                </video>
              </div>
            </div>
          </div>
          <p class="flex items-center justify-center text-center w-3/4">
            {{ file.file ? file.file.previewName : '' }}
          </p>
        </div>
      </template>
    </MultipleFileUpload>
  </div>
</template>

<style scoped>

</style>