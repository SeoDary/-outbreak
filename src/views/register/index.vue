<template>
<div class="register">
  <div class="box">
    <h1>温度登记</h1>
    <div class="inner-box">
      <div>
        <span>体温：</span>
        <el-input type="text" placeholder="请输入今日体温" v-model="registered.user_temp"></el-input>
      </div>
      <div>
        <span>时间：</span>
        <el-date-picker
          disabled
          v-model="registered.register_time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary" @click="sendData">登记</el-button>
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
        registered:{
          register_time:this.formatDateTime(new Date()),
          user_id: Number(localStorage.getItem('personId')),
          user_temp: '',
        },
      }
    },
    mounted() {
    
    },
    methods:{
      sendData(){
        models.getModel("temperature").post(this.registered).then((res)=>{
          if(res.data.code == '200'){
            this.$message.success('登记成功')
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
