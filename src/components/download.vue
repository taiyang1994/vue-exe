<template>
  <div style="marginBottm:100px">
    实验分支提交
    <el-date-picker
      v-model="value1"
      :unlink-panels="true"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>
    <div class="box-card">
      <div class="front">
        <header>
          <h3>201910826413.8</h3>
          <div class="name">电子签章方法、装置、电子设备及计算机可读存储介质</div>
        </header>
        <section>
          <p><span class="label">类型:</span> <span>软件著作权</span></p>
          <!-- <p><span class="label">重要性:</span><span><el-tag>一般</el-tag></span> </p> -->
          <p>
            <span class="label">重要性:</span>
            <span>
              <el-rate v-model="value" :texts="level" show-text text-color="#ff9900" :colors="colors"></el-rate>
            </span>
          </p>
          <p><span class="label">申请日期:</span><span>2019/7/14</span></p>
          <p><span class="label">申请方式:</span><span>我行独立申请</span> </p>
          <p><span class="label">申请处室/领域:</span><span>公司业务开发处</span> </p>
          <div class="progress">
            <span class="label">进展情况:</span> 
          </div>
          <el-steps :space="200" :active="active" align-center>
              <el-step title="建议撤回" v-if="active == 0" status="error"></el-step>
              <el-step title="初审阶段" ></el-step>
              <el-step title="公开阶段"></el-step>
              <el-step title="获得证书"></el-step>
            </el-steps>
        </section>
      </div>
      <div class="back">
        <section>
          <p><span class="label">分类: </span><span><el-tag effect="dark" :type="type">安全类</el-tag></span></p>
          <p><span class="label">名称: </span><span>专业运营平台</span></p>
          <p><span class="label">代理人: </span><span>李浩</span></p>
          <p><span class="label">专利状态: </span><span>国家版权局已登记</span></p>
          <p><span class="label">材料提交时间: </span><span>2019年6月1日</span></p>
          <p><span class="label">代理公司名称: </span><span>北京兰台律师事务所</span></p>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import myTrees from "./radiusInformation";
