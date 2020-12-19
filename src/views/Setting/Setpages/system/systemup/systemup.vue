<template>
    <!-- v-show="status == 0" -->
  <div  >
        <div class="header"  >
            <div class="left-back" @click="leftback" >
                <img  class="img-auto" src="@/views/Setting/img/return.png" alt="">
            </div>
            <div class="set" >系统升级</div>  
            <div class="right-wifi" >
                 <img src="@/views/Setting/img/icon-wifi-1.png" alt=""> 
            </div>
            <div class="set-line" >
                <img class="img-auto" src="@/views/Setting/img/Line1.png" alt="">
            </div>
        </div>
        <div class="systemup-container" v-if="status == 0"   >
            <p class="footup-text" >发现新增食谱 &nbsp; 版本号: V2.0.1</p>
            <div class="footup-next" >
                <p class="" >1.新增烹饪锅高温洗，和面功能等等</p>
                <p class="" >2.提升了系统的流畅度</p>
                <p class="" >3.</p>
            </div>
            <button class="bottom-up" @click="up" >立即升级</button>
        </div>
        <div class="systemup-container" v-else-if="status == 1" >
            <div class="footup-top">
                <p>发现新版系统</p>
                <p>版本号:V2.0.1</p>
             </div>    
             <div class="footup-img" >
                 <img class="img-auto" src="@/views/Setting/img/system upgrade.png" alt="">
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
// import {queue} from "@/lib/util"
// import request from "@/lib/request.js"
// import {downloadOTA} from "@/lib/download.js"
export default {
    data(){
        return{
            status:0,
            num: 0,
            info:{},
        }
        
    },
    created(){
        var timer =setInterval(()=>{
            this.num++;
            if(this.num>100){
                clearInterval(timer)
            }

        },200)

    },
    methods:{
        leftback(){
            this.$router.go(-1)
        },up(){
            console.log("this.plugin",this.plugin)
            this.status = 1
            var sucess=()=>{
                console.log("下载成功");
                this.num=0;
                this.upgrade();
            }
            var p=(i)=>{
                this.num=i;
            }
            var error=(e)=>{
                console.log(e);
                //this.downloadState = 5;
                //this.plugin.remove(process.env.VUE_APP_OTA_URL+this.info.filename);
            }
            downloadOTA({
                //url:this.info.url,
                //name:this.info.filename,
                //md5:this.info.md5,
                //filepath:process.env.VUE_APP_OTA_URL,
            })
            // ,this.$store.state.token,this.plugin,sucess,error,p
        }, 
        upgrade(){
            // if(window.iBrowser){
            //      if(this.plugin.$_send().findFile()){

            //      }
            // }
        }   
    // download() {
    //   console.log("download...");
    //   
    //   var error=(e)=>{
    //     console.log(e);
    //     this.downloadState = 5;
    //     this.plugin.remove(process.env.VUE_APP_OTA_URL+this.info.filename);
    //   }
    //   var p=(i)=>{
    //     this.num=i;
    //   }
    //   downloadOTA({
    //     url:this.info.url,
    //     name:this.info.filename,
    //     md5:this.info.md5,
    //     filepath:process.env.VUE_APP_OTA_URL,
    //   },
    //   this.$store.state.token,this.plugin,sucess,error,p)
    //   this.state = 3;
    // },
    // upgrade(){
    //   if(window.iBrowser){
    //     if(this.plugin.$_send().findFile(this.info.filename)){
    //       var callback=(obj)=>{
    //         console.log(JSON.stringify(obj))
    //         if(obj.speed=="timeout"){
    //           console.log("升级失败.....");
    //           return;
    //         }
    //         this.num=obj.speed;
    //         if(obj.receiveover==true){
    //           console.log("升级成功.....");
    //         }
    //       }
    //     console.log("开始检查升级。。。");
    //     this.plugin.$_send(this.info.filename=="mcu.bin"?"mcu_update":"motor_update",callback);
    //     }
    //   }
    //   else{
    //     this.plugin.$_send().findFile(this.info.filename)
    //   }
    // },
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
    .systemup-container{
        width: 855px;
        height: 390px;
        width: 855px;
        background: black;
        padding-left: 33px;
        box-sizing: border-box;
        position: absolute;
    }
    .systemup-container p{
        font-size: 26px;
    }
    .footup-img {
        padding-left: 20px;
        left:    345px;
        bottom: 167px;
        width: 150px;
        height: 150px;
        box-sizing: border-box;
        position: absolute;
    }
    .systemup-top{
        font-size: 26px;
        /* margin: 22px auto; */
        color: #A8A8A8;
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
    .footup-top{
        color: #FFFFFF;
        top: 16px;
        left: 15px;
        position: absolute;
    }
    /* container end */


    /*  status == 1 state */
    .proess{
        width: 794px;
        height: 16px;
        border-radius: 8px;
        left: 30px;
        bottom: 87px;
        background-color: #191208;
        position: absolute;
    }
    .proess .proess-box{
        /* width: 30%; */
        height: 100%;
        background-size: 100% 100%;
        border-radius: 8px;
        background-image: url('../../../img/Rectangle.png');
        background-repeat: no-repeat;
        background-position: center;
    }
    /*  status == 1 end */
</style>