<script lang="ts">
export default defineComponent({
  name: 'AppMain'
})
</script>

<template>
  <div class="layout">
    <div>layout</div>
    <router-view v-slot="{ Component }">
      <Component :is="Component" />
    </router-view>
  </div>
</template>
