<template>
  <div class="container">
    <div class="header">どうぶつの森 Toolkit</div>
    <div class="main">
      <h3>选择月份和时间段，</h3>
      <h3>了解会遇到哪些鱼类和昆虫吧！</h3>
      <div class="box">
        <el-select v-model="hemiValue" placeholder="哪个半球？">
          <el-option
            v-for="item in hemiOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div calss="box">
        <el-select v-model="monthValue" placeholder="几月份？">
          <el-option
            v-for="item in monthOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '23:59'}">
        </el-time-select>
      </div>
      <div calss="box">
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '00:00',
            step: '00:30',
            end: '23:59',
            minTime: startTime}">
        </el-time-select>
      </div>
      <div class="goButton">
        <el-button type="primary" @click="showResult()">Go!</el-button>
      </div>
      <div class="result">
        <p>lalala</p>
        <p>lalala</p>
      </div>
    </div>
    <div class="footer">copyright@Wan.W</div>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    name: "time-to-animal",
    mounted: function () {

    },
    data() {
      return {
        hemiOptions: [
          {value: '1', label: '北半球'},
          {value: '2', label: '南半球'}
        ],
        monthOptions: [
          {value: '1', label: '一月'},
          {value: '2', label: '二月'},
          {value: '3', label: '三月'},
          {value: '4', label: '四月'},
          {value: '5', label: '五月'},
          {value: '6', label: '六月'},
          {value: '7', label: '七月'},
          {value: '8', label: '八月'},
          {value: '9', label: '九月'},
          {value: '10', label: '十月'},
          {value: '11', label: '十一月'},
          {value: '12', label: '十二月'}
        ],
        hemiValue: '',
        monthValue: '',
        startTime: '',
        endTime: ''
      }
    }
  }
</script>

<style scoped>
  .container {
  }
  .header {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    font-family: Bradley Hand, cursive;
    /*background-color: #e6b8af;*/
    background-color: #FFDEAD;
    text-align: center;
    line-height: 60px;
    /*These for lines are to fix header in the top*/
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    /*border: 1px solid;*/
  }
  .main {
    background-color: white;
    color: #333;
    text-align: center;
    /*These for lines are to fix main in the middle*/
    position: absolute;
    left: 20px;
    right: 20px;
    top: 80px;
    bottom: 60px;
    /*border: 1px solid;*/
  }
  .box {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .goButton {
    margin-top: 15px;
  }
  .result {
    border: 1px solid;
    position: absolute;
    bottom: 0px;
    left: 20px;
    right: 20px;
    top: 370px;
    overflow-y: auto;
  }
  .footer {
    font-family: "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", sans-serif;
    background-color: #FFDEAD;
    color: #333;
    text-align: center;
    height:60px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .el-button {
    display: inline-block !important;
    padding: 12px 20px!important;
    background-color: #FFDEAD!important;
    color: black!important;
    font-family: "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", sans-serif !important;
    font-size: 13px!important;
    font-weight: 800!important;
    letter-spacing: 0.5px!important;
    text-transform: uppercase!important;
    transition: all 0.5s!important;
    border-color:  #fff!important;
    border-radius: 20px !important;
  }

</style>
