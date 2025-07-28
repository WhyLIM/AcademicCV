<template>
  <div :class="['github-info-card', { 'shadow-sm': shadow }]">
    <!-- GitHub信息卡片头部 -->
    <div class="github-info-card-header">
      <!-- GitHub链接 -->
      <a :href="repoUrl" target="_blank" rel="noopener noreferrer" title="Github">
        <span><font-awesome-icon :icon="['fab', 'github']" /> GitHub</span>
      </a>
    </div>
    <!-- GitHub信息卡片主体 -->
    <div class="github-info-card-body">
      <!-- 项目名称 -->
      <div class="github-info-card-name-a">
        <a :href="repoUrl" target="_blank" rel="noopener noreferrer">
          <span class="github-info-card-name">{{ author }}/{{ project }}</span>
        </a>
      </div>
      <!-- 项目描述 -->
      <div v-if="description || showPlaceholder" class="github-info-card-description">
        <el-text line-clamp="2" style="text-align: justify;">{{ description || "Repo 描述将会显示在这里" }}</el-text>
      </div>
      <!-- 项目语言 -->
      <!-- <div v-if="language" class="github-info-card-language">
        <span class="language-dot" :style="{ backgroundColor: languageColor }"></span>
        {{ language }}
      </div> -->
    </div>
    <!-- GitHub信息卡片底部 -->
    <div class="github-info-card-bottom">
      <!-- 星星数 -->
      <span class="github-info-card-meta github-info-card-meta-stars">
        <font-awesome-icon :icon="['fas', 'star']" />&nbsp;<span class="github-info-card-stars">{{ stars || 0 }}</span>
      </span>
      <!-- 分支数 -->
      <span class="github-info-card-meta github-info-card-meta-forks">
        <font-awesome-icon :icon="['fas', 'code-fork']" />&nbsp;<span class="github-info-card-forks">{{ forks || 0
          }}</span>
      </span>
      <!-- 项目语言 -->
      <span v-if="language" class="language-dot" :style="{ backgroundColor: languageColor }"></span>
        {{ language }}
      <!-- 更新时间 -->
      <span v-if="updatedAt" class="github-info-card-meta-updated">
        <font-awesome-icon :icon="['fas', 'clock']" />&nbsp;<span class="github-info-card-updated">{{
          formatDate(updatedAt) }}</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import githubColors from 'github-colors';

// 定义 props
const props = defineProps({
  author: {
    type: String,
    required: true,
    default: ''
  },
  project: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
  stars: {
    type: [Number, String],
    default: 0
  },
  forks: {
    type: [Number, String],
    default: 0
  },
  updatedAt: {
    type: String,
    default: ''
  },
  shadow: {
    type: Boolean,
    default: true
  },
  showPlaceholder: {
    type: Boolean,
    default: true
  }
});

const languageColor = computed(() => {
  const colorData = githubColors.get(props.language);
  return colorData?.color || '#ccc'; // 默认灰色
});

// 计算repoUrl
const repoUrl = computed(() =>
  `https://github.com/${props.author}/${props.project}`
);

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.github-info-card {
  border-radius: 4px;
  background: white;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  margin-bottom: 1.5em;
  outline: auto;
}

.github-info-card-header {
  background: #24292e;
  padding: 8px 12px;
}

.github-info-card-header a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.github-info-card-header i {
  margin-right: 5px;
}

.github-info-card-body {
  padding: 12px;
  min-height: 105px;
}

.github-info-card-name-a {
  margin-bottom: 8px;
}

.github-info-card-name {
  font-weight: 600;
  color: #0366d6;
  font-size: 16px;
}

.github-info-card-description {
  color: #586069;
  font-size: 14px;
  line-height: 1.5;
}

.github-info-card-bottom {
  padding: 8px 12px;
  border-top: 1px solid #e1e4e8;
  font-size: 12px;
}

.github-info-card-meta {
  color: #586069;
  margin-right: 16px;
}

.github-info-card-meta i {
  margin-right: 3px;
}



.github-info-card-language {
  margin-top: 8px;
  color: #586069;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.language-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.github-info-card-meta-updated {
  float: right;
}
</style>
