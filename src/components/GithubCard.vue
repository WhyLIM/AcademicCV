<template>
  <div :class="['github-info-card', sizeClass, { 'shadow-sm': shadow }]">
    <div class="github-info-card-header">
      <a :href="repoUrl" target="_blank" rel="noopener noreferrer" title="Github">
        <span><i class="fa fa-github"></i> GitHub</span>
      </a>
    </div>
    <div class="github-info-card-body">
      <div class="github-info-card-name-a">
        <a :href="repoUrl" target="_blank" rel="noopener noreferrer">
          <span class="github-info-card-name">{{ author }}/{{ project }}</span>
        </a>
      </div>
      <div v-if="description || showPlaceholder" class="github-info-card-description">
        {{ description || "Repo 描述将会显示在这里" }}
      </div>
      <div v-if="language" class="github-info-card-language">
        <span class="language-dot" :style="{ backgroundColor: languageColor }"></span>
        {{ language }}
      </div>
    </div>
    <div class="github-info-card-bottom">
      <span class="github-info-card-meta github-info-card-meta-stars">
        <i class="fa fa-star"></i>&nbsp;<span class="github-info-card-stars">{{ stars || 0 }}</span>
      </span>
      <span class="github-info-card-meta github-info-card-meta-forks">
        <i class="fa fa-code-fork"></i>&nbsp;<span class="github-info-card-forks">{{ forks || 0 }}</span>
      </span>
      <span v-if="updatedAt" class="github-info-card-meta github-info-card-meta-updated">
        <i class="fa fa-clock-o"></i>&nbsp;<span class="github-info-card-updated">{{ formatDate(updatedAt) }}</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

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
  stars: {
    type: [Number, String],
    default: 0
  },
  forks: {
    type: [Number, String],
    default: 0
  },
  size: {
    type: String,
    default: 'full', // 'full' or 'mini'
    validator: value => ['full', 'mini'].includes(value)
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

const sizeClass = computed(() =>
  props.size === 'mini'
    ? 'github-info-card-mini'
    : 'github-info-card-full'
);

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

/* Mini style */
.github-info-card-mini {
  max-width: 300px;
}

.github-info-card-mini .github-info-card-body {
  padding: 8px 12px;
}

.github-info-card-mini .github-info-card-name {
  font-size: 14px;
}

.github-info-card-mini .github-info-card-description {
  display: none;
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