<template>
  <div class="hello">
    <el-card class="box-card">
      <p style="width:70%;float:left;margin-right:20px">1:2月底完成月报、科技战略监控平台功能上线</p>
      <el-tag style="float:right;margin-bottom:8px">自动</el-tag><el-tag type="danger" style="float:right">承诺</el-tag>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card{
  margin: 20px;
  border-radius: 8px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
