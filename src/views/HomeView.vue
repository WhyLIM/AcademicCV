<!--
 * @Author: Mli-TB mli.bio@outlook.com
 * @Date: 2025-07-11 12:42:37
 * @LastEditors: Mli-TB mli.bio@outlook.com
 * @LastEditTime: 2025-07-26 20:07:44
 * @FilePath: \AcademicCV\src\views\HomeView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { ref, computed, onMounted } from 'vue'
import GithubCard from '@/components/GithubCard.vue'; // GitHub卡片组件
import githubService from '@/services/githubService.js'; // GitHub服务

// 导入所有数据
import {
  personalInfo,
  experiences,
  publications,
  accomplishments,
  contactInfo
} from '../data'

// 控制图片预览
const dialogVisible = ref(false)
const previewImage = ref('')

const showPreview = (image) => {
  previewImage.value = image
  dialogVisible.value = true
}

const loading = ref(true);
const error = ref(null);
const projects = ref([]);
const currentPagePublications = ref(1)
const currentPageProjects = ref(1)
const pageSize = ref(3)
const totalPublications = ref(publications.length)

const paginatedPublications = computed(() => {
  const start = (currentPagePublications.value - 1) * pageSize.value
  const end = start + pageSize.value
  return publications.slice(start, end)
})

const publicationPageChange = (page) => {
  currentPagePublications.value = page
  // 滚动到publications部分
  const publicationsSection = document.getElementById('publications')
  if (publicationsSection) {
    publicationsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const paginatedProjects = computed(() => {
  const start = (currentPageProjects.value - 1) * pageSize.value
  const end = start + pageSize.value
  return projects.value.slice(start, end)
})

const projectPageChange = (page) => {
  currentPageProjects.value = page
  // 滚动到projects部分
  const publicationsSection = document.getElementById('projects')
  if (publicationsSection) {
    publicationsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const openLink = (url) => {
  window.open(url, '_blank');
};

// 定义你想要显示的 GitHub 仓库列表
const repoList = [
  { owner: 'WhyLIM', repo: 'Drugbank_parse' },
  { owner: 'WhyLIM', repo: 'TTD_parse' },
  { owner: 'WhyLIM', repo: 'PersonalCV' },
  { owner: 'WhyLIM', repo: 'DTII' },
  { owner: 'WhyLIM', repo: 'ADDB' },
  { owner: 'WhyLIM', repo: 'E-utilities_zh-CN' },
  { owner: 'WhyLIM', repo: 'PhotoHub' },
  { owner: 'WhyLIM', repo: 'Graduation' },
  { owner: 'WhyLIM', repo: 'Notes-BioChem' },
  { owner: 'WhyLIM', repo: 'Notes-GBiology' }
];

onMounted(async () => {
  try {
    const results = await githubService.getMultipleReposInfo(repoList);
    projects.value = results;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="academic-cv">
    <!-- 个人信息部分 -->
    <section id="home" class="section biography-section">
      <div class="inner-container">
        <el-row :gutter="70">
          <el-col :xs="24" :sm="8" :md="6" class="avatar-col">
            <div class="avatar-container">
              <el-avatar :size="260" :src="personalInfo.avatar" />
              <h2 class="name">{{ personalInfo.name }}</h2>
              <div class="social-icons">
                <a :href="`mailto:${personalInfo.email}`" title="Email">
                  <font-awesome-icon :icon="['fas', 'envelope']" size="xl" style="color: #55ACD5" />
                </a>
                <a :href="personalInfo.googlescholar" target="_blank" title="GoogleScholar">
                  <font-awesome-icon :icon="['fab', 'google-scholar']" size="xl" style="color: #4285F4" />
                </a>
                <a :href="personalInfo.researchgate" target="_blank" title="ResearchGate">
                  <font-awesome-icon :icon="['fab', 'researchgate']" size="xl" style="color: #5BC9BB" />
                </a>
                <a :href="personalInfo.github" target="_blank" title="GitHub">
                  <font-awesome-icon :icon="['fab', 'github']" size="xl" style="color: #191717" />
                </a>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="16" :md="18">
            <div class="bio-container">
              <h1>Biography</h1>
              <p v-html="personalInfo.bio"></p>
              <div class="cv-buttons">
                <el-button color="#626aef" @click="openLink(personalInfo.cvEn)">
                  <font-awesome-icon :icon="['fas', 'file-arrow-down']" />&nbsp;&nbsp;Download CV
                </el-button>
                <el-button color="#626aef" @click="openLink(personalInfo.cvCn)">
                  <font-awesome-icon :icon="['fas', 'file-arrow-down']" />&nbsp;&nbsp;下载简历（中文）
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 技能部分 -->
    <section id="skills" class="section skills-section">
      <div class="inner-container">
        <h1 align="center">Skills</h1>
        <el-row :gutter="70">
          <!-- OS -->
          <el-col :xs="24" :sm="8" :md="8" class="skill-col">
            <h3>OS enthusiast</h3>
            <div>
              <img
                src="https://img.shields.io/badge/Windows%20XP-%235EC281?style=flat-square&logo=windows%20xp&logoColor=white" />
              <img
                src="https://img.shields.io/badge/Windows%207-%23E3F5FC?style=flat-square&logo=windows%20xp&logoColor=gray" />
              <img
                src="https://img.shields.io/badge/Windows%2010-%23009DF7?style=flat-square&logo=windows%2010&logoColor=white" />
              <img
                src="https://img.shields.io/badge/Windows%2011-%23E7FDFF?style=flat-square&logo=windows%2011&logoColor=gray" />
              <img src="https://img.shields.io/badge/Ubuntu-%23E95420?style=flat-square&logo=ubuntu&logoColor=white" />
              <img src="https://img.shields.io/badge/Zorin-%2315A6F0?style=flat-square&logo=zorin&logoColor=white" />
              <img
                src="https://img.shields.io/badge/Kali-%231B51AD?style=flat-square&logo=kali%20linux&logoColor=white" />
              <img src="https://img.shields.io/badge/CentOS-%23A14F8C?style=flat-square&logo=centos&logoColor=white" />
              <img src="https://img.shields.io/badge/Hackintosh-black?style=flat-square&logo=apple&logoColor=white" />
            </div>
          </el-col>
          <!-- Programming -->
          <el-col :xs="24" :sm="8" :md="8" class="skill-col">
            <h3>Programming language</h3>
            <div>
              <img src="https://img.shields.io/badge/PYTHON-%235A8693?style=flat-square&logo=python&logoColor=white" />
              <img src="https://img.shields.io/badge/R-%23D26E3A?style=flat-square&logo=r&logoColor=white" />
              <img src="https://img.shields.io/badge/HTML-%23EEA23B?style=flat-square&logo=html5&logoColor=white" />
              <img src="https://img.shields.io/badge/CSS-%23D8491D?style=flat-square&logo=css&logoColor=white" />
              <img
                src="https://img.shields.io/badge/JAVASCRIPT-%23855C3E?style=flat-square&logo=javascript&logoColor=white" />
              <img src="https://img.shields.io/badge/PHP-%23787CB5?style=flat-square&logo=php&logoColor=white" />
              <img src="https://img.shields.io/badge/VUE-%2342b883?style=flat-square&logo=vue.js&logoColor=white" />
              <img src="https://img.shields.io/badge/SQL-%23929BAC?style=flat-square&logo=mysql&logoColor=white" />
              <img src="https://img.shields.io/badge/GIT-%23F05032?style=flat-square&logo=git&logoColor=white" />
              <img src="https://img.shields.io/badge/SHELL-%23172639?style=flat-square&logo=shell&logoColor=white" />
            </div>
          </el-col>
          <!-- AI & LLM -->
          <el-col :xs="24" :sm="8" :md="8" class="skill-col">
            <h3>AI & LLM Tools</h3>
            <div>
              <img src="https://img.shields.io/badge/ChatGPT-412991?style=flat-square&logo=openai&logoColor=white" />
              <img src="https://img.shields.io/badge/Claude-D97757?style=flat-square&logo=claude&logoColor=white" />
              <img
                src="https://img.shields.io/badge/DeepSeek-000?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPkRlZXBTZWVrPC90aXRsZT48cGF0aCBkPSJNMjMuNzQ4IDQuNDgyYy0uMjU0LS4xMjQtLjM2NC4xMTMtLjUxMi4yMzQtLjA1MS4wMzktLjA5NC4wOS0uMTM3LjEzNi0uMzcyLjM5Ny0uODA2LjY1Ny0xLjM3My42MjYtLjgyOS0uMDQ2LTEuNTM3LjIxNC0yLjE2My44NDgtLjEzMy0uNzgyLS41NzUtMS4yNDgtMS4yNDctMS41NDgtLjM1Mi0uMTU2LS43MDgtLjMxMS0uOTU1LS42NS0uMTcyLS4yNDEtLjIxOS0uNTEtLjMwNS0uNzc0LS4wNTUtLjE2LS4xMS0uMzIzLS4yOTMtLjM1LS4yLS4wMzEtLjI3OC4xMzYtLjM1Ni4yNzYtLjMxMy41NzItLjQzNCAxLjIwMi0uNDIyIDEuODQuMDI3IDEuNDM2LjYzMyAyLjU4IDEuODM4IDMuMzkzLjEzNy4wOTMuMTcyLjE4Ny4xMjkuMzIzLS4wODIuMjgtLjE4LjU1Mi0uMjY2LjgzMy0uMDU1LjE3OS0uMTM3LjIxNy0uMzI5LjE0YTUuNTI2IDUuNTI2IDAgMDEtMS43MzYtMS4xOGMtLjg1Ny0uODI4LTEuNjMxLTEuNzQyLTIuNTk3LTIuNDU4YTExLjM2NSAxMS4zNjUgMCAwMC0uNjg5LS40NzFjLS45ODUtLjk1Ny4xMy0xLjc0My4zODgtMS44MzYuMjctLjA5OC4wOTMtLjQzMi0uNzc5LS40MjgtLjg3Mi4wMDQtMS42Ny4yOTUtMi42ODcuNjg0YTMuMDU1IDMuMDU1IDAgMDEtLjQ2NS4xMzcgOS41OTcgOS41OTcgMCAwMC0yLjg4My0uMTAyYy0xLjg4NS4yMS0zLjM5IDEuMTAyLTQuNDk3IDIuNjIzQy4wODIgOC42MDYtLjIzMSAxMC42ODQuMTUyIDEyLjg1Yy40MDMgMi4yODQgMS41NjkgNC4xNzUgMy4zNiA1LjY1MyAxLjg1OCAxLjUzMyAzLjk5NyAyLjI4NCA2LjQzOCAyLjE0IDEuNDgyLS4wODUgMy4xMzMtLjI4NCA0Ljk5NC0xLjg2LjQ3LjIzNC45NjIuMzI3IDEuNzguMzk3LjYzLjA1OSAxLjIzNi0uMDMgMS43MDUtLjEyOC43MzUtLjE1Ni42ODQtLjgzNy40MTktLjk2MS0yLjE1NS0xLjAwNC0xLjY4Mi0uNTk1LTIuMTEzLS45MjYgMS4wOTYtMS4yOTYgMi43NDYtMi42NDIgMy4zOTItNy4wMDMuMDUtLjM0Ny4wMDctLjU2NSAwLS44NDUtLjAwNC0uMTcuMDM1LS4yMzcuMjMtLjI1NmE0LjE3MyA0LjE3MyAwIDAwMS41NDUtLjQ3NWMxLjM5Ni0uNzYzIDEuOTYtMi4wMTUgMi4wOTMtMy41MTcuMDItLjIzLS4wMDQtLjQ2Ny0uMjQ3LS41ODh6TTExLjU4MSAxOGMtMi4wODktMS42NDItMy4xMDItMi4xODMtMy41Mi0yLjE2LS4zOTIuMDI0LS4zMjEuNDcxLS4yMzUuNzYzLjA5LjI4OC4yMDcuNDg2LjM3MS43MzkuMTE0LjE2Ny4xOTIuNDE2LS4xMTMuNjAzLS42NzMuNDE2LTEuODQyLS4xNC0xLjg5Ny0uMTY3LTEuMzYxLS44MDItMi41LTEuODYtMy4zMDEtMy4zMDctLjc3NC0xLjM5My0xLjIyNC0yLjg4Ny0xLjI5OC00LjQ4Mi0uMDItLjM4Ni4wOTMtLjUyMi40NzctLjU5MmE0LjY5NiA0LjY5NiAwIDAxMS41MjktLjAzOWMyLjEzMi4zMTIgMy45NDYgMS4yNjUgNS40NjggMi43NzQuODY4Ljg2IDEuNTI1IDEuODg3IDIuMjAyIDIuODkxLjcyIDEuMDY2IDEuNDk0IDIuMDgyIDIuNDggMi45MTQuMzQ4LjI5Mi42MjUuNTE0Ljg5MS42NzctLjgwMi4wOS0yLjE0LjExLTMuMDU0LS42MTR6bTEtNi40NGEuMzA2LjMwNiAwIDAxLjQxNS0uMjg3LjMwMi4zMDIgMCAwMS4yLjI4OC4zMDYuMzA2IDAgMDEtLjMxLjMwNy4zMDMuMzAzIDAgMDEtLjMwNC0uMzA4em0zLjExIDEuNTk2Yy0uMi4wODEtLjM5OS4xNTEtLjU5LjE2YTEuMjQ1IDEuMjQ1IDAgMDEtLjc5OC0uMjU0Yy0uMjc0LS4yMy0uNDctLjM1OC0uNTUyLS43NThhMS43MyAxLjczIDAgMDEuMDE2LS41ODhjLjA3LS4zMjctLjAwOC0uNTM3LS4yMzktLjcyNy0uMTg3LS4xNTYtLjQyNi0uMTk5LS42ODgtLjE5OWEuNTU5LjU1OSAwIDAxLS4yNTQtLjA3OGMtLjExLS4wNTQtLjItLjE5LS4xMTQtLjM1OC4wMjgtLjA1NC4xNi0uMTg2LjE5Mi0uMjEuMzU2LS4yMDIuNzY3LS4xMzYgMS4xNDYuMDE2LjM1Mi4xNDQuNjE4LjQwOCAxLjAwMS43ODIuMzkxLjQ1MS40NjIuNTc2LjY4NS45MTQuMTc2LjI2NS4zMzYuNTM3LjQ0NS44NDguMDY3LjE5NS0uMDE5LjM1NC0uMjUuNDUyeiIgZmlsbD0iIzRENkJGRSI+PC9wYXRoPjwvc3ZnPg==&logoColor=white" />
              <img
                src="https://img.shields.io/badge/Yuanbao-FFF?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPll1YW5iYW88L3RpdGxlPjxwYXRoIGQ9Ik0xMiAyNGM2LjYyNyAwIDEyLTUuMzczIDEyLTEyUzE4LjYyNyAwIDEyIDAgMCA1LjM3MyAwIDEyczUuMzczIDEyIDEyIDEyeiIgZmlsbD0idXJsKCNsb2JlLWljb25zLXl1YW5iYW8tZmlsbC0wKSI+PC9wYXRoPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyIDBjLjUxOCAwIDEuMDI4LjAzMyAxLjUyOC4wOTZBNi4xODggNi4xODggMCAwMTEyLjEyIDEyLjI4bC0uMTIuMDAxYy0yLjk5IDAtNS4yNDIgMi4xNzktNS41NTQgNS4xMS0uMjIzIDIuMDg2LjM1MyA0LjQxMiAyLjI0MiA2LjE0NkMzLjY3MiAyMi4xIDAgMTcuNDc5IDAgMTIgMCA1LjM3MyA1LjM3MyAwIDEyIDB6IiBmaWxsPSJ1cmwoI2xvYmUtaWNvbnMteXVhbmJhby1maWxsLTEpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcGF0aD48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01LjI4NiA1YTIuNDM4IDIuNDM4IDAgMDEuNjgyIDMuMzhjLTMuOTYyIDUuOTY2LTMuMjE1IDEwLjc0MyAyLjY0OCAxNS4xMzZDMy42MzYgMjIuMDU2IDAgMTcuNDUyIDAgMTJjMC0xLjc4Ny4zOS0zLjQ4MiAxLjA5LTUuMDA2LjI1My0uNDM1LjUyNS0uODcyLjgxNy0xLjMxMUEyLjQzOCAyLjQzOCAwIDAxNS4yODYgNXoiIGZpbGw9InVybCgjbG9iZS1pY29ucy15dWFuYmFvLWZpbGwtMikiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyLjk4LjA0Yy4yNzIuMDIxLjU0My4wNTMuODEuMDkzLjU4My4xMDYgMS4xMTcuMjU0IDEuNTM4LjQ0IDYuNjM4IDIuOTI3IDguMDcgMTAuMDUyIDEuNzQ4IDE1LjY0MmE0LjEyNiA0LjEyNiAwIDAxLTUuODIyLS4zNThjLTEuNTEtMS43MDYtMS4zLTQuMTg0LjM1Ny01LjgyMi44NTgtLjg0OCAzLjEwOC0xLjIyMyA0LjA0NS0yLjQ0IDEuMjU3LTEuNjM1IDIuMTIyLTYuMDEtMi41MjMtNy41MDdMMTIuOTguMDR6IiBmaWxsPSJ1cmwoI2xvYmUtaWNvbnMteXVhbmJhby1maWxsLTMpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcGF0aD48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41MjguMDk2QTYuMTg3IDYuMTg3IDAgMDExMiAxMi4yODFhNS43NTIgNS43NTIgMCAwMC0xLjcxLjI1NWMuMTQ3LS45MDUuNTk1LTEuNzg0IDEuMzIxLTIuNTAxLjg1OC0uODQ4IDMuMTA4LTEuMjIzIDQuMDQ1LTIuNDQxIDEuMjctMS42NTEgMi4xNC02LjEwNC0yLjY3Ni03LjU1NC4xODQuMDE0LjM2Ny4wMzMuNTQ4LjA1NnoiIGZpbGw9IiNFQ0VDRUUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImxvYmUtaWNvbnMteXVhbmJhby1maWxsLTAiIHgxPSIxMiIgeDI9IjEyIiB5MT0iMCIgeTI9IjI0Ij48c3RvcCBzdG9wLWNvbG9yPSIjMDJCMkZDIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzIwQ0JCNiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzEzRDM2MyI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0ibG9iZS1pY29ucy15dWFuYmFvLWZpbGwtMSIgeDE9IjkuMDk1IiB4Mj0iOS4wOTUiIHkxPSIwIiB5Mj0iMjMuNTM3Ij48c3RvcCBzdG9wLWNvbG9yPSIjQzNFQkVGIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRDNGNEREIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJsb2JlLWljb25zLXl1YW5iYW8tZmlsbC0yIiB4MT0iNC4zMDgiIHgyPSI0LjMwOCIgeTE9IjQuNTkzIiB5Mj0iMjMuNTE2Ij48c3RvcCBzdG9wLWNvbG9yPSIjMTREMzY4Ij48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI0Q0VBRCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAzQjRGOCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0ibG9iZS1pY29ucy15dWFuYmFvLWZpbGwtMyIgeDE9IjE1LjY4NSIgeDI9IjE1LjY4NSIgeTE9Ii4wMzkiIHkyPSIxNy4yNDkiPjxzdG9wIHN0b3AtY29sb3I9IiM2MUNGRkEiIHN0b3Atb3BhY2l0eT0iLjk5NiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc5RTNDMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==&logoColor=white" />
              <img
                src="https://img.shields.io/badge/ChatGLM-FFF?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPkNoYXRHTE08L3RpdGxlPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0ibG9iZS1pY29ucy1jaGF0Z2xtLWZpbGwiIHgxPSItMTguNzU2JSIgeDI9IjcwLjg5NCUiIHkxPSI0OS4zNzElIiB5Mj0iOTAuOTQ0JSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzUwNEFGNCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzM0ODVGRiI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik05LjkxNyAyYzQuOTA2IDAgMTAuMTc4IDMuOTQ3IDguOTMgMTAuNTgtLjAxNC4wNy0uMDM3LjE0LS4wNTcuMjFsLS4wMDMtLjI3N2MtLjA4My0zLTEuNTM0LTguOTM0LTguODctOC45MzQtMy4zOTMgMC04LjEzNyAzLjA1NC03LjkzIDguMTU4LS4wNCA0Ljc3OCAzLjU1NSA4LjQgNy45NSA4LjMzMmwuMDczLS4wMDFjMS4yLS4wMzMgMi43NjMtLjQyOSAzLjEtMS42NTcuMDYzLS4wMzEuMjYuNTM0LjI2OC41OTguMDQ4LjI1Ni4xMTIuMzY5LjE5Mi4zNC45ODEtLjM0OCAyLjI4Ni0xLjIyMiAxLjk1Mi0yLjM4LS4xNzYtLjYxLTEuNzc1LS4xNDctMS45MjEtLjM0Ny40MTgtLjk3OSAyLjIzNC0uOTI2IDMuMTUzLS43MTYuNDQzLjEwMi42NTcuMzggMS4wMTIuNDQyLjI5LjA1Mi45ODEtLjIuOTYuMjQyLTEuNSAzLjA0Mi00Ljg5MyA1LjQxLTguODA4IDUuNDFDMy42NTQgMjIgMCAxNi41NzQgMCAxMS43MzcgMCA1Ljk0NyA0Ljk1OSAyIDkuOTE3IDJ6TTkuOSA1LjNjLjQ4NCAwIDEuMTI1LjIyNSAxLjM4LjU4NSAzLjY2OS4xNDUgNC4zMTMgMi42ODYgNC42OTQgNS40NDQuMjU1IDEuODM4LjMxNSAyLjMuMTgyIDEuMzg3bC4wODMuNTljLjA2OC40NDguNTU0LjczNy45ODIuNTE2LjE0NC0uMDc1LjI1NC0uMjMxLjMyOC0uNDdhLjIuMiAwIDAxLjI1OC0uMTNsLjYyNS4yMmEuMi4yIDAgMDEuMTI0LjIzOCAyLjE3MiAyLjE3MiAwIDAxLS41MS45MmMtLjg3OC45MTctMi43NTcuNjY0LTMuMDgtLjYyLS4xNC0uNTU0LS4wNTUtLjYyNi0uMzQ1LTEuMjQyLS4yOTItLjYyMS0xLjIzOC0uNzA5LTEuNjktLjI5NS0uMzQ1LjMxNS0uNDA3LjgwNS0uNDA2IDEuMjgyTDEyLjYgMTUuOWEuOS45IDAgMDEtLjkuOWgtMS40YS45LjkgMCAwMS0uOS0uOXYtLjY1YTEuMTUgMS4xNSAwIDEwLTIuMyAwdi42NWEuOS45IDAgMDEtLjkuOUg0LjhhLjkuOSAwIDAxLS45LS45bC4wMzUtMy4yMzljLjAxMi0xLjg4NC4zNTYtMy42NTggMi40Ny00LjEzNC4yLS4wNDUuMjUyLjEzLjI5LjM0Mi4wMjUuMTU0LjA0My4yNTIuMDUzLjI5NC43MDEgMy4wNTggMS43NSA0LjI5OSAzLjE0NCAzLjcyMmwuNjYtLjMzMS4yNTQtLjEzYy4xNTgtLjA4Mi4yNS0uMTMxLjI3Ni0uMTUuMDEyLS4wMS0uMTY1LS4yMDYtLjQwNy0uNDY0bC0xLjAxMi0xLjA2N2E4LjkyNSA4LjkyNSAwIDAxLS4xOTktLjIxNmMtLjA0Ny0uMDM0LS4xMTYuMDY4LS4yMDguMzA2LS4wNzQuMTU3LS4yNTEuMjUyLS4yNzIuMzI2LS4wMTMuMDU4LjEwOC4yOTguMzYyLjcyLjE2NC4yODguMjIuNTA4LS4zMS4zNDMtMS4wNC0uOC0xLjUxOC0yLjI3My0xLjY4NC0zLjcyNS0uMDA0LS4wMzUtLjE2Mi0xLjkxMy0uMTYyLTEuOTEzYTEuMiAxLjIgMCAwMTEuMTEzLTEuMjgxTDkuOSA1LjN6bTEyLjk5NCA4LjY4Yy4wMzcuNjk3LS40MDMuNzA0LTEuMjEzLjU5MWwtMS43ODMtLjI3NmMtLjI2NS0uMDUzLS4zODUtLjA5OS0uMzEzLS4xNDcuNDctLjMxNSAzLjI2OC0uOTMgMy4zMS0uMTY4em0tLjkxNS0uMDgzbC0uOTI2LjA0MmMtLjg1LjA3Ny0xLjQ1Mi4yNC4zMzguMzM2bC4xMDMuMDAzYy44MTUuMDEyIDEuMjY0LS4zNTkuNDg1LS4zODF6bTEuNjY3LTMuNjAxaC4wMWMuNzkuMzk4LjA2NyAxLjAzLS42NSAxLjM5My0uMTQuMDctLjQ5MS4xNzYtMS4wNTIuMzE1LS4yNDEuMDQtLjQ1Ny4wOTItLjMzMy4xNmwuMDEuMDA1YzEuOTUyLjk1OC0zLjEyMyAxLjUzNC0yLjQ5NSAxLjI4NWwuMzgtLjE0OGMuNjgtLjI2NiAxLjYxNC0uNjgyIDEuNjY2LTEuMzM3LjAzOC0uNDggMS4yNTMtLjQ0MiAxLjQ5My0uOTY4LjA0OC0uMTA2IDAtLjIzNi0uMTQ0LS4zODktLjA1LS4wNDctLjA5NC0uMDk0LS4xMDctLjE0OC0uMDczLS4zMDUuNy0uNDMxIDEuMjIyLS4xNjh6bS0yLjU2OC0uNDc0Yy0uMTM1IDEuMTk4LTIuNDc5IDQuMTkyLTEuOTQ5IDIuODYzbC4wMTctLjA0MmMuMjk4LS43MTcuMzc2LTIuMjIxIDEuMzM3LTMuMjIxLjI1LS4yNi42MzYuMDM1LjU5NS40em0tNy45NzYtLjI1M2MuMDItLjY5NCAxLjAwMi0uOTY4IDEuMzQ2LS4zNDcuMDEtMS4yNzQtMS45NDEtLjc2OC0xLjM0Ni4zNDd6IiBmaWxsPSJ1cmwoI2xvYmUtaWNvbnMtY2hhdGdsbS1maWxsKSIgZmlsbC1ydWxlPSJldmVub2RkIj48L3BhdGg+PC9zdmc+&logoColor=white" />
              <img
                src="https://img.shields.io/badge/TRAE-FFF?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPlRSQUU8L3RpdGxlPjxwYXRoIGQ9Ik0yMS41OTYgMkgyLjQwNEEuNDA0LjQwNCAwIDAwMiAyLjQwNHYxOS4xOTJjMCAuMjIzLjE4LjQwNC40MDQuNDA0aDE5LjE5MmMuMjIzIDAgLjQwNC0uMTguNDA0LS40MDRWMi40MDRBLjQwNC40MDQgMCAwMDIxLjU5NiAyeiIgZmlsbD0iI0ZGNEEzNiI+PC9wYXRoPjxwYXRoIGQ9Ik0xOC4zNjYgMTYuMTVIMTEuOXYyLjIxNGg2LjQ2NXYtMi4yMTV6IiBmaWxsPSIjZmZmIj48L3BhdGg+PC9zdmc+&logoColor=white" />
              <img
                src="https://img.shields.io/badge/LangChain-00AC47?style=flat-square&logo=langchain&logoColor=white" />
              <img
                src="https://img.shields.io/badge/Gradio-FFF?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPkdyYWRpbzwvdGl0bGU+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTEuMjM4IDcuNjAzYTEuNTMyIDEuNTMyIDAgMDExLjUyNCAwbDEwLjQ2OCA2YTEuNTMyIDEuNTMyIDAgMDEwIDIuNjZsLTEwLjQ2OCA2Yy0uNDcyLjI3LTEuMDUyLjI3LTEuNTI0IDBsLTEwLjQ2OC02YTEuNTMzIDEuNTMzIDAgMDEwLTIuNjZsMTAuNDY4LTZ6bS02LjYyNCA3LjMzTDEyIDE5LjE2Nmw3LjM4Ni00LjIzM0wxMiAxMC42OTlsLTcuMzg2IDQuMjM0eiIgZmlsbD0idXJsKCNsb2JlLWljb25zLWdyYWRpby1maWxsLTApIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcGF0aD48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4yMzggMS43MzNhMS41MzMgMS41MzMgMCAwMTEuNTI0IDBsMTAuNDY4IDZhMS41MzIgMS41MzIgMCAwMTAgMi42NTlsLTEwLjQ2OCA2Yy0uNDcyLjI3LTEuMDUyLjI3LTEuNTI0IDBsLTEwLjQ2OC02YTEuNTMyIDEuNTMyIDAgMDEwLTIuNjU5bDEwLjQ2OC02em0tNi42MjQgNy4zM0wxMiAxMy4yOTZsNy4zODYtNC4yMzNMMTIgNC44MjkgNC42MTQgOS4wNjN6IiBmaWxsPSJ1cmwoI2xvYmUtaWNvbnMtZ3JhZGlvLWZpbGwtMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PC9wYXRoPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEyLjc4NCAxMC4yNjVMMi4yOTEgMTYuMjM5Ljc3NCAxMy41NzVsMTAuNDk0LTUuOTc0IDEuNTE2IDIuNjY0eiIgZmlsbD0idXJsKCNsb2JlLWljb25zLWdyYWRpby1maWxsLTIpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcGF0aD48ZGVmcz48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJsb2JlLWljb25zLWdyYWRpby1maWxsLTAiIHgxPSIuMTgyIiB4Mj0iMTkuMzc3IiB5MT0iMTQuOTA3IiB5Mj0iMTQuOTA3Ij48c3RvcCBzdG9wLWNvbG9yPSIjRjlEMTAwIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjk3NzAwIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJsb2JlLWljb25zLWdyYWRpby1maWxsLTEiIHgxPSIyMy43NCIgeDI9IjQuNTE5IiB5MT0iOS4wMzciIHkyPSI5LjAzNyI+PHN0b3Agc3RvcC1jb2xvcj0iI0Y5RDEwMCI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0Y5NzcwMCI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0ibG9iZS1pY29ucy1ncmFkaW8tZmlsbC0yIiB4MT0iLjE4MiIgeDI9IjE5LjM1IiB5MT0iMTQuOTA3IiB5Mj0iMTQuNzkzIj48c3RvcCBzdG9wLWNvbG9yPSIjRjlEMTAwIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjk3NzAwIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+&logoColor=white" />
              <img
                src="https://img.shields.io/badge/HuggingFace-FFD21E?style=flat-square&logo=huggingface&logoColor=white" />
            </div>
          </el-col>
        </el-row>

        <hr class="skills-divider" />

        <h3>GitHub Activity</h3>
        <div class="contribution-chart">
          <img src="https://ghchart.rshah.org/1565C0/WhyLIM" />
        </div>
      </div>
    </section>

    <!-- 经历部分 -->
    <section id="experience" class="section experience-section">
      <div class="inner-container">
        <el-row :gutter="20">
          <!-- 左侧标题 -->
          <el-col :xs="24" :sm="10" :md="8">
            <h1 class="section-title">Experience</h1>
          </el-col>
          <!-- 右侧时间轴 -->
          <el-col :xs="24" :sm="14" :md="16" class="experience-col">
            <el-timeline>
              <el-timeline-item v-for="(exp, index) in experiences" :key="index" :timestamp="exp.period"
                placement="top">
                <el-card>
                  <template #header>
                    <div class="card-header">
                      <el-avatar :size="40" :src="exp.logo" />
                      <div class="header-info">
                        <h3>{{ exp.position }}</h3>
                        <p>{{ exp.institution }} · {{ exp.location }}</p>
                      </div>
                    </div>
                  </template>
                  <div class="card-content">
                    <p>{{ exp.description }}</p>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 论文部分 -->
    <section id="publications" class="section publications-section">
      <div class="inner-container">
        <el-row :gutter="20">
          <!-- 左侧标题 -->
          <el-col :xs="24" :sm="10" :md="8">
            <h1 class="section-title">Publications</h1>
          </el-col>
          <!-- 右侧论文容器 -->
          <el-col :xs="24" :sm="14" :md="16">
            <!-- 每个论文卡片单独一行 -->
            <el-col :xs="24" :sm="24" :md="24" v-for="pub in paginatedPublications" :key="pub.id"
              class="publication-col">
              <el-card class="publication-card">
                <template #header>
                  <div class="card-header-publication">
                    <div class="header-info-publication">
                      <h3>{{ pub.title }}</h3>
                      <div class="publication-image">
                        <el-image :src="pub.image" fit="cover" @click="showPreview(pub.image)" />
                      </div>
                      <p>{{ pub.authors.join(', ') }}</p>
                      <p class="journal">{{ pub.journal_full }} ({{ pub.journal_abbrev }}), {{ pub.year }}, Vol.{{
                        pub.volume }}({{ pub.issue }}), p.{{ pub.pages }}</p>
                    </div>
                  </div>
                </template>
                <div class="card-content">
                  <div>
                    <el-text line-clamp="10" style="text-align: justify;">{{ pub.abstract }}</el-text>
                  </div>
                  <div class="card-keywords" v-if="pub.keywords && pub.keywords !== 'NA' && pub.keywords.length > 0">
                    <el-tag v-for="(keyword, index) in pub.keywords" :key="index" size="small" type="info">
                      {{ keyword }}
                    </el-tag>
                  </div>
                  <div class="card-links">
                    <el-button v-for="link in pub.links" :key="link.type" size="small" type="primary" plain
                      @click="openLink(link.url)">
                      {{ link.type }}
                    </el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <!-- 分页 -->
            <el-col :span="24">
              <el-pagination background layout="prev, pager, next" :total="totalPublications" :page-size="3"
                :current-page="currentPagePublications" @current-change="publicationPageChange" />
            </el-col>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 项目部分 -->
    <section id="projects" class="section projects-section">
      <div class="inner-container">
        <h1 class="section-title">Projects</h1>
        <div v-if="loading" class="loading-container">
          <i class="fa fa-spinner fa-spin"></i> Loading projects...
        </div>

        <div v-if="error" class="error-message">
          Failed to load projects: {{ error }}
        </div>

        <el-row :gutter="20" v-if="!loading && !error">
          <el-col :xs="24" :sm="12" :md="8" v-for="(project, index) in paginatedProjects" :key="index"
            class="project-col">
            <GithubCard :author="project.owner.login" :project="project.name" :description="project.description"
              :stars="project.stargazers_count" :forks="project.forks_count" :language="project.language"
              :updated-at="project.updated_at" :size="index % 3 === 0 ? 'full' : 'mini'" />
          </el-col>
          <!-- 分页 -->
          <el-col :span="24">
            <el-pagination background layout="prev, pager, next" :total="projects.length" :page-size="6"
              :current-page="currentPageProjects" @current-change="projectPageChange" />
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 成就部分 -->
    <section id="accomplishments" class="section accomplishments-section">
      <div class="inner-container">
        <h1 class="section-title">Accomplishments</h1>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="(acc, index) in accomplishments" :key="index">
            <el-card class="accomplishment-card">
              <template #header>
                <div class="card-header">
                  <el-avatar :size="40" :src="acc.logo" />
                  <div class="header-info">
                    <h3>{{ acc.title }}</h3>
                    <p>{{ acc.institution }} · {{ acc.date }}</p>
                  </div>
                </div>
              </template>
              <div class="card-content">
                <p>{{ acc.description }}</p>
                <div class="certificate-image">
                  <el-image :src="acc.certificate" fit="cover" @click="showPreview(acc.certificate)" />
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 联系部分 -->
    <section id="contact" class="section contact-section">
      <div class="inner-container">
        <h1 class="section-title">Contact</h1>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-card class="contact-card">
              <div class="contact-item">
                <font-awesome-icon :icon="['fas', 'map-marker-alt']" size="lg" />
                <span>{{ contactInfo.office }}</span>
              </div>
              <div class="contact-item">
                <font-awesome-icon :icon="['fas', 'clock']" size="lg" />
                <span>{{ contactInfo.officeHours }}</span>
              </div>
              <div class="contact-item">
                <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
                <span>{{ contactInfo.email }}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="map-container">
              <!-- 这里可以集成地图组件，如高德地图、百度地图等 -->
              <el-card>
                <div
                  style="height: 300px; background-color: #f0f2f5; display: flex; justify-content: center; align-items: center;">
                  <p>地图组件（需要集成第三方地图API）</p>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="dialogVisible" title="预览" width="50%">
      <el-image style="width: 100%" :src="previewImage" fit="contain" />
    </el-dialog>
  </div>
</template>

<style scoped>
.inner-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.section {
  margin-bottom: 0;
  padding: 60px 0;
  position: relative;
}

/* 交替背景颜色 */
.section:nth-of-type(odd) {
  background-color: #ffffff;
}

.section:nth-of-type(even) {
  background-color: #f5f7fa;
}

/* 使背景色延伸到整个页面宽度 */
.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background-color: inherit;
  z-index: -1;
}

.section-title {
  text-align: center;
  margin-bottom: 30px;
  color: #1565C0;
  /* font-size: 28px; */
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background-color: 002b80;
  margin: 10px auto;
}

/* 个人信息部分样式 */
.biography-section {
  margin-top: 20px;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.name {
  margin: 15px 0 10px;
  font-size: 24px;
}

.social-icons {
  display: flex;
  gap: 5px;
}

.social-icons a {
  color: #606266;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #1565C0;
}

.bio-container {
  padding: 0 15px;
}

h1 {
  font-size: 34px;
  color: #1565C0;
  margin-bottom: 20px;
}

.bio-container p {
  font-size: 21px;
  text-align: justify;
}

.cv-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

/* 技能部分样式 */
.skill-col {
  text-align: center;
}

.skill-col img {
  box-shadow: 2px 2px 2px #409eff;
}

.skills-section img {
  margin: 5px;
  transition: transform 0.3s ease;
}

.skills-section img:hover {
  transform: translateY(-3px);
}

.skills-divider {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(21, 101, 192, 0.75), rgba(0, 0, 0, 0));
  margin: 25px 0;
}

.skills-section h3 {
  color: #1565C0;
  margin-top: 20px;
  margin-bottom: 15px;
}

.skills-section h4 {
  color: #606266;
  margin-top: 15px;
  margin-bottom: 10px;
}

.skills-section p {
  font-size: 16px;
  margin-bottom: 15px;
}

.contribution-chart {
  margin-top: 20px;
  text-align: center;
  overflow-x: auto;
}

.contribution-chart img {
  width: 85%;
}

/* 通用卡片样式 */
.card-header {
  display: flex;
  align-items: center;
  gap: 7px;
}

.header-info {
  margin-left: 15px;
  flex: 1;
}

.header-info h3 {
  margin: 0 0 5px;
  font-size: 18px;
}

.header-info p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.card-content {
  padding: 10px 0;
}

.card-content p {
  margin: 0 0 10px;
  color: #606266;
}

.card-links {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
}

/* 论文部分样式 */
.publication-card {
  margin-bottom: 20px;
  height: 100%;
}

h3 {
  font-size: 25px;
  margin-bottom: 10px;
}

.publication-image {
  height: 150px;
  overflow: hidden;
  cursor: pointer;
  margin-right: 15px;
}

.publication-image .el-image {
  width: 100%;
  height: 100%;
}

.journal {
  color: #909399;
  font-style: italic;
  margin: 5px 0;
}

.card-keywords {
  display: flex;
  gap: 5px;
}

/* 项目部分样式 */
.project-card {
  margin-bottom: 20px;
  height: 100%;
}

.project-image {
  height: 150px;
  overflow: hidden;
  cursor: pointer;
  margin-right: 15px;
}

.project-image .el-image {
  width: 100%;
  height: 100%;
}

/* 成就部分样式 */
.accomplishment-card {
  margin-bottom: 20px;
  height: 100%;
}

.certificate-image {
  margin-top: 15px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
}

.certificate-image .el-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 联系部分样式 */
.contact-card {
  margin-bottom: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.contact-item svg {
  margin-right: 15px;
  color: #1565C0;
}

.map-container {
  height: 100%;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .avatar-container {
    margin-bottom: 30px;
  }

  .cv-buttons {
    flex-direction: column;
  }

  .card-links {
    justify-content: center;
  }
}
</style>
