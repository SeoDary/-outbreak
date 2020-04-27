<template>
<div class="article">
  <h2>公告</h2>
  <div class="box" v-for="(item,index) in articleList" :key="index" @click="$router.push({path:'/page',query:{id:item.id}})">
    <h1>{{item.title}}</h1>
    <p>{{item.author}}</p>
  </div>
   <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="param.size"
        :current-page.sync="param.page"
        background
        layout="total, prev, pager, next"
        :total="total"
        style="float: right;margin: 50px 15%  0 0;"
      ></el-pagination>
</div>
</template>

<script>
  import models from "../../interface/Models.js";
  
  export default {
    name: "index",
    data(){
      return{
        articleList:[],
        total:100,
        param:{
          page:1,
          size:10
        }
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      getData(){
        models.getModel("articleList").get(this.param).then((res)=>{
          this.articleList = res.data.data;
          this.total = res.data.paging.counts
          console.log(this.articleList);
        })
      },
      handleSizeChange(val) {
        this.param.page = val;
        this.getData()
      },
      handleCurrentChange(val) {
        this.param.page = val;
        this.getData()
      }
    },
  }
</script>

<style scoped lang="scss">
.article{
  width: 100%;
  height: 100%;
  background-color: rgb(240,242,242);
  padding-top: 100px;
  h2{
    text-align: left;
    font-size: 3rem;
    width: 70%;
    margin: 0 auto 30px;
  }
  .box{
    cursor: pointer;
    width: 70%;
    height: 100px;
    background-color: #fff;
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
      padding: 0 30px;
      text-align: left;
      font-size: 2rem;
      width: 70%;
    }
    p{
      width: 15%;
      padding: 0 5px ;
      font-size: 1rem;
    }
    &:first-child{
      margin-top: 0;
    }
  }
  /deep/ .el-pagination{
    background-color: rgb(240,242,242);
  }
}
</style>
