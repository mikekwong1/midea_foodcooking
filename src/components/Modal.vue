<template>
    <div class="modal-backdrop">
        <div class="modal" >
            <div class="top" @click="closeSelf" >
                <img src="../assets/header_icon/iconCancel.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        closeSelf() {
            this.$emit("closeme");      
        }
    }
}
</script>

<style>
.modal-backdrop { 
    position: absolute; 
    top: 0; 
    right: 0; 
    bottom: 0; 
    left: 0; 
    background-color: rgba(0,0,0,.7); 
    display: flex; 
    justify-content: center; 
    align-items: center; 
}
.modal { 
    background: url('../assets/header_icon/DialogBox.png');
    background-size: 100% 100%;
    overflow-x:auto; 
    display: flex; 
    flex-direction: column;
    width: 705px;
    height: 380px;
    position: relative;
    z-index: 900;
} 
.top{
    position: absolute;
    right: 30px;
    top: 30px;
}
</style>