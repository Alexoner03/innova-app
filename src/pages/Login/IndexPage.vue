<template>
  <div class="relative-position">
    <div style="z-index: 1" class="page-size bg absolute"></div>
    <div style="z-index: 2" class="page-size blur absolute"></div>
    <div style="z-index: 3" class="page-size page-content absolute">
      <div class="flex column justify-center items-center" style="height: 100%">
        <h1>INNOVA</h1>
        <div class="q-px-xl" style="width: 100%">
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "pages/Login/components/LoginForm.vue";
</script>

<style scoped>
.page-size {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

.bg {
  background: url("bg.jpg") no-repeat center;
  background-size: cover;
}

.blur {
  backdrop-filter: blur(5px) grayscale(70%);
}

h1 {
  font-family: "Poppins", sans-serif;
  color: #fff;
  font-size: 8em;
  font-weight: 700;
  text-shadow: #FFF 0px 0px 5px,
  #FFF 0px 0px 10px,
  #FFF 0px 0px 15px,
  #ff9d2d 0px 0px 5px,
  #ff9d2d 0px 0px 10px,
  #ff9d2d 0px 0px 20px,
  #ff9d2d 0px 0px 30px,
  #ff9d2d 0px 0px 45px;
}

</style>
