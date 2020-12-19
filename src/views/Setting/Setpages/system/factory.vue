<template>
   <div class="factory" >
        <div class="header" >
            <div class="set" >恢复出厂设置</div>  
            <div class="set-line" >
                <img class="img-auto" src="../../img/Line1.png" alt="">
            </div>
            <div class="set-right" >
                <img src="../../img/icon-wifi-1.png" alt="">
            </div>
        </div> 
        <div class="factory-container" >
            <div class="container-top" >
                <div class="container-top-img" >
                    <img class="img-auto"  src="../../img/21.png" alt="">
                </div>
            </div>
            <div class="container-bottom" >
                <p class="yiwang" >已完成30%</p>
                <div class="proess" >
                    <div class="proess-box" ></div>
                </div>
                <div class="bottom-text" >恢复成功后,设备将自动重启</div>
            </div>
        </div>
        
   </div>
</template>

<script>
export default {
   data () {
      return {

      };
   },

   components: {},

   computed: {},

   methods: {}
}
</script>
<style lang='css' scoped>
    .img-auto{
        width: 100%;
        height: auto;
    }
    /* header  start*/
    .Bdsb{
        color: white;
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
    .set-left{
        width: 10px;
        height: 10px;
        position: absolute;
        left: 20px;
        top: 20px;
    }
    .set-line{
        bottom: 0px;
        position: absolute;
    }
    .set-right{
        position: absolute;
        right: 20px;
        top: 20px;
    }
    /* header end */
    /* container start */
    .factory-container{
        width: 855px;
        height: 390px;
        position: relative;
        box-sizing: border-box;
        background: black;
    }
    .factory-container .container-top{
        width: 548px;
        height: 275px;
    }
    .container-top-img{
        width: 145px;
        height: 145px;
        left: 355px;
        top: 80px;
        position: absolute;
    }
    .container-bottom{
        padding-left: 20px;
        box-sizing: border-box;
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
        width: 30%;
        height: 100%;
        background-size: 100% 100%;
        border-radius: 8px;
        background-image: url('../../img/Rectangle.png');
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
</style>