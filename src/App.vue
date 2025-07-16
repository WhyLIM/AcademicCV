<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 导航菜单激活项
const activeIndex = ref('1')

// 控制导航栏显示/隐藏
const isNavVisible = ref(true)
const lastScrollTop = ref(0)

// 处理滚动事件
const handleScroll = () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

  // 如果向下滚动超过50px，隐藏导航栏
  if (currentScrollTop > lastScrollTop.value && currentScrollTop > 50) {
    isNavVisible.value = false
  } else {
    // 向上滚动，显示导航栏
    isNavVisible.value = true
  }

  lastScrollTop.value = currentScrollTop
}

// 处理菜单点击事件，滚动到对应的锚点
const handleSelect = (key) => {
  const element = document.getElementById(key)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 组件挂载时添加滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 组件卸载前移除滚动监听
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <el-container>
    <el-header :class="{ 'nav-hidden': !isNavVisible }">
      <el-menu :default-active="activeIndex" class="nav-menu" mode="horizontal" @select="handleSelect"
        background-color="#ffffff" text-color="#2c3e50" active-text-color="#1565C0">
        <div class="logo-container">
          <h2 class="logo-text">Min Li</h2>
        </div>
        <el-menu-item index="home">Home</el-menu-item>
        <el-menu-item index="skills">Skills</el-menu-item>
        <el-menu-item index="experience">Experience</el-menu-item>
        <el-menu-item index="publications">Publications</el-menu-item>
        <el-menu-item index="projects">Projects</el-menu-item>
        <el-menu-item index="accomplishments">Accomplishments</el-menu-item>
        <el-menu-item index="contact">Contact</el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
      <RouterView />
    </el-main>

    <el-footer>
      <div class="footer-content">
        <p>© {{ new Date().getFullYear() }} Min Li. All Rights Reserved.</p>
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped>
/* 导航栏样式 */
.el-header {
  padding: 0;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.logo-text {
  font-weight: bold;
}

/* 导航栏隐藏时的样式 */
.nav-hidden {
  transform: translateY(-100%);
}

.el-menu-item {
  font-size: 16px;
}

.nav-menu {
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: center;
}

.logo-container {
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.logo-text {
  color: #1565C0;
  margin: 0;
}

/* 主内容区样式 */
.el-main {
  padding: 80px 20px 20px;
  min-height: calc(100vh - 120px);
}

/* 页脚样式 */
.el-footer {
  height: 60px;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-content {
  text-align: center;
  color: #606266;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .nav-menu {
    flex-wrap: wrap;
  }

  .el-main {
    padding-top: 120px;
  }
}

</style>
