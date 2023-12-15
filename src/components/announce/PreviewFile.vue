<script setup>
import placeHolderImage from '@/assets/images/placeholder.png'
import pdfPreviewValue from '@/assets/images/pdf-icon.png'
import textPreviewValue from '@/assets/images/text-icon.png'
import audioPreviewValue from '@/assets/images/music-icon.png'
import apkPreviewValue from '@/assets/images/apk-icon.png'
import zipPreviewValue from '@/assets/images/zip-icon.png'
import sqlPreviewValue from '@/assets/images/sql-icon.png'
import filePreviewValue from '@/assets/images/file-icon.png'
import {computed, ref, watch} from "vue";

const props = defineProps({
  previewType: {
    type: String,
  },
  previewName: {
    type: String,
  },
  previewUrl: {
    type: String,
  },
})
const previewType = ref(props.previewType)
watch(() => props.previewType, (value) => {
  previewType.value = value
})
const previewImg = computed(() => {
  // console.log('previewType : ', previewType?.value)
  // console.log('previewName : ', props.previewName)
  // console.log('previewUrl : ', props.previewUrl)
  if (props.previewType === '' || props.previewType === null || props.previewType === undefined) {
    return placeHolderImage
  }
  if (previewType?.value?.startsWith('image')) {
    return props.previewUrl
  } else if (previewType?.value === 'video') {
    return props.previewUrl
  } else if (previewType?.value === 'text/plain') {
    return textPreviewValue
  } else if (previewType?.value === 'application/pdf') {
    return pdfPreviewValue
  } else if (previewType?.value === 'audio/') {
    return audioPreviewValue
  } else if (previewType?.value === 'application/vnd.android.package-archive') {
    return apkPreviewValue
  } else if (previewType?.value === 'application/zip') {
    return zipPreviewValue
  } else if (previewType?.value === 'application/sql') {
    return sqlPreviewValue
  } else {
    return filePreviewValue
  }
})
</script>
<template>
<!--  {{props}}-->
<a :href="previewUrl">
  <div class="w-full h-64 py-6">
    <img
        v-if="previewType !== 'video'"
        :src="previewImg"
        alt=""
        class="h-full w-full object-contain rounded-2xl"
    />
    <video v-else autoplay class="h-full w-full object-contain" loop>
      <source :src="previewImg" type="video/mp4"/>
    </video>
    <p class="flex items-center justify-center text-center w-full mt-1">
      {{ previewName }}
    </p>
  </div>
</a>
</template>
<style></style>