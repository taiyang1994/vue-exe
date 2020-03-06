<template>
    <div class="radius-echarts">
        <el-form :inline="true" :rules="paramRule" :model="queryForm" ref="queryForm" @keyup.enter.native="getDataList()">
           <div>
                <el-form-item label="查询维度:">
                    <el-select v-model="queryDimension" placeholder="请选择" @change='dimensionChange' >
                        <el-option v-for="item in dimensionOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="valueOne" collapse-tags placeholder="请选择" >
                        <el-option v-for="item in oneOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryConditions" collapse-tags placeholder="请选择" @change="echartsLineSelectedChange">
                        <el-option v-for="item in conditionsOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <!-- <el-form-item label="查询时间范围：" prop="searchPickerRange">
                    <el-date-picker
                    v-model="queryForm.searchPickerRange"
                    type="daterange"
                    align="right"
                    range-separator="至 "
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item>
                    <el-select v-model="unitTime" style="width:80px">
                        <el-option
                        v-for="item in optionsTime"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>

                </el-form-item>
            
                <el-form-item>
                    <el-button type="primary" @click="getDataList()">查询</el-button>
                </el-form-item>
            </div> 
           
        </el-form>
        <el-tabs class="echart_show">
            <div id="echartsGGSNshow" v-show="isShow" style="height:500px" >
            </div>
            <div id="echartsAPNshow" v-show="!isShow" style="height:500px">
            </div>
        </el-tabs>
        <!-- <input type="text" v-model="upperRans" > -->
        <input @input="strFormat($event.target)">
        <dialog id="favDialog">
  <form method="dialog">
    <section>
      <p><label for="favAnimal">Favorite animal:</label>
      <select id="favAnimal">
        <option></option>
        <option>Brine shrimp</option>
        <option>Red panda</option>
        <option>Spider monkey</option>
      </select></p>
    </section>
    <menu>
      <button id="cancel" type="reset">Cancel</button>
      <button type="submit">Confirm</button>
    </menu>
  </form>
</dialog>
<details>
    <summary>水果</summary>
    <p>香蕉</p>
    <p>苹果</p>
</details>
<menu>
  <button id="updateDetails">Update details</button>
</menu>
<input type="week">
<div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value6"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="change">
    </el-date-picker>
  </div>
  <input type="text" id="myFlowers" list="flowers">
  <datalist id="flowers">
      <option value="Rose"></option>
      <option value="Sunflowers"></option>
      <option value="Dandelion"></option>
  </datalist>
  <progress></progress>
  <progress value="30" max="100"></progress>
  <canvas id="drawing" width="200" height="200" style="margin-top:20px">A Canvas</canvas>
  <input class="switch-component" type="checkbox">
    </div>
</template>
<script>
  import echarts from 'echarts'

