<template>
  <div class="footup" >
        <div class="header" >
            <div class="left-back" @click="leftback" >
                <img  class="img-auto" src="@/views/Setting/img/return.png" alt="">
            </div>
            <div class="set" >食谱升级</div>  
            <div class="right-wifi" >
                 <img src="@/views/Setting/img/icon-wifi-1.png" alt=""> 
            </div>
            <div class="set-line" >
                <img class="img-auto" src="@/views/Setting/img/Line1.png" alt="">
            </div>
        </div>
        <div class="footup-container"  v-show="status == 0" >
            <p class="footup-text" >发现新增食谱 &nbsp; 版本号: V2.0.1</p>
            <div class="footup-next" >
                <p class="" >发现了新的30道食谱:</p>
                <p class="" >烧花鸭、红烧肉、清炒秋葵、清蒸石斑鱼、麻婆豆腐、</p>
                <p class="" >烧花鸭、清炒秋葵、清蒸石斑鱼、麻婆豆腐、烧花鸭、</p>
                <p class="" >红烧肉、清炒秋葵、清蒸石斑鱼、麻婆豆腐…</p>
            </div>
            <button class="bottom-up"  @click="up" >立即升级</button>
        </div>
        <div class="footup-container" v-show="status == 1" >
               <div class="footup-top">
                <p>发现新增食谱</p>
                <p>版本号:V2.0.1</p>
             </div>    
             <div class="footup-img" >
                 <img class="img-auto" src="@/views/Setting/img/Recipe upgrade.png" alt="">
             </div>
            <div class="container-bottom" >
                <p class="yiwang" >已完成{{num}}%</p>
                <div class="proess" >
                    <div class="proess-box" :style="'width:'+num+'%'" ></div>
                </div>
                <div class="bottom-text" >恢复成功后,设备将自动重启</div> 
            </div>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            status:0,
            num:20
        }
    },
    methods:{
        leftback(){
            this.$router.go(-1)
        },up(){
            this.status = 1
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
    .footup-container{
        width: 855px;
        height: 390px;
        width: 855px;
        background: black;
        padding-left: 33px;
        box-sizing: border-box;
        position: absolute;
    }
    .footup-container p{
        font-size: 26px;
    }
    .footup-text{
        font-size: 26px;
        left: 30px;
        top: 22px;
        color: #A8A8A8;
        position: absolute;
    }
    .footup-next{
        position: absolute;
        top: 75px;
        left: 30px; 
    }
    .bottom-up{
        border: 0px;
        bottom: 33px;
        left: 337px;
        width: 180px;
        height: 80px;
        font-size: 32px;
        text-align: center;
        color: white; 
        background-color: #FF3F00 ;
        position: absolute;
    }
      .container-bottom .yiwang{
        font-size: 28px;
        left: 27.5px;
        bottom: 120px;
        color: white;
        position: absolute;   
    }
    .container-bottom .proess{
        width: 794px;
        height: 16px;
        border-radius: 8px;
        left: 30px;
        bottom: 87px;
        background-color: #191208;
        position: absolute;
    }
    .container-bottom .proess .proess-box{
        /* width: 30%; */
        height: 100%;
        background-size: 100% 100%;
        border-radius: 8px;
        background-image: url('../../../img/Rectangle.png');
        background-repeat: no-repeat;
        background-position: center;
    }
    .container-bottom .bottom-text{
        font-size: 28px;
        bottom: 31px;
        left: 245px;
        text-align: center;
        color: #F28E02;
        position: absolute;
    }
    .footup-top{
        left: 30px;
    }
     /* .proess-box{
        height: 100%;
        background-size: 100% 100%;
        border-radius: 8px;
        background-image: url('../../../img/Rectangle.png');
        background-repeat: no-repeat;
        background-position: center;
    } */
    /* container end */
</style>