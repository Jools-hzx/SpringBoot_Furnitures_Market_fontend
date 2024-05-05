<template>
  <div>
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!--    <el-button type="primary"> My Home View Button</el-button>-->
    <div style="margin: 10px 0">
      <el-button type="primary">新增</el-button>
      <el-button>其它</el-button>
    </div>

    <!--
    搜索-->
    <div style="margin: 10px 0">
      <el-input v-model="search"
                placeholder=" 请 输 入 关 键 字 "
                style="width:30%">
      </el-input>


      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  data() {
    return {
      search: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }
      ]
    }
  },
  methods: {
    handleEdit() {
    }
  }
}
</script>
