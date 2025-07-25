# AcademicCV

## 项目概述

本项目是一个基于Vue 3、Element Plus和Font Awesome的学术简历网站，采用单页应用(SPA)设计，支持锚点平滑滚动和响应式布局，适配不同设备屏幕。网站使用简洁的蓝白灰配色方案，展示学术人员的个人信息、技能、经历、论文、项目、成就和联系方式。

## 技术栈**前端框架**: Vue 3.5.17

- **UI组件库**: Element Plus 2.10.3
- **图标库**: Font Awesome
- **路由管理**: Vue Router 4.5.1
- **状态管理**: Pinia 3.0.3
- **构建工具**: Vite 7.0.0
- **代码规范**: ESLint 9.29.0 + Prettier 3.5.3

## 开发进度

### 第一阶段：项目初始化与基础结构搭建

1. **项目创建与依赖安装**

   - 使用Vite创建Vue 3项目
   - 安装Element Plus、Font Awesome等依赖
   - 配置ESLint和Prettier
2. **基础结构设计**

   - 设计并实现顶部导航栏
   - 实现页面布局（头部、主体、页脚）
   - 配置路由系统，支持锚点平滑滚动

### 第二阶段：主要功能模块开发

1. **个人信息模块**

   - 实现个人头像、姓名和社交媒体链接
   - 添加个人简介和研究方向描述
   - 添加简历下载按钮
2. **技能模块**

   - 使用卡片组件展示各类技能
   - 集成Font Awesome图标
   - 按类别组织技能（操作系统、编程语言等）
3. **经历模块**

   - 使用时间线组件展示教育和工作经历
   - 包含职位、机构、时间段和地点信息
   - 添加经历描述
4. **论文模块**

   - 使用卡片组件展示学术论文
   - 包含标题、作者、期刊/会议、年份和摘要
   - 添加论文链接（PDF、DOI、GitHub等）
   - 实现论文相关图片预览功能
5. **项目模块**

   - 使用卡片组件展示研究项目
   - 包含项目标题、描述和相关链接
   - 实现项目图片预览功能
6. **成就模块**

   - 展示获奖情况和荣誉
   - 包含奖项名称、颁发机构、日期和描述
   - 添加证书图片预览功能
7. **联系方式模块**

   - 展示办公地点、办公时间和电子邮件
   - 预留地图集成位置

### 第三阶段：优化与增强功能

1. **导航栏滚动效果**

   - 实现向下滚动时隐藏导航栏
   - 实现向上滚动时显示导航栏
   - 添加平滑过渡动画
2. **响应式设计优化**

   - 针对不同屏幕尺寸优化布局
   - 移动设备上调整导航菜单和内容展示

## 功能特点

1. **导航与布局**

   - 固定顶部导航栏，支持滚动隐藏/显示
   - 导航菜单项链接到页面各部分
   - 响应式布局，适配桌面和移动设备
2. **内容展示**

   - 使用Element Plus组件（卡片、时间线、对话框等）
   - 集成Font Awesome图标增强视觉效果
   - 图片预览功能
3. **用户体验**

   - 平滑滚动到锚点位置
   - 简洁美观的蓝白灰配色方案
   - 统一的卡片样式和间距

## 待实现功能

1. **地图集成**

   - 集成第三方地图API（如高德地图、百度地图）
   - 显示办公地点位置
2. **多语言支持**

   - 添加中英文切换功能
   - 本地化内容展示
3. **主题切换**

   - 实现浅色/深色主题切换
   - 自定义主题色彩

## 技术实现细节

1. **Vue 3特性应用**

   - 使用Composition API和 `<script setup>`语法
   - 响应式系统（ref、reactive）管理状态
2. **Element Plus组件应用**

   - 使用Container布局组件（el-container、el-header、el-main、el-footer）
   - 使用Menu组件实现导航菜单
   - 使用Card、Timeline、Avatar等组件展示内容
   - 使用Dialog组件实现图片预览
3. **路由配置**

   - 使用Vue Router的scrollBehavior实现平滑滚动
   - 配置路由元信息（meta）设置页面标题
4. **响应式设计**

   - 使用Element Plus的栅格系统（el-row、el-col）
   - 使用媒体查询适配不同屏幕尺寸
   - 针对移动设备优化布局和交互
5. **导航栏滚动效果**

   - 使用Vue的生命周期钩子（onMounted、onBeforeUnmount）
   - 监听滚动事件控制导航栏显示/隐藏
   - 使用CSS transition实现平滑过渡效果

## 总结

本项目成功实现了一个功能完善、视觉美观的学术简历网站，采用现代前端技术栈，具有良好的用户体验和响应式设计。网站结构清晰，代码组织合理，便于维护和扩展。通过本项目，展示了Vue 3、Element Plus等技术在实际应用中的优势和实践方法。
