<template>
  <div class="container">
    <div class="header">どうぶつの森 Toolkit</div>
    <div class="main">
      <div class="panelBlock">
        <h4 v-if="showResultFlag === false">选择月份和时间段，了解会遇到哪些鱼类和昆虫吧！</h4>
        <h4 v-if="showResultFlag === true">{{hemiMapping[hemiValue]}}{{monthValue}}月份{{startTime}}-{{endTime}}的鱼类和昆虫：</h4>
        <!--<h3>了解会遇到哪些鱼类和昆虫吧！</h3>-->
      </div>
      <div class="selectBlock" v-if="showResultFlag === false">
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
              step: '01:00',
              end: '23:59'}">
          </el-time-select>
        </div>
        <div calss="box">
          <el-time-select
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{
              start: '00:00',
              step: '01:00',
              end: '24:00',
              minTime: startTime}">
          </el-time-select>
        </div>
      </div>
      <div class="goButtonBlock">
        <el-button type="primary" @click="showResult()" v-if="showResultFlag === false">Go!</el-button>
        <el-button type="primary" @click="goBack()" v-if="showResultFlag === true">Back</el-button>
      </div>
      <div class="resultBlock" v-if="showResultFlag === true">
        <el-table
          :data="resultData"
          style="width: 100%"
          :row-style="tableRowStyleFunction"
          :default-sort = "{prop: 'price', order: 'descending'}">
          <el-table-column
            prop="class"
            label="类别"
            sortable>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名字">
          </el-table-column>
          <el-table-column
            prop="location"
            label="地点"
            sortable>
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            sortable>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer">
      Author @ <a href="https://github.com/nestle1993/dodo_toolkit">Wan.W</a>
    </div>
  </div>
</template>

<script>
import northernFish from '../../static/northernFish.json'
import northernInsects from '../../static/northernInsects.json'
import southernFish from '../../static/southernFish.json'
import southernInsects from '../../static/southernInsects.json'
/* eslint-disable */
  export default {
    name: "time-to-animal",
    data() {
      return {
        hemiOptions: [
          {value: '1', label: '北半球'},
          {value: '2', label: '南半球'}
        ],
        hemiMapping: {"1": "北半球", "2": "南半球"},
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
        endTime: '',
        resultData: [],
        showResultFlag: false
      }
    },
    methods: {
      tableRowStyleFunction({row, rowIndex}) {
        if (rowIndex % 2 === 1) {
          return {"background": "rgba(255, 245, 238, 0.5)"}
        }
        return {};
      },
      selectFunction: function (startTimeVal, endTimeVal, monthVal, infoList, className) {
        let ret = [];
        for (let i = 0; i < infoList.length; i++) {
          const itemInfo = infoList[i];
          if (itemInfo.month.indexOf(monthVal) > -1) {
            // console.log("monthVal: " + monthVal + "\n" + fishInfo.month)
            for (let j in itemInfo.time) {
              if (itemInfo.time[j] >= startTimeVal && itemInfo.time[j] <= endTimeVal) {
                // console.log(fishInfo.name + " " + "showTime: " + fishInfo.time[j] + "\n" + fishInfo.time);
                ret.push({"class": className, "name": itemInfo.name, "location": itemInfo.location, "price": parseInt(itemInfo.price)})
                break;
              }
            }
          }
        }
        return ret;
      },
      showResult: function () {
        this.resultData = [];
        this.showResultFlag = true;

        const startTimeVal = parseInt(this.startTime.split(":")[0]);
        const endTimeVal = parseInt(this.endTime.split(":")[0]);
        const monthVal = parseInt(this.monthValue);
        const hemiVal = parseInt(this.hemiValue);
        let fishTable, insectsTable;
        if (hemiVal === 1) {
          fishTable = northernFish;
          insectsTable = northernInsects;
        } else if (hemiVal === 2) {
          fishTable = southernFish;
          insectsTable = southernInsects;
        }
        // console.log(startTimeVal + " " + endTimeVal);
        const selectedFish = this.selectFunction(startTimeVal, endTimeVal, monthVal, fishTable, "鱼");
        const selectedInsects = this.selectFunction(startTimeVal, endTimeVal, monthVal, insectsTable, "昆虫");
        this.resultData.push.apply(this.resultData, selectedFish);
        this.resultData.push.apply(this.resultData, selectedInsects);
      },
      goBack: function () {
        this.showResultFlag = false;
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
    text-align: center;
    /*These for lines are to fix main in the middle*/
    position: absolute;
    left: 20px;
    right: 20px;
    top: 80px;
    bottom: 40px;
    /*border: 1px solid;*/
  }
  .panelBlock {
    width: 90%;
    display: inline-block;
    background: rgba(122, 197, 205, 0.3);
    color: gray;
    border-radius: 20px;
  }
  .box {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .goButtonBlock {
    margin-top: 15px;
  }
  .resultBlock {
    /*border: 1px solid;*/
    vertical-align:middle;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    top: 130px;
    overflow-y: auto;
  }
  .footer {
    font-family: "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", sans-serif;
    background-color: #FFDEAD;
    color: #fff;
    text-align: center;
    height:40px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .el-button {
    display: inline-block !important;
    padding: 12px 20px!important;
    background-color: #FFDEAD!important;
    color: dimgray!important;
    font-family: "Comic Sans", "Comic Sans MS", "Chalkboard", "ChalkboardSE-Regular", sans-serif !important;
    font-size: 13px!important;
    font-weight: 800!important;
    letter-spacing: 0.5px!important;
    text-transform: uppercase!important;
    transition: all 0.5s!important;
    border-color:  #fff!important;
    border-radius: 20px !important;
  }
  a:link,
  a:visited {
    color: dimgrey;
    text-decoration: underline;
  }
  a:hover,
  a:active {
    color: black;
    text-decoration: none;
  }
</style>