export default {
  components: {
    myTrees
  },
  data() {
    let _minTime = null;
    let _maxTime = null;
    return {
      level:['一般','一般','中等','核心','核心'],
      colors:['#99A9BF','#E6A23C','#F56C6C'],
      value:4,
      obj:{
        type:'其他',
        status:'初审阶段'
      },
      data: {
        l2tp: [
          {
            mustSet: true,
            displayType: "text",
            allowedScope: "/^\\w{1,50}$/",
            defaultValue: null,
            displayName: "隧道密码",
            parameter: "secret",
            display: true,
            enumOption: "",
            valueCheck: true,
            value: "bjsxkjgfyxgs",
            tips: "隧道密码",
            needRestart: false
          }
        ],
        log: [
          {
            mustSet: false,
            displayType: "enum",
            allowedScope: "",
            defaultValue: 4,
            displayName: "日志级别",
            parameter: "level",
            display: true,
            enumOption: "1###2###3###4###5###6",
            valueCheck: true,
            value: "6",
            tips: "日志级别",
            needRestart: false
          }
        ]
      },
      
        ad:{a:[{name:"lal"}],b:[{name:"hah"},{name:"nia"}]},
      value1: [],
      startTime: "",
      endTime: "",
      pickerOptions: {
        onPick(time) {
          // 如果选择了只选择了一个时间
          console.log(time);
          if (!time.maxDate) {
            var minDate = new Date();
            var maxDate = new Date();
            minDate.setFullYear(time.minDate.getFullYear() - 1);
            minDate.setMonth(time.minDate.getMonth()); // 6天
            minDate.setDate(time.minDate.getDate());
            maxDate.setFullYear(time.minDate.getFullYear() + 1);
            maxDate.setMonth(time.minDate.getMonth()); // 6天
            maxDate.setDate(time.minDate.getDate());
            _minTime = minDate.getTime(); // 最小时间
            _maxTime = maxDate.getTime(); // 最大时间
            // 如果选了两个时间，那就清空本次范围判断数据，以备重选
          } else {
            _minTime = _maxTime = null;
          }
        },
        disabledDate(time) {
          // onPick后触发
          // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
          console.log(time.getTime(), _minTime, _maxTime);
          if (_minTime && _maxTime) {
            return _minTime > time.getTime() || time.getTime() > _maxTime;
          }
        }
      },
      list: [
        {
          name: "黄焖鸡米饭111111111",
          cList: [
            { name: "二级黄焖鸡" },
            {
              name: "one chicken",
              cList: [
                { name: "三级黄焖鸡3333", cList: [{ name: "四级黄焖鸡" }] }
              ]
            }
          ]
        },
        { name: "2222222222" },
        {
          name: "黄焖鸡米饭33333333",
          cList: [{ name: "二级黄焖鸡" }, { name: "one chicken" }]
        }
      ]
    };
  },
  computed:{
    type(){
      switch(this.obj.type){
        case '测试方法类': return '';
        case '安全类': return 'success';
        case '其他': return 'info';
        default: return '';
      }
    },
    active(){
      switch(this.obj.status){
        case '建议撤回': return 0;
        case '初审阶段': return 1;
        case '公开阶段': return 2;
        case '获得证书': return 3;
      }
    }
  },
  methods: {},

};
</script>
<style lang="less" scoped>
/deep/ .el-step__icon{
  width: 10px;
  height: 10px;
}
/deep/ .el-step.is-horizontal .el-step__line {
  height: 1px;
  top: 9px;
}
/deep/ .el-step__title{
  font-size: 12px;
  line-height: 20px;
}
/deep/ .el-tag{
  line-height: 22px;
  height: inherit;
}
/deep/ .el-rate__text{
  font-size: 12px;
}
/deep/ .is-process{
  color: #C0C4CC;
  border-color: #C0C4CC;
}
/deep/ .el-step__icon-inner{
  display: none;
}
/deep/ .el-step__icon.is-text{
  border: 5px solid;
}
/deep/ .el-step__title.is-process{
  font-weight: normal;
}
.box-card{
  position: relative;
  width: 260px;
  height: 390px;
  margin: 30px;
  .label{
    float: left;
    min-width: 52px;
    margin-right: 20px;
  }
  header{
    padding: 20px;
    color: #fff;
    background: #3f51b5;
    margin-bottom: 10px;
  }
  section{
    padding: 20px;
  }
  h3{
    font-size: 16px;
    margin-bottom: 10px;
  }
  p{
    font-size: 12px;
    color: #121212;
    opacity: .8;
    line-height: 28px;
    overflow: hidden;
    span:nth-of-type(2){
      float: left;
      max-width: 145px;
    }
    .tips{
      padding: 0px 10px;
      border-radius: 4px;
    }
    .normal{
      background-color: #67c23a;
      border-color: #67c23a;
      color: #fff;
    }
  }
  .name{
    font-size: 12px;
    line-height: 20px;
  }
  .progress{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 24px;
    margin-bottom: 10px;
  }
  .front,.back{
    width: 100%;
    height: 100%;
    border: 1px solid #ebeef5;
    border-radius: 20px 0 20px 0;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    overflow: hidden;
    backface-visibility: hidden;
    position: absolute;
    transition: transform .6s
  }
  .front{
    transform: perspective(600px) rotateY(0deg)
  }
  .back{
    transform: perspective(600px) rotateY(180deg)
  }
}
.box-card:hover .front{
    transform: perspective(600px) rotateY(-180deg)
  }
.box-card:hover .back{
    transform: perspective(600px) rotateY(0deg)
  }
.background {
  position: relative;
  width: 100%;
  background-image: url("../assets/drawing_board.jpg");
  background-size: 100% 100%;
  .dark {
    width: 100%;
    height: 100%;
    background: url("../assets/dark.png") no-repeat;
    position: absolute;
    right: 0;
    top: 0;
    background-size: 100% 100%;
    z-index: 10000;
  }
  .bg-child {
    position: absolute;
    width: 100%;

    left: 0;
    right: 0;

    bottom: 50px;
  }
  .box {
    text-align: center;
    .phone {
      width: 24em;
      height: 3em;
      background: #ff666b;
      border-radius: 23px;
      //margin:2.3em 2.8em 0.8em;
      margin-top: 2.3em;
      margin-bottom: 0.8em;
      font-size: 0.8em;
      color: #ffffff;
      text-align: center;
      border: 1px solid #ffffff;
    }
    .button {
      text-align: center;
      .ios {
        width: 12em;
        height: 2.8em;
        //background: #fff url("../assets/img/download/rectangle2.png") no-repeat 3.2em 0.9em;
        border-radius: 23px;
        text-align: center;
        background-size: 1em 1em;
        padding-left: 0.8em;
        margin-right: 0.2em;
        color: #e04655;
        font-size: 0.8em;
        border: none;
        cursor: pointer;
      }
      .android {
        width: 12em;
        height: 2.8em;
        // background:#fff url("../assets/img/download/rectangle1.png") no-repeat 2.2em 0.9em;
        border-radius: 23px;
        text-align: center;
        background-size: 1em 1em;
        padding-left: 0.8em;
        margin-left: 0.2em;
        color: #e04655;
        font-size: 0.8em;
        border: none;
        cursor: pointer;
      }
    }
  }
}
input::-webkit-input-placeholder {
  color: #fff;
}
</style>