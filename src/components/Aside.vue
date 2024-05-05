<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <el-menu
        style="width:200px"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
    >
      <el-sub-menu index="1-4">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>选项一</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon>
          <icon-menu/>
        </el-icon>
        <span>导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon>
          <document/>
        </el-icon>
        <span>导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <setting/>
        </el-icon>
        <span>导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  name: "Aside"
}
</script>