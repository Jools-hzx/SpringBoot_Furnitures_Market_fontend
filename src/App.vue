<template>
  <div>
    <!--  头部 -->
    <Header/>
    <!--  主体  -->
    <div style="display: flex">
      <!--  侧边栏 -->
      <Aside/>
      <!--  内容区域,表格, 这个部分是从 HomeView.vue 组件来的 -->
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<style>
</style>

<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";

export default {
  name: "Layout",
  components: {
    Header,
    Aside
  }
}
</script>