export default {
    data(){
        
         // 自定义参数校验规则
      var validateSearchPickerRange = (rule, value, callback) => {
        if (!value || value.length < 2) {
          callback(new Error('请选择查询日期'))
        } else {
          callback()
        }
      }
        return{
            //upperRans:"",
            pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: ['2018-08-01','2018-08-09'],
        value7: '',
            range:"28",
                pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
                },
                queryForm:{
                    searchPickerRange: [],//查询时间区间
                },
                optionsTime: [{
                    value: '1',
                    label: '按时'
                    }, {
                    value: '2',
                    label: '按日'
                    }, {
                    value: '3',
                    label: '按月'
                    }],
                unitTime: '1',//查询时间单位
                queryDimension: '10',//维度
                queryConditions: '100',//具体查询条件
                oneOptions:[],//test
                valueOne:'',//test
                conditionsOptions:[],
                dimensionOptions:[{
                    value:'10',
                    label:"GGSN维度",
                    childrenOne:[],
                    childrenTwo:[{
                        value:'100',
                        label:'全部显示'
                    },{
                        value:'101',
                        label:'认证总次数'
                    },{
                        value:'102',
                        label:'认证成功次数'
                    },{
                        value:'103',
                        label:'认证失败次数'
                    },{
                        value:'104',
                        label:'认证成功率'
                    },{
                        value:'105',
                        label:'认证用户数'
                    },{
                        value:'106',
                        label:'计费用户数'
                    },{
                        value:'107',
                        label:'上下线次数'
                    },{
                        value:'108',
                        label:'流量'
                    },
                    {
                        value:'109',
                        label:'速率'
                    }],
                },{
                    value:'20',
                    label:'APN维度',
                    childrenTwo:[{
                        value:'100',
                        label:'全部显示'
                    },{
                        value:'201',
                        label:'认证总次数'
                    },{
                        value:'202',
                        label:'认证成功次数'
                    },{
                        value:'203',
                        label:'认证失败次数'
                    },{
                        value:'204',
                        label:'认证成功率'
                    },]
                }],
                //参数校验规则
                paramRule: {
                searchPickerRange: [
                    { validator: validateSearchPickerRange, trigger: 'blur' }
                ],},
                isShow:true,
                //x轴
                authXAxis:[],
                //GGSN维度
                authTotalCountGGSN:[],//认证总次数
                authSuccessCountGGSN:[],//认证成功次数
                authFallCountGGSN:[],//认证失败次数
                authSuccessRateGGSN:[],//认证成功率
                authUserCountGGSN:[],//认证用户数
                acctUserCountGGSN:[],//计费用户数
                logOnOffCountGGSN:[],//上下线次数
                acctIoBytesGGSN:[],//流量
                rateGGSN:[],//速率
                //APN维度
                authTotalCountAPN:[],//认证总次数
                authSuccessCountAPN:[],//认证成功次数
                authFallCountAPN:[],//认证失败次数
                authSuccessRateAPN:[],//认证成功率
                //事件指标
                echartsGGSNLineSelected:{
                    //GGSN
                    "认证总次数":true,
                    "认证成功次数":true,
                    "认证失败次数":true,
                    '认证成功率':true,
                    '认证用户数':true,
                    '计费用户数':true,
                    '上下线次数':true,
                    '流量':true,
                    '速率':true,
                },
                echartsAPNLineSelected:{
                    //APN
                    '认证总次数':false,
                    '认证成功次数':false,
                    '认证失败次数':false,
                    '认证成功率':false
                },
                //参数校验规则
                paramRule: {
                    searchPickerRange: [
                        { validator: validateSearchPickerRange, trigger: 'blur' }
                    ]
                },
                }
    },
    mounted(){
        var draw=document.getElementById("drawing");
        if(draw.getContext){
            var context=draw.getContext("2d");
            context.fillStyle="red";
            context.strokeStyle="black";
            context.lineWidth=5;
            context.lineJoin="round";
            context.fillRect(10,10,50,50);
            context.strokeRect(10,10,50,50);
        };
         (function() {
  var updateButton = document.getElementById('updateDetails');
  var cancelButton = document.getElementById('cancel');
  var favDialog = document.getElementById('favDialog');

  // Update button opens a modal dialog
  updateButton.addEventListener('click', function() {
    favDialog.showModal();
  });

  // Form cancel button closes the dialog box
  cancelButton.addEventListener('click', function() {
    favDialog.close();
  });
})()
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        // this.queryForm.searchPickerRange = [formatDate(start, 'yyyy-MM-dd'), formatDate(end, 'yyyy-MM-dd')]
        this.echartsGGSNShow = echarts.init(document.getElementById('echartsGGSNshow'))
        this.echartsGGSNShow.on('legendselectchanged',function(){
            console.log('000')
        })
        // this.echartsAPNShow = echarts.init(document.getElementById('echartsAPNshow'))
        this.dimensionFun(10)//查询维度
        this.getDataList()//查询数据
        
    },
    watch:{
        range(val){
             this.$refs.slider.style.backgroundSize = val / 30 * 100 + "% 100%"; 
        },
        // upperRans: function(val){
        //     this.upperRans = val.toUpperCase();
        // }
    },
    activated(){
            this.echartsGGSNShow.resize()
            this.echartsAPNShow.resize()
           
    },
    // watch: {
    //     isShow: function (val) {
    //         console.log(val,'123')
    //             this.echartsGGSNShow.resize()
    //             this.echartsAPNShow.resize()
    //         if(val){
    //             // this.echartsGGSNShow.resize()
    //             this.initGGSNEchartsOption()
    //             this.echartsGGSNShow.setOption(this.GGSNechartsOption)
    //         }else{
    //             // this.echartsAPNShow.resize()
    //             this.initAPNEchartsOption()
    //             this.echartsAPNShow.setOption(this.APNechartsOption)
    //         }
    //     }
    // },
    computed: {
        
    },
    methods:{  
        change: function(){
            if(this.value6)
            console.log(this.value6);
            else{
                this.value6= ['2018-08-01','2018-08-09'];
                console.log("lalla");
            }
        },
        //查询数据
        getDataList(){
            this.initEchartsLine()
        },
        strFormat:function (target) {
               // this.account = target.value.toString().replace(/\s/g, '');
                //target.value = target.value.toString().replace(/(\d{4})(?=\d)/g, '$1 ');
                target.value = target.value.toUpperCase();
        },
        //
        initEchartsLine(){
            if(this.queryDimension === '10'){
                this.isShow = true
                document.getElementById('echartsGGSNshow').style.display = "block"
                // this.echartsGGSNShow = echarts.init(document.getElementById('echartsGGSNshow'))
                this.initGGSNEchartsOption()
                this.echartsGGSNShow.setOption(this.GGSNechartsOption)
                // this.echartsGGSNShow.resize()
                window.addEventListener('resize',() =>{
                    this.echartsGGSNShow.resize()
                })
            }
            if(this.queryDimension === '20'){
                this.isShow = false
                // this.echartsAPNShow = echarts.init(document.getElementById('echartsAPNshow'))
                document.getElementById('echartsAPNshow').style.display = "block"
                this.echartsAPNShow = echarts.init(document.getElementById('echartsAPNshow'))
                this.initAPNEchartsOption()
                this.echartsAPNShow.setOption(this.APNechartsOption)
               // this.echartsAPNShow.resize()
                window.addEventListener('resize',() =>{
                    this.echartsAPNShow.resize()
                })
            }
                
            
        },
        dimensionChange(e,value){
            this.dimensionFun(e),
            this.echartsLineSelectedChange(value)
        },
        //查询维度改变
        dimensionFun(e) {
            let index = this.dimensionOptions.findIndex(function(val) {
                return val.value == e;
            })
            this.province = this.dimensionOptions[index].label;
            this.queryConditions = '100'
            this.conditionsOptions = this.dimensionOptions[index].childrenTwo;
            this.oneOptions = this.dimensionOptions[index].childrenOne;
         }, 
        //初始化GGSNecharts
        initGGSNEchartsOption (){
            this.GGSNechartsOption ={
                title:{
                    text:'认证数据统计分析'
                },
                legend:{
                    data:["认证总次数","认证成功次数","认证失败次数",'认证成功率','','认证用户数','计费用户数','上下线次数','流量','速率'],
                    selected:{
                        //GGSN
                    "认证总次数":this.echartsGGSNLineSelected.认证总次数,
                    "认证成功次数":this.echartsGGSNLineSelected.认证成功次数,
                    "认证失败次数":this.echartsGGSNLineSelected.认证失败次数,
                    '认证成功率':this.echartsGGSNLineSelected.认证成功率,
                    '认证用户数':this.echartsGGSNLineSelected.认证用户数,
                    '计费用户数':this.echartsGGSNLineSelected.计费用户数,
                    '上下线次数':this.echartsGGSNLineSelected.上下线次数,
                    '流量':this.echartsGGSNLineSelected.流量,
                    '速率':this.echartsGGSNLineSelected.速率,
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '50',
                    top: '20%',
                    containLabel: true
                },
                tooltip:{
                    trigger:'axis',
                    axisPointer:{
                        type:'shadow'
                    }
                },
                toolbox:{
                    show:true,
                    feature:{
                        magicType:{
                            type:['line','bar']
                        }
                    }
                },
                xAxis:{
                        type:'category',
                        boundaryGap:false,
                        // data:this.authXAxis,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                yAxis:
                    {
                        type:'value',
                        // axisLabel:{
                        //     show:true,
                        //     initerval:'auto'
                        // }
                    },
                series:[
                    //GGSN维度
                    {
                        name:'认证总次数',
                        type:'line',
                        connectNulls:true,
                        // data:this.authTotalCountGGSE,
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },{
                        name:'认证成功次数',
                        type:'line',
                        connectNulls:true,
                        // data:this.authSuccessCountGGSE,
                        data:[230, 532, 901, 634, 290, 1330, 1920]
                    },{
                        name:'认证失败次数',
                        type:'line',
                        connectNulls:true,
                        // data:this.authFallsCountGGSE,
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },{
                        name:'认证成功率',
                        type:'line',
                        connectNulls:true,
                        // data:this.authSuccessRateGGSN,
                         data:[150, 232, 201, 154, 190, 330, 410]
                    },{
                        name:'认证用户数',
                        type:'line',
                        connectNulls:true,
                        // data:this.authUserCountGGSN,
                         data:[320, 332, 301, 334, 390, 330, 320]
                    },{
                        name:'计费用户数',
                        type:'line',
                        connectNulls:true,
                        // data:this.acctUserCountGGSN,
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    },{
                        name:'上下线次数',
                        type:'line',
                        connectNulls:true,
                        // data:this.logOnOffCountGGSN,
                        data:[920, 932, 901, 634, 190, 1330, 1320]
                    },{
                        name:'流量',
                        type:'line',
                        connectNulls:true,
                        // data:this.acctIoBytesGGSN,
                        data:[720, 932, 901, 934, 120, 1330, 120]
                    },{
                        name:'速率',
                        type:'line',
                        connectNulls:true,
                        // data:this.rateGGSN,
                        data:[420, 932, 971, 934, 190, 130, 1320]
                    }
                ]
            }
        },
        //APNecharts
        initAPNEchartsOption (){
            this.APNechartsOption ={
                title:{
                    text:'认证数据统计分析'
                },
                legend:{
                    data:['认证总次数','认证成功次数','认证失败次数','认证成功率'],
                    selected:{
                          //APN
                    '认证总次数':this.echartsAPNLineSelected.认证总次数,
                    '认证成功次数':this.echartsAPNLineSelected.认证成功次数,
                    '认证失败次数':this.echartsAPNLineSelected.认证失败次数,
                    '认证成功率':this.echartsAPNLineSelected.认证成功率
                    }
                  
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '50',
                    top: '20%',
                    containLabel: true
                },
                tooltip:{
                    trigger:'axis',
                    axisPointer:{
                        type:'shadow'
                    }
                },
                toolbox:{
                    show:true,
                    feature:{
                        magicType:{
                            type:['line','bar']
                        }
                    }
                },
                xAxis:{
                        type:'category',
                        boundaryGap:false,
                        // data:this.authXAxis,
                        data: ['one','two','周三','周四','周五','周六','周日']
                    },
                yAxis:
                    {
                        type:'value',
                        // axisLabel:{
                        //     show:true,
                        //     initerval:'auto'
                        // }
                    },
                series:[
                    //APN维度
                    {
                        name:'认证总次数',
                        type:'line',
                        connectNulls:true,
                        // data:this.authTotalCountAPN,
                        data:[520, 932, 91, 934, 1290, 1330, 1320]
                    },{
                        name:'认证成功次数',
                        type:'line',
                        connectNulls:true,
                        // data:this.authTotalCountAPN,
                        data:[220, 932, 701, 934, 1290, 1330, 1320]
                    },{
                        name:'认证失败次数',
                        type:'line',
                        connectNulls:true,
                        // data:this.authFallCountAPN,
                        data:[320, 932, 801, 934, 1290, 1330, 1320]
                    },{
                        name:'认证成功率',
                        type:'line',
                        connectNulls:true,
                        // data:this.authSuccessRateAPN,
                        data:[420, 932, 301, 934, 1290, 1330, 1320]
                    },
                ]
            }
        },
        //事件指标change
        echartsLineSelectedChange(value){
            //GGSN维度
            if(this.queryDimension === '10'){
                    this.echartsGGSNLineSelected = {
                         //GGSN
                            "认证总次数":false,
                            "认证成功次数":false,
                            "认证失败次数":false,
                            '认证成功率':false,
                            '认证用户数':false,
                            '计费用户数':false,
                            '上下线次数':false,
                            '流量':false,
                            '速率':false,
                    }
                     this.echartsAPNLineSelected = {
                            //APN
                            '认证总次数':false,
                            '认证成功次数':false,
                            '认证失败次数':false,
                            '认证成功率':false
                    }
                //显示全部
                if(this.queryConditions === '100'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "认证总次数":true,
                    "认证成功次数":true,
                    "认证失败次数":true,
                    '认证成功率':true,
                    '认证用户数':true,
                    '计费用户数':true,
                    '上下线次数':true,
                    '流量':true,
                    '速率':true,
                     }
                }
                if(this.queryConditions === '101'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "认证总次数":true,
                     }
                }
                if(this.queryConditions === '102'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "认证成功次数":true,
                     }
                }
                if(this.queryConditions === '103'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "认证失败次数":true,
                     }
                }
                if(this.queryConditions === '104'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "认证成功率":true,
                     }
                }
                if(this.queryConditions === '105'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "认证用户数":true,
                     }
                }
                if(this.queryConditions === '106'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "计费用户数":true,
                     }
                }
                if(this.queryConditions === '107'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "上下线次数":true,
                     }
                }
                if(this.queryConditions === '108'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "流量":true,
                     }
                }
                if(this.queryConditions === '109'){
                     this.echartsGGSNLineSelected = {
                    //GGSN
                    "速率":true,
                     }
                }
            }
            //APN
            if(this.queryDimension === '20'){
                console.log('APN')
                
                 this.echartsGGSNLineSelected = {
                         //GGSN
                            "认证总次数":false,
                            "认证成功次数":false,
                            "认证失败次数":false,
                            '认证成功率':false,
                            '认证用户数':false,
                            '计费用户数':false,
                            '上下线次数':false,
                            '流量':false,
                            '速率':false,
                    }
                    this.echartsAPNLineSelected = {
                            //APN
                            '认证总次数':false,
                            '认证成功次数':false,
                            '认证失败次数':false,
                            '认证成功率':false
                    }
                    if(this.queryConditions === '100'){
                         this.echartsAPNLineSelected = {
                            //APN
                            '认证总次数':true,
                            '认证成功次数':true,
                            '认证失败次数':true,
                            '认证成功率':true
                        }
                    }
                    if(this.queryConditions === '201'){
                         this.echartsAPNLineSelected = {
                            //APN
                            '认证总次数':true
                        }
                    }
                    if(this.queryConditions === '202'){
                         this.echartsAPNLineSelected = {
                            //APN
                            '认证成功次数':true
                        }
                    }
                    if(this.queryConditions === '203'){
                         this.echartsAPNLineSelected = {
                            //APN
                            '认证失败次数':true
                        }
                    }
                    if(this.queryConditions === '204'){
                         this.echartsAPNLineSelected = {
                            //APN
                            '认证成功率':true
                        }
                    }
            }
        }
    
    
    }

}
</script>
<style>
.radius-echarts .el-range-separator{
    width:120px;
}
.switch-component{
    position: relative;
    width: 60px;
    height: 30px;
    background-color: #dadada;
    border-radius: 30px;
    border: none;
    outline: none;
    -webkit-appearance: none;
    transition: all .2s ease;
}
.switch-component::after{
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    width: 50%;
    border-radius: 50%;
    background: #fff;
    transition: all .2s ease;
}
.switch-component:checked{
    background-color: aqua;
}
.switch-component:checked::after{
    left:50%;
}
canvas{
    width: 1000px !important;
}
input[type=range]{ 
		 margin-top: 8px;
	         outline: none; 
		 -webkit-appearance: none;/*清除系统默认样式*/  
		 width:56% !important;  
		 background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;  
	         background-size: 30% 100%;/*设置左右宽度比例*/  
		height: 3px;/*横条的高度*/  
} 
 /*拖动块的样式*/  
   input[type=range]::-webkit-slider-thumb {  
	 -webkit-appearance: none;/*清除系统默认样式*/  
	height:16px;/*拖动块高度*/  
        width: 16px;/*拖动块宽度*/  
        background: #fff;/*拖动块背景*/  
	border-radius: 50%; /*外观设置为圆形*/  
	 border: solid 1px #ddd; /*设置边框*/  
   }
   #box{
       position: absolute;
       left: 50%;
    transform: translatex(-50%);
       width:200px;
       height: 200px;
       background: #61bd12;
   }
</style>
