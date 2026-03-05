<script lang="ts" setup>
import { defaultLanguageLocale } from '@/locales'
const store = useBaseStore()
const route = useRoute()
const router = useRouter()

const { currentLocaleLang } = useLanguage()

watch(
  () => route.params,
  () => {
    if (route.name === '404') return
    store.User.setLanguage(route.params.locale as string || defaultLanguageLocale)
  }
)
</script>

<template>
  <ElConfigProvider :locale="currentLocaleLang">
    <router-view />
  </ElConfigProvider>
</template>

<style lang="scss">
@use "@/styles/index";
</style>
