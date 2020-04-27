<template>
  <div class="register">
    <div class="box">
      <h1>求助</h1>
      <div class="inner-box">
        <div>
          <span>主题：</span>
          <el-input type="text" placeholder="请输入主题" v-model="message.title"></el-input>
        </div>
        <div>
          <span>时间：</span>
          <el-input type="text" placeholder="请输入主题" v-model="message.message_time" disabled></el-input>
        </div>
        <div>
          <span>内容：</span>
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="message.message"></el-input>
        </div>
        <div>
          <el-button type="primary" @click="sendData">发送</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </div>
      </div>
    
    
    </div>
  </div>
</template>

<script>
  import models from "../../interface/Models.js";
  export default {
    name: "index",
    data(){
      return{
        message: {
          message: "",
          message_time: this.formatDateTime(new Date()),
          title: "",
          user_id: localStorage.getItem('personId')
        }
      }
    },
    mounted() {

    },
    methods:{
      sendData(){
        models.getModel("message").post(this.message).then((res)=>{
          if(res.data.code == '200'){
            this.$message.success('提交成功')
          }
        })
      },
      formatDateTime(inputTime) {
        let date = new Date(inputTime);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      }
    }
  }
</script>

<style scoped lang="scss">
  .register{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg,#feac5e,#c779d0,#4bc0c8);
    .box{
      border-radius: 15px;
      width: 60%;
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: rgba(242,242,242,.8);
      box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.1);
      h1{
        margin-bottom: 30px;
      }
      .inner-box{
        width: 70%;
        div{
          width: 100%;
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items:stretch;
          span{
            width: 100px;
          }
        }
      }
    }
  }
</style>
