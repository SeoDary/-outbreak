<template>
  <div class="out-box">
    <div class="article">
      <h1>{{data.title}}</h1>
      <h3>作者：{{data.author}}</h3>
      <div v-html="data.text"></div>
    </div>
  </div>
</template>

<script>
  import models from "../../interface/Models.js";
  export default {
    name: "page",
    data(){
      return{
        data:'',
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        models.getModel("articleInfo").post({id:this.$route.query.id}).then((res)=>{
          if(res.data.code == '200'){
            this.data = res.data.data
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.out-box{
  background-color: rgb(240,242,242);
  overflow: auto;
  .article{
    width: 60%;
    background-color: #fff;
    margin-left: 20%;
    padding: 100px;
    img{
      width: 80%;
      margin: 0 auto;
    }
    h1{
      font-size: 3rem;
    }
    div{
      text-align: left;
      margin-top: 50px;
      p{
        text-indent: 2em;
        font-size: 1rem;
      }
    }
  }
}
</style>
