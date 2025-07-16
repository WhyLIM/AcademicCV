/*
 * @Author: Mli-TB mli.bio@outlook.com
 * @Date: 2025-07-11 12:42:37
 * @LastEditors: Mli-TB mli.bio@outlook.com
 * @LastEditTime: 2025-07-12 00:34:09
 * @FilePath: \AcademicCV\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

/* 导入Font Awesome图标库 */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* 导入品牌图标 */
import { faGithub, faResearchgate } from '@fortawesome/free-brands-svg-icons'

/* 导入常规图标 */
import { faEnvelope, faFileArrowDown, faMapMarkerAlt, faClock, faDatabase, faStar, faCodeFork } from '@fortawesome/free-solid-svg-icons'

/* 导入技能相关图标 */
import { faGoogleScholar, faWindows, faLinux, faApple, faPython, faRProject, faHtml5, faCss3Alt, faJs, faVuejs } from '@fortawesome/free-brands-svg-icons'

/* 添加图标到库中 */
library.add(
  faGithub, faResearchgate, faEnvelope, faFileArrowDown, faMapMarkerAlt, faClock, faDatabase, faStar, faCodeFork,  
  faGoogleScholar, faWindows, faLinux, faApple, faPython, faRProject, faHtml5, faCss3Alt, faJs, faVuejs
)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
