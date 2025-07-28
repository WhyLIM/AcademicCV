<script setup>
import { ref, computed, onMounted } from 'vue'
import GithubCard from '@/components/GithubCard.vue'; // GitHub 卡片组件
import githubService from '@/services/githubService.js'; // GitHub 服务

// 导入所有数据
import {
  personalInfo,
  skills,
  experiences,
  publications,
  projects,
  accomplishments,
  contactInfo
} from '../data';

// 技能徽章数据
const generateBadgeUrl = (badge) => {
  const baseUrl = 'https://img.shields.io/badge/';
  const text = encodeURIComponent(badge.text);
  const color = (badge.color || 'default').replace(/^#/, ''); // 移除开头的井号
  const style = 'flat-square';
  const logoPart = `&logo=${badge.logo}`;
  return `${baseUrl}${text}-${color}?style=${style}${logoPart}&logoColor=white`;
};

const loading = ref(true);
const error = ref(null);
const projectsInfo = ref([]);
const currentPagePublications = ref(1)
const currentPageProjects = ref(1)
const pageSizePublications = ref(3)
const pageSizeProjects = ref(6)
const totalPublications = ref(publications.length)

// 论文分页
const paginatedPublications = computed(() => {
  const start = (currentPagePublications.value - 1) * pageSizePublications.value
  const end = start + pageSizePublications.value
  return publications.slice(start, end)
})

const publicationPageChange = (page) => {
  currentPagePublications.value = page
  // 滚动到 publications 部分
  const publicationsSection = document.getElementById('publications')
  if (publicationsSection) {
    publicationsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 项目分页
const paginatedProjects = computed(() => {
  const start = (currentPageProjects.value - 1) * pageSizeProjects.value
  const end = start + pageSizeProjects.value
  return projectsInfo.value.slice(start, end)
})

const projectPageChange = (page) => {
  currentPageProjects.value = page
  // 滚动到 projects 部分
  const publicationsSection = document.getElementById('projects')
  if (publicationsSection) {
    publicationsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const openLink = (url) => {
  window.open(url, '_blank');
};

onMounted(async () => {
  try {
    const results = await githubService.getMultipleReposInfo(projects);
    console.log('API返回的数据结构:', results);
    projectsInfo.value = results.successes;
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
          <!-- 动态生成每一列 -->
          <el-col v-for="(skill, key) in skills" :key="key" :xs="24" :sm="8" :md="8" class="skill-col">
            <h3>{{ skill.title }}</h3>
            <div>
              <!-- 动态生成徽章 -->
              <a v-for="(badge, index) in skill.badges" :key="index" :href="`https://shields.io/`" target="_blank"
                rel="noopener noreferrer">
                <img :src="generateBadgeUrl(badge)" :alt="badge.text" />
              </a>
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
                        <el-image :src="`/images/articles/image_${pub.pmid}.jpg`" fit="cover" loading="lazy" />
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
            <GithubCard :author="project.data.owner?.login || ''" :project="project.data.name"
              :description="project.data.description" :stars="project.data.stargazers_count"
              :forks="project.data.forks_count" :language="project.data.language"
              :updatedAt="project.data.updated_at" />
          </el-col>
          <!-- 分页 -->
          <el-col :span="24">
            <el-pagination background layout="prev, pager, next" :total="projectsInfo.length" :page-size="6"
              :current-page="currentPageProjects" @current-change="projectPageChange" class="project-pagination" />
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
                <p v-html="acc.description"></p>
                <div class="certificate-image">
                  <el-image :src="acc.certificate" fit="cover" loading="lazy" :preview-src-list="[acc.certificate]" />
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3097.5302306118647!2d113.99016087106806!3d22.593872612113575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403f2e532c68841%3A0xdbd44fb3e09227d2!2z5Lit5Zu956eR5a2m6Zmi5rex5Zyz5YWI6L-b5oqA5pyv56CU56m26Zmi!5e0!3m2!1szh-CN!2ssg!4v1753692890275!5m2!1szh-CN!2ssg"
              width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </el-col>
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
        </el-row>
      </div>
    </section>

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
  text-align: justify;
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
  padding: 5px 0;
}

.card-content p {
  margin: 0 0 10px;
  color: #606266;
  text-align: justify;
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
  height: 230px;
  overflow: hidden;
  cursor: pointer;
  margin-right: 15px;
  margin-bottom: 10px;
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
.project-pagination {
  justify-content: center;
}

/* 成就部分样式 */
.accomplishment-card {
  margin-bottom: 20px;
  height: 97%;
}

.certificate-image {
  margin-top: 15px;
  height: 270px;
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
  padding: 5px;
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
