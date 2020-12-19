<template>
  <div>
      <div class="header" >
            <div class="left-back" @click="leftback"  >
                <img  class="img-auto" src="../../img/return.png" alt="">
            </div>
            <div class="set" >{{title_top[ActiveIndex].title}}</div>  
            <div class="right-wifi" >
                  <img src="../../img/icon-wifi-1.png" alt="">  
            </div>
            <div class="set-line" >
                <img class="img-auto" src="../../img/Line1.png" alt="">
            </div>
        </div>
        <!-- 触摸包裹层 -->
        <div class="container" @mousedown="m_down" @mouseup="m_up"  >
            <!-- 移动层 -->
            <div  ref="move_wraper" class="set_wraper" >
                <div   class=" set_item" v-for="(item,index) in setmsg " :key="index"  >
                    <img  ref="myimgs" draggable="false" class="img-auto"  :src="item.src" alt="">
                </div>
                <!-- v-show="ActiveIndex==index" -->
            </div>
            <div class="bottom-bar" >
                <div class="bottom-line " :class="ActiveIndex==0 ? 'active' : ''"  ></div>
                <div class="bottom-line " :class="ActiveIndex==1 ? 'active' : ''" ></div>
                <div class="bottom-line " :class="ActiveIndex==2 ? 'active' : ''"  ></div>
                <div class="bottom-line " :class="ActiveIndex==3 ? 'active' : ''"   ></div>
                <div class="bottom-line " :class="ActiveIndex==4 ? 'active' : ''"   ></div>
                <div class="bottom-line " :class="ActiveIndex==5 ? 'active' : ''"   ></div>
                <div class="bottom-line " :class="ActiveIndex==6 ? 'active' : ''"  ></div>
                <div class="bottom-line " :class="ActiveIndex==7 ? 'active' : ''"  ></div>
                
            </div>
        </div>
  </div>
</template>

<script>
// import Headers from '@/components/Header.vue'
export default {
    // components: { Headers },
    data(){
        return{
            title_top:[{title:"烹饪模式说明"},{title:"称重说明"},{title:"菜谱快速查看说明"},{title:"智能NFC使用说明"},{title:"开机说明"},{title:"配件使用说明"},{title:"配件使用说明"},{title:"电子说明书及服务热线"}],       
            setmsg:[{
                src:require('../../img/New guidance1.png')
            },{
                src:require('../../img/New guidance2.png')
            },{
                src:require('../../img/New guidance3.png')
            },{
                src:require('../../img/New guidance4.png')
            },{
                src:require('../../img/New guidance5.png')
            },{
                src:require('../../img/New guidance6.png')
            },{
                src:require('../../img/New guidance5.png')
            },{
                src:require('../../img/New guidance8.png')
            }],   
            //当前活动的图表
            ActiveIndex:0,
            // 初始translateX
            transX:0,
            isMove:false,
            isDown:false,
            Down_e:null
        }
    },
    methods:{
        leftback(){
            this.$router.go(-1);
        },
         m_down(e){

           this.isDown = true;
           this.isMove = false;
            //记录点击的时候的event
            this.$refs.move_wraper.style['transition'] = 'none'
            this.Down_e = e;

            var moveWraper = this.$refs.move_wraper;
            console.log("moveWraper",moveWraper)
            var styles = getComputedStyle(moveWraper);
            console.log("styles",styles)
            var stylesArr = styles['-webkit-transform'].split(',')
            console.log("styleArr",stylesArr)
            this.transX  = parseInt(stylesArr[4])
            console.log("this.transX",this.transX)
            window.addEventListener('mousemove',this.m_move)
            window.addEventListener('mouseup',this.m_up)
       },
       m_move(e){
           this.isMove =true;
            //计算鼠标移动的距离
            var moveX = e.pageX - this.Down_e.pageX;
            //判断那moveX是不是
            var xx = moveX + this.transX; 
            this.$refs.move_wraper.style['-webkit-transform'] = 'translateX('+xx+')'
       },
       m_up(e){
           //console.log(e)
           if(!this.isDown)return;
            //判断moveX是不是大于20px
            var endupX = e.pageX - this.Down_e.pageX;
            if(endupX < -30){
                this.ActiveIndex++;
            }else if(endupX > 30){
                this.ActiveIndex--;
            }
            
            this.ActiveIndex = this.ActiveIndex < 0 ? 0 :this.ActiveIndex;
            this.ActiveIndex = this.ActiveIndex > this.setmsg.length -1 ? this.setmsg.length -1 :this.ActiveIndex;

            var ed_style = 157 - 900*this.ActiveIndex; 

            this.$refs.move_wraper.style['transition'] = '-webkit-transform 0.3s'
            this.$refs.move_wraper.style['-webkit-transform']  = 'translateX(' + ed_style + 'px)'

            window.removeEventListener('mousemove', this.m_move);
            window.removeEventListener('mouseup', this.m_up);
       }
    }
}
</script>

<style>
     .img-auto{
        width: 100%;
        height: auto;
    }
    /* header start */
    .caozuo{
        color: white;
        position: relative;
    }
    .set{
        text-align: center;
        line-height: 90px;
    }
    .header{
        width: 854px;
        height: 90px;
        font-size: 32px;
        color:#FFFFFF;
        background-color: #070400;
        position: relative;
    }
     .header>.left-back{
        width: 30px;
        height: 30px;
        left: 30px;
        top: 30px;
        position: absolute;
       
    } 
    .header>.right-wifi{
        right: 30px;
        top: 25px;
        position: absolute;
        
    } 
    .set-line{
        bottom: 0px;
        position: absolute;
    }
    .Setindex-nav{
        display: -webkit-flex;
        -webkit-flex-direction: row;
        -webkit-justify-content:space-around;
        height: 70px;
        position: relative;
    }
    .Setindex-button{
        -webkit-flex: 1;
        height: 70px;
        width: 170px;
        line-height: 70px;
        opacity: 0.3;
        font-size: 32px;
        text-align: center;
        color: white;
        background: #1B1001;
        box-sizing: border-box;
    }
    /* header end */
    /* container start */
    .container{
        width: 100%;
        height: 390px;
        left: 0px;
        background-color: #070400;
        overflow: hidden;
        position: absolute;
    }
    .set_wraper{
        width: 8000px;
        transform: translateX(157px);
        -webkit-transform: translateX(157px);
    }
    .set_wraper>div{
        margin-left: 300px;
    }
    .set_wraper>div:nth-child(1){
        margin-left: 0px;
    }
    .set_item{
        float: left;
        width: 600px;
        height: 150px;
    }
    /* container end */
    /* container start */
    .bottom-bar{
        bottom: 20px;
        left: 200px;
        position: absolute;
       
    }
    .bottom-line{
        width: 40px;
        height: 3px;
        margin-left:20px ;
        float: left;
        background: white;
    }
    .bottom-line.active{
        background-color: #F28E03;
    }
    /* container end */
</style>