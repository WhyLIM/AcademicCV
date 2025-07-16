<script setup>
import { ref } from 'vue'

// 个人信息数据
const personalInfo = {
  name: 'Min Li',
  avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
  email: 'example@university.edu',
  github: 'https://github.com/username',
  researchgate: 'https://www.researchgate.net/profile/Username',
  bio: `Min Li (李旻) received a Bachelor of Science degree from <a href="http://eng.suda.edu.cn/" target="_blank">Soochow University</a>, majoring in bioinformatics, under the tutelage of Professor <a href="https://www.researchgate.net/profile/Guang-Hu-3" target="_blank"><strong>Guang Hu</strong></a>, and is currently working as a data engineer in the team of Dr. <a href="https://www.researchgate.net/profile/Xueli-Zhang" target="_blank"><strong>Xueli Zhang</strong></a>, PI of <a href="https://www.gdghospital.org.cn/en/" target="_blank">Guangdong Provincial People's Hospital (GDPH)</a>.<br><br>His research interests are mainly in the fields of life sciences & computer science, focusing on data analysis and exploration at the biomolecular level.`,
  cvEn: '/path/to/cv-en.pdf',
  cvCn: '/path/to/cv-cn.pdf'
}

// 技能数据
const skills = [
  { name: 'Windows', icon: 'windows', category: 'Operating System' },
  { name: 'Linux (Zorin, Ubuntu, CentOS, Kali)', icon: 'linux', category: 'Operating System' },
  { name: 'Hackintosh', icon: 'apple', category: 'Operating System' },
  { name: 'Python', icon: 'python', category: 'Programming Language' },
  { name: 'R', icon: 'r-project', category: 'Programming Language' },
  { name: 'HTML', icon: 'html5', category: 'Programming Language' },
  { name: 'CSS', icon: 'css3-alt', category: 'Programming Language' },
  { name: 'JavaScript', icon: 'js', category: 'Programming Language' },
  { name: 'VUE3', icon: 'vuejs', category: 'Programming Language' },
  { name: 'MySQL', icon: 'database', category: 'Programming Language' }
]

// 经历数据
const experiences = [
  {
    position: '博士研究生',
    institution: '某大学计算机科学与技术学院',
    logo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    period: '2020年9月 - 至今',
    location: '北京',
    description: '主要研究方向为人工智能和机器学习算法，参与多个国家级科研项目。'
  },
  {
    position: '研究助理',
    institution: '某研究所人工智能实验室',
    logo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    period: '2018年7月 - 2020年8月',
    location: '上海',
    description: '参与开发深度学习模型，解决计算机视觉相关问题。'
  },
  {
    position: '硕士研究生',
    institution: '某大学信息科学与工程学院',
    logo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    period: '2015年9月 - 2018年6月',
    location: '广州',
    description: '研究方向为数据挖掘和模式识别，获得优秀毕业生称号。'
  }
]

// 论文数据
const publications = [
  {
    title: '基于深度学习的图像分类算法研究',
    authors: '张三, 李四, 王五',
    journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
    year: '2022',
    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    description: '提出了一种新的深度学习模型，在图像分类任务上取得了显著的性能提升。',
    links: [
      { type: 'PDF', url: '#' },
      { type: 'DOI', url: 'https://doi.org/10.1109/TPAMI.2022.123456' },
      { type: 'GitHub', url: 'https://github.com/username/project1' }
    ]
  },
  {
    title: '自然语言处理中的注意力机制研究',
    authors: '张三, 赵六',
    journal: 'ACL Conference',
    year: '2021',
    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    description: '探讨了注意力机制在自然语言处理任务中的应用，并提出了改进方法。',
    links: [
      { type: 'PDF', url: '#' },
      { type: 'DOI', url: 'https://doi.org/10.18653/v1/2021.acl-long.123' }
    ]
  },
  {
    title: '机器学习在医学图像分析中的应用',
    authors: '李四, 张三, 孙七',
    journal: 'Medical Image Analysis',
    year: '2020',
    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    description: '将机器学习技术应用于医学图像分析，提高了疾病诊断的准确率。',
    links: [
      { type: 'PDF', url: '#' },
      { type: 'DOI', url: 'https://doi.org/10.1016/j.media.2020.123456' }
    ]
  }
]

// 项目数据
const projects = [
  {
    title: '智能图像识别系统',
    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    description: '基于深度学习的图像识别系统，可以识别多种物体和场景。',
    links: [
      { type: 'Demo', url: '#' },
      { type: 'GitHub', url: 'https://github.com/username/image-recognition' }
    ]
  },
  {
    title: '自然语言处理工具包',
    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    description: '开发了一套自然语言处理工具包，支持中文分词、情感分析等功能。',
    links: [
      { type: 'GitHub', url: 'https://github.com/username/nlp-toolkit' }
    ]
  },
  {
    title: '数据可视化平台',
    image: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    description: '一个交互式数据可视化平台，支持多种图表类型和数据源。',
    links: [
      { type: 'Demo', url: '#' },
      { type: 'GitHub', url: 'https://github.com/username/data-viz' }
    ]
  }
]

// 成就数据
const accomplishments = [
  {
    title: '优秀青年科学家奖',
    institution: '中国科学院',
    logo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    date: '2022年',
    description: '因在人工智能领域的突出贡献而获得此奖项。',
    certificate: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    title: '最佳论文奖',
    institution: 'IEEE国际会议',
    logo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    date: '2021年',
    description: '论文《基于深度学习的图像分类算法研究》获得最佳论文奖。',
    certificate: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  },
  {
    title: '编程竞赛一等奖',
    institution: '全国高校计算机大赛',
    logo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    date: '2019年',
    description: '在全国高校计算机编程大赛中获得一等奖。',
    certificate: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
]

// 联系方式数据
const contactInfo = {
  office: '某大学计算机科学与技术学院1号楼303室',
  officeHours: '周一至周五 9:00-17:00',
  email: 'example@university.edu',
  phone: '+86 123 4567 8901',
  location: {
    lat: 39.9042,
    lng: 116.4074,
    zoom: 15
  }
}

// 控制图片预览
const dialogVisible = ref(false)
const previewImage = ref('')

const showPreview = (image) => {
  previewImage.value = image
  dialogVisible.value = true
}
</script>

<template>
  <div class="academic-cv">
    <!-- 个人信息部分 -->
    <section id="home" class="section biography-section">
      <div class="inner-container">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="6" class="avatar-col">
            <div class="avatar-container">
              <el-avatar :size="150" :src="personalInfo.avatar" />
              <h2 class="name">{{ personalInfo.name }}</h2>
              <div class="social-icons">
                <a :href="`mailto:${personalInfo.email}`" title="Email">
                  <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
                </a>
                <a :href="personalInfo.researchgate" target="_blank" title="ResearchGate">
                  <font-awesome-icon :icon="['fab', 'researchgate']" size="lg" />
                </a>
                <a :href="personalInfo.github" target="_blank" title="GitHub">
                  <font-awesome-icon :icon="['fab', 'github']" size="lg" />
                </a>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="16" :md="18">
            <div class="bio-container">
              <h1>Biography</h1>
              <p v-html="personalInfo.bio"></p>
              <div class="cv-buttons">
                <el-button color="#626aef">
                  <font-awesome-icon :icon="['fas', 'file-arrow-down']" />&nbsp;&nbsp;Download CV
                </el-button>
                <el-button color="#626aef">
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
        <h1 class="section-title">Skills</h1>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="(skill, index) in skills" :key="index">
            <el-card class="skill-card">
              <div class="skill-icon" v-if="skill.icon">
                <font-awesome-icon :icon="['fab', skill.icon]" size="2x" />
              </div>
              <div class="skill-icon" v-else>
                <el-icon><el-icon-monitor /></el-icon>
              </div>
              <div class="skill-info">
                <h3>{{ skill.name }}</h3>
                <p>{{ skill.category }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 经历部分 -->
    <section id="experience" class="section experience-section">
      <div class="inner-container">
        <div class="experience-layout">
          <!-- 左侧标题 -->
          <div class="experience-title-section">
            <h1 class="section-title">Experience</h1>
          </div>

          <!-- 右侧时间轴 -->
          <div class="experience-content-section">
            <el-timeline>
              <el-timeline-item v-for="(exp, index) in experiences" :key="index" :timestamp="exp.period"
                placement="top">
                <el-card>
                  <template #header>
                    <div class="experience-header">
                      <el-avatar :size="40" :src="exp.logo" />
                      <div class="experience-title">
                        <h3>{{ exp.position }}</h3>
                        <p>{{ exp.institution }} · {{ exp.location }}</p>
                      </div>
                    </div>
                  </template>
                  <div class="experience-content">
                    <p>{{ exp.description }}</p>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </section>

    <!-- 论文部分 -->
    <section id="publications" class="section publications-section">
      <div class="inner-container">
        <h1 class="section-title">Publications</h1>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="(pub, index) in publications" :key="index">
            <el-card class="publication-card">
              <div class="publication-image">
                <el-image :src="pub.image" fit="cover" @click="showPreview(pub.image)" />
              </div>
              <div class="publication-info">
                <h3>{{ pub.title }}</h3>
                <p class="authors">{{ pub.authors }}</p>
                <p class="journal">{{ pub.journal }}, {{ pub.year }}</p>
                <p class="description">{{ pub.description }}</p>
                <div class="publication-links">
                  <el-button v-for="(link, linkIndex) in pub.links" :key="linkIndex" size="small" type="primary" plain
                    @click="window.open(link.url, '_blank')">
                    {{ link.type }}
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 项目部分 -->
    <section id="projects" class="section projects-section">
      <div class="inner-container">
        <h1 class="section-title">Projects</h1>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="(project, index) in projects" :key="index">
            <el-card class="project-card">
              <div class="project-image">
                <el-image :src="project.image" fit="cover" @click="showPreview(project.image)" />
              </div>
              <div class="project-info">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="project-links">
                  <el-button v-for="(link, linkIndex) in project.links" :key="linkIndex" size="small" type="primary"
                    plain @click="window.open(link.url, '_blank')">
                    {{ link.type }}
                  </el-button>
                </div>
              </div>
            </el-card>
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
              <div class="accomplishment-header">
                <el-avatar :size="40" :src="acc.logo" />
                <div class="accomplishment-title">
                  <h3>{{ acc.title }}</h3>
                  <p>{{ acc.institution }} · {{ acc.date }}</p>
                </div>
              </div>
              <div class="accomplishment-content">
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
/* 通用样式 */
/* .academic-cv {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
} */

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
  gap: 15px;
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
  font-size: 21px;text-align: justify;
}

.cv-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

/* 技能部分样式 */
.skill-card {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding: 15px;
}

.skill-icon {
  margin-right: 15px;
  color: #1565C0;
}

.skill-info h3 {
  margin: 0 0 5px;
  font-size: 18px;
}

.skill-info p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

/* 经历部分样式 */
/* .experience-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.experience-title {
  margin-left: 15px;
}

.experience-title h3 {
  margin: 0 0 5px;
  font-size: 18px;
}

.experience-title p {
  margin: 0;
  color: #909399;
  font-size: 14px;
} */

/* 经历部分布局 */
.experience-layout {
  display: flex;
  gap: 40px;
  /* 左右两部分之间的间距 */
}

.experience-title-section {
  flex: 0 0 400px; /* 固定左侧宽度 */
  position: sticky;
  top: 20px;       /* 滚动时保持固定位置 */
  align-self: flex-start; /* 顶部对齐 */
}

.experience-content-section {
  flex: 1;   /* 右侧占据剩余空间 */
}

/* 响应式调整 */
@media (max-width: 768px) {
  .experience-layout {
    flex-direction: column;
  }

  .experience-title-section {
    position: static;
    margin-bottom: 20px;
  }
}

/* 使头像和标题并排 */
.experience-header {
  display: flex;       /* 启用Flex布局 */
  align-items: center; /* 垂直居中 */
  gap: 15px;           /* 元素间距 */
}

.experience-title h3 {
  margin: 0 0 5px 0; /* 调整标题间距 */
}

.experience-title p {
  margin: 0; /* 移除段落默认间距 */
  color: #909399;
  font-size: 14px;
}

/* 论文部分样式 */
.publication-card {
  margin-bottom: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.publication-image {
  height: 150px;
  overflow: hidden;
  cursor: pointer;
}

.publication-image .el-image {
  width: 100%;
  height: 100%;
}

.publication-info {
  padding: 15px;
  flex: 1;
}

.publication-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
}

.authors {
  color: #606266;
  margin: 5px 0;
}

.journal {
  color: #909399;
  font-style: italic;
  margin: 5px 0;
}

.publication-links {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* 项目部分样式 */
.project-card {
  margin-bottom: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-image {
  height: 150px;
  overflow: hidden;
  cursor: pointer;
}

.project-image .el-image {
  width: 100%;
  height: 100%;
}

.project-info {
  padding: 15px;
  flex: 1;
}

.project-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
}

.project-links {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* 成就部分样式 */
.accomplishment-card {
  margin-bottom: 20px;
  height: 100%;
}

.accomplishment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.accomplishment-title {
  margin-left: 15px;
}

.accomplishment-title h3 {
  margin: 0 0 5px;
  font-size: 18px;
}

.accomplishment-title p {
  margin: 0;
  color: #909399;
  font-size: 14px;
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

  .publication-links,
  .project-links {
    justify-content: center;
  }
}
</style>
