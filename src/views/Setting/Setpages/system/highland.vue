<template>
    <div class="highland" >
        <div class="header" >
            <div class="left-back" @click="leftback" >
                <img  class="img-auto" src="../../img/return.png" alt="">
            </div>
            <div class="set" >高原模式</div>  
            <div class="right-wifi" >
                 <img src="../../img/icon-wifi-1.png" alt=""> 
            </div>
            <div class="set-line" >
                <img class="img-auto" src="../../img/Line1.png" alt="">
            </div>
        </div>
        <div class="gaoyuan-container" >
            <div class="container-left" >
                <div class="container-header" >
                    为了防止海拔电压变化导致食材不熟、溢出、糊底等问题，首次使用前或搬到海拔有较大变化的地区,建议进行，建议进行"高原模式"调节。
                </div>
                <p>.........................................................................................</p>
                <p class="tiaojie" >调节方法:</p>
                <p>1.放入破壁杯(其他杯种无效)</p>
                <p>2.加入约1.0~1.2L的水(不要添加任何食材)</p>
                <p>3.按开始调节，机器将自动加热至水沸腾,中途请勿操作机器</p>      
            </div>
            <div class="container-right" >
                <div class="line" ></div>
                <div class="container-button" >
                    <button v-show="buttons == 0" @click="clickbutton"  >开始调节</button>
                    <button v-show="buttons == 1" @click="clickbutton" >调节中</button>
                    <button v-show="buttons == 2" @click="clickbutton" class="wancheng" >完成</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
      return {
          buttons:0,
          showModal:false
      };
   },
   methods: {
       leftback(){
            this.$router.go(-1);
       },clickbutton(){
           this.buttons++;
           if(this.buttons==3){
               this.buttons = 0;
               this.showModal = !this.showModal;
           }  
       },closeme:function(){
            this.showModal = !this.showModal;
        }
   }
}
</script>

<style lang='css' scoped >
    /* header start */
    .highland{
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
        position: relative;
    }
     .header>.left-back{
        width: 30px;
        height: 30px;
        position: absolute;
        left: 30px;
        top: 30px;
    } 
    .header>.right-wifi{
        right: 25px;
        top: 25px;
        position: absolute;
        
    } 
    /* header end */
    /* container start */
    .gaoyuan-container{
        padding: 24px 30px;
        height: 390px;
        width: 855px;
        display: -webkit-flex;
        box-sizing: border-box;
        background: black;
    }
    .gaoyuan-container .container-left{
        font-size: 24px;
        width: 584px;
        float: left;
    }
    .tiaojie{
        margin-top: 19px;
        margin-bottom: 18px;
    }
    .container-right{
        width: 230px;
        top: 90px;
        left: 620px;
        height: 390px;
        position: absolute;
    }
    .container-right button{
        bottom: 42px;
        right: 20px;
        width: 180px;
        height: 80px;
        font-size: 32px;
        border: 0px;
        text-align: center;
        background-color: #7E0707;
        color: white;
        position: absolute;
        
    }
    .container-right button.wancheng{
        background-color: #FFA20D;
    }
    .container-right  .line{
        width: 3px;
        height: 100%;
        background: url('../../img/Line2.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;

    }
    /* container end */
</style>