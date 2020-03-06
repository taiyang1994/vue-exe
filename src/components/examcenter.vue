<template>
  <div id="myApp">
    <div class="statusbar-overlay"></div>
              <div class="page-content my-page-content">
                <div class="exam-title row">
                  <div class="col-50">
                    <span id="current_quest_type">11111</span>（每题5分）
                  </div>
                  <div class="col-50">
                    <span id="current-title">{{pageIndex}}/{{questionList.length}}</span>
                  </div>
                </div>
                <!--  v-for="(quest,index) in questList" :key="index" -->
                <div class="exam-content">
                  <div class="swiper-container" id="swiper-list">
                    <swiper
                      :options="swiperOption"
                      ref="mySwiper"
                      class="swiper-wrapper"
                    >
                      <swiper-slide
                        class="swiper-slide"
                        v-for="(item,index) in questionList"
                        :key="index"
                      >
                        <div class="list-block exam-list-block">
                          <ul>
                            <li class="exam-question">{{item.question}}</li>         
                            <li
                              class="answer"
                              v-for="(answer,objName) in item.answerObj"
                              :key="objName"
                              :ref="'liChecked' + objName + index"
                            >
                            <label>
                              <input type="radio" :value="objName" :name="index"  @click="handleNextquestion(objName,index)"/>
                                {{answer}}
                            </label>
                            </li>
                          </ul>
                        </div>

                        <div class="swiper-pagination" slot="pagination"></div>
                        <div class="exam-footer row">
                          <div class="col-25">
                            <div v-if="index>0" class="pre-test swiper-button-prev" id="pre-btn">
                              <i class="f7-icons">left</i>
                              <span>上一题</span>
                            </div>
                          </div>
                          <div class="col-50" >
                            <div class="over-time">
                              <i class="f7-icons">alarm</i>
                              <span id="total-time">00:00</span>
                            </div>
                          </div>
                          <div class="col-25">
                            <div class="next-test swiper-button-next" id="next-btn" v-if="rightNavigationText == '下一题'">
                              <span>{{rightNavigationText}}</span>
                              <i class="f7-icons">right</i>
                            </div>

                            <div class="submit-btn next-test swiper-button-next" @click="exitExam">
                              <span>完成考试</span>
                              <i class="f7-icons">right</i>
                            </div>
                          </div>
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Picker, Toast, MessageBox, Indicator, Checklist } from "mint-ui";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import $$ from "jquery";
$$(function() {
  $$(".exit-btn").on("click", function() {
    alert(1);
    MessageBox.confirm("是否退出考试？", "提示", {
      confirmButtonText: "确定",
      showCancelButton: false,
      type: "warning",
      center: true
    }).then(action => {
      toIndex();
    });
  });
});

export default {
  data() {
    return {
      pageIndex: 1,
      rightNavigationText: "下一题",
      questionList: [
        {
          question: "今天你是圣诞老人吗",
          answerObj: {
            a: "是的",
            b: "不是",
            c: "其实我是隔壁老王",
            d: "绿就完事了"
          }
        },
        {
          question: "今天你是圣诞老人吗",
          answerObj: {
            a: "是的",
            b: "不是",
            c: "其实我是隔壁老王",
            d: "绿就完事了"
          }
        },
        {
          question: "今天你是圣诞老人吗",
          answerObj: {
            a: "是的",
            b: "不是",
            c: "其实我是隔壁老王",
            d: "绿就完事了"
          }
        },
        {
          question: "今天你是圣诞老人吗",
          answerObj: {
            a: "是的",
            b: "不是",
            c: "其实我是隔壁老王",
            d: "绿就完事了"
          }
        },
        {
          question: "今天你是圣诞老人吗",
          answerObj: {
            a: "是的",
            b: "不是",
            c: "其实我是隔壁老王",
            d: "绿就完事了"
          }
        },
        {
          question: "今天你是圣诞老人吗",
          answerObj: {
            a: "是的",
            b: "不是",
            c: "其实我是隔壁老王",
            d: "绿就完事了"
          }
        },
        {
          question: "今天你是圣诞老人吗",
          answerObj: {
            a: "是的",
            b: "不是",
            c: "其实我是隔壁老王",
            d: "绿就完事了"
          }
        },
        {
          question: "今天你是圣诞老人吗",
          answerObj: {
            a: "是的",
            b: "不是",
            c: "其实我是隔壁老王",
            d: "绿就完事了"
          }
        }
      ],
      swiperOption: {
        pagination: ".swiper-pagination", //分页器挂载到swiper-pagination类对应的元素上
        notNextTick: true,
        navigation: {
          nextEl: ".swiper-button-next", //前进按钮的css选择器或HTML元素。
          prevEl: ".swiper-button-prev", //后退按钮的css选择器或HTML元素。
          hideOnClick: true, //点击slide时显示/隐藏按钮
          disabledClass: "my-button-disabled", //前进后退按钮不可用时的类名。
          hiddenClass: "my-button-hidden" //按钮隐藏时的Class
        },
        loop: false, //开启轮播图前后循环模式
        autoplayDisableOnInteraction: false,
        on: {
          //监听滑动切换事件，返回swiper对象
          slideChange: () => {
            let swiper = this.$refs.mySwiper.swiper;
            this.pageIndex = swiper.activeIndex + 1;
            if(this.pageIndex === this.questionList.length) {
                this.rightNavigationText = "完成考试"
            }else{
              this.rightNavigationText = "下一题"
            }
          }
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    //this.interVal();
    // this.exitExam()
    //this.list=this.getAnswer()
  },
  methods: {
    exitExam() {
         MessageBox.confirm("是否完成考试？", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
          center: true
        }).then(action => {
          var list = this.getAnswer();
          var temp = "";
          var flag = false;
          var i = 0;
          for (k in list) {
            if (list[k] == "") {
              temp += parseInt(k, 10) + 1 + "、";
              flag = true;
              i++;
            }
          }
          if (flag) {
            temp = temp.substr(0, temp.length - 1);
            MessageBox.confirm(
              "您还有" +
                i +
                '道题（<span style="word-break:break-all; overflow:auto">题号：' +
                temp +
                "</span>）没有作答，请确认是否提交",
              "提示",
              {
                confirmButtonText: "确定",
                showCancelButton: false,
                type: "warning",
                center: true
              }
            ).then(action => {
              Indicator.open({
                text: "正在提交数据，请稍后...",
                spinnerType: "fading-circle"
              });
              console.log(list);
              //location.href = 'examover.html';
              this.$router.push({ name: "examend" });
              document.getElementById("examCommitForm").submit();
            });
          } else {
            Indicator.open({
              text: "正在提交数据，请稍后...",
              spinnerType: "fading-circle"
            });
            //location.href = 'examover.html';
            document.getElementById("examCommitForm").submit();
          }
        });
    },
    handleNextquestion (objName,index) {
      setTimeout( () => {
      this.swiper.slideNext();
      },300)
    },
    interVal() {
      var totalTime = 0;
      var time_box = $$("#total-time");
      var total_time_hidden = $$("#total-time-hidden");
      time();
      function time() {
        totalTime++;
        var m = Math.floor(totalTime / 60);
        var s = totalTime % 60;
        if (m < 10) {
          m = "0" + m;
        }
        if (s < 10) {
          s = "0" + s;
        }
        time_box.text(m + ":" + s);
        total_time_hidden.val(m + ":" + s);
        time_box.attr("data-time", totalTime);
        if (totalTime == 1500) {
          MessageBox("提示", "考试时间剩余5分钟");
          setTimeout(time, 1000);
        } else if (totalTime >= 1800) {
          var that = this;
          MessageBox("提示", "考试时间到");
          var list = that.getAnswer();
          // 提交答案
          setTimeout(function() {
            //location.href = 'examover.html';
            document.getElementById("examCommitForm").submit();
          }, 1000);
          return true;
        } else {
          setTimeout(time, 1000);
        }
      }
    },
    getAnswer() {
      var list_temp = $$("#swiper-list .swiper-slide");
      var answer_list = {};
      for (var k = 0; k < 20; k++) {
        answer_list[k] = "";
      }
      list_temp.each(function(index, value) {
        var temp = $$(value).find("input");
        temp.each(function(i, v) {
          if ($$(this).prop("checked") == true) {
            answer_list[index] = $$(this).val();
          }
        });
      });
      return answer_list;
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>
<style scoped>
.myApp {
  overflow: hidden;
}
.statusbar-overlay {
  background: #f7f7f8;
  z-index: 10000;
  position: absolute;
  left: 0;
  top: 0;
  height: 20px;
  width: 100%;
  display: none;
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
}
.views {
  overflow: auto;
}
.view {
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
}
.views,
.view {
  position: relative;
  height: 100%;
  z-index: 5000;
}
.pages {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
body {
  font-family: -apple-system, SF UI Text, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  margin: 0;
  padding: 0;
  color: #000;
  font-size: 14px;
  line-height: 1.4;
  width: 100%;
  background: #fff;
  overflow: hidden;
}
.page {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #efeff4;
  transform: translate3d(0, 0, 0);
}
.page > .navbar,
.view > .navbar,
.views > .navbar,
.page > .toolbar,
.view > .toolbar,
.views > .toolbar {
  position: absolute;
}
.my-navbar {
  background-color: #f5f5f5 !important;
}
.navbar {
  left: 0;
  top: 0;
}
.navbar,
.toolbar,
.subnavbar {
  background: #f7f7f8;
}
.navbar,
.toolbar {
  height: 44px;
  width: 100%;
  box-sizing: border-box;
  font-size: 17px;
  position: relative;
  margin: 0;
  z-index: 500;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.my-navbar .navbar-inner {
  padding-left: 12px;
  padding-right: 12px;
  background: #fe5958;
  color: #ffffff;
}
.navbar-inner,
.toolbar-inner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar .left {
  margin-right: 10px;
}
.navbar .left,
.navbar .right {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transform: translate3d(0, 0, 0);
}
.index-exit,
.exit-btn {
  padding-right: 16px;
}
.index-exit,
.index-share,
.exit-btn {
  height: 100%;
}
.my-navbar .navbar-inner i {
  font-size: 23px;
}
.f7-icons,
.framework7-icons {
  font-family: "Framework7 Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 25px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga";
  text-align: center;
}
.navbar .center {
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  margin: 0;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 44px;
  flex-shrink: 10;
  display: flex;
  align-items: center;
}
.navbar-through .page-content,
.navbar-fixed .page-content {
  padding-top: 44px;
}
.my-page-content {
  overflow: hidden;
}
.page-content {
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  z-index: 1;
}
.exam-title {
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
}
.row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
}
.row .col-50 {
  width: 50%;
  width: calc((100% - 15px * 1) / 2);
}
.row > [class*="col-"] {
  box-sizing: border-box;
}
.exam-title > div:nth-child(2) {
  text-align: right;
}
.exam-title > div:nth-child(2) {
  text-align: right;
}
.exam-content {
  position: absolute;
  top: 76px;
  width: 100%;
  bottom: 0;
  background: #fff;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-container {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.swiper-container-android .swiper-slide,
.swiper-wrapper {
  transform: translate3d(0, 0, 0);
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  width: 440px;
}
.exam-list-block {
  padding: 0 15px;
}
.list-block {
  margin: 35px 0;
  font-size: 17px;
}
.list-block ul {
  background: #fff;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}
.list-block li {
  box-sizing: border-box;
  position: relative;
}
.exam-question {
  padding: 0 0 12px 0;
  font-size: 16px;
}
a,
input,
textarea,
select {
  outline: 0;
}
.answer {
  padding: 8px 0;
  font-size: 14px;
}
.exam-content input[type="radio"] {
  position: relative;
  top: 2px;
}
.answer label {
  padding-left: 6px;
}
.exam-footer {
  border-top: 1px solid #fafafa;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 36px;
  padding: 0 15px;
  box-sizing: border-box;
  background: #efeff4;
}
.row .col-25 {
  width: 25%;
  width: calc((100% - 15px * 3) / 4);
}
.swiper-button-next.swiper-button-disabled,
.swiper-button-prev.swiper-button-disabled {
  opacity: 1;
  cursor: auto;
  pointer-events: none;
}
.exam-footer .pre-test,
.exam-footer .next-test,
.exam-footer .over-time {
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.swiper-button-next,
.swiper-button-prev {
  position: static;
  width: 100%;
  height: 100%;
  margin-top: 0px;
  z-index: 0;
  cursor: pointer;
  background-size: 27px 44px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: none;
}
.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  left: 10px;
  right: auto;
}
.pre-test i,
.next-test i {
  font-size: 12px;
}
.over-time i {
  font-size: 22px;
  position: relative;
  top: 3px;
}
.submit-btn {
  font-size: 14px;
  line-height: 36px;
}
</style>