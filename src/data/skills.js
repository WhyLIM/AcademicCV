// 技能数据
import { DEEPSEEK_LOGO, YUANBAO_LOGO, CHATGLM_LOGO, COPILOT_LOGO, TRAE_LOGO, GRADIO_LOGO } from './logos.js';
export const skills = {
  os: {
    title: "OS enthusiast",
    badges: [
      { text: "Windows XP", color: "#5EC281", logo: "windows xp" },
      { text: "Windows 7", color: "#D8E4F0", logo: "windows xp" },
      { text: "Windows 10", color: "#0078D7", logo: "windows 10" },
      { text: "Windows 11", color: "#E5EFFC", logo: "windows 11" },
      { text: "Ubuntu", color: "#E95420", logo: "ubuntu" },
      { text: "Zorin", color: "#15A6F0", logo: "zorin" },
      { text: "Kali", color: "#1B51AD", logo: "kali linux" },
      { text: "CentOS", color: "#A14F8C", logo: "centos" },
      { text: "Hackintosh", color: "black", logo: "apple" }
    ]
  },
  programming: {
    title: "Programming language",
    badges: [
      { text: "PYTHON", color: "#5A8693", logo: "python" },
      { text: "R", color: "#D26E3A", logo: "r" },
      { text: "HTML", color: "#EEA23B", logo: "html5" },
      { text: "CSS", color: "#D8491D", logo: "css" },
      { text: "JAVASCRIPT", color: "#855C3E", logo: "javascript" },
      { text: "PHP", color: "#787CB5", logo: "php" },
      { text: "VUE", color: "#42b883", logo: "vue.js" },
      { text: "SQL", color: "#929BAC", logo: "mysql" },
      { text: "GIT", color: "#F05032", logo: "git" },
      { text: "SHELL", color: "#172639", logo: "shell" }
    ]
  },
  ai: {
    title: "AI & LLM Tools",
    badges: [
      { text: "ChatGPT", color: "412991", logo: "openai" },
      { text: "Claude", color: "D97757", logo: "claude" },
      { text: "DeepSeek", color: "000", logo: DEEPSEEK_LOGO },
      { text: "Yuanbao", color: "FFF", logo: YUANBAO_LOGO },
      { text: "ChatGLM", color: "FFF", logo: CHATGLM_LOGO },
      { text: "Copilot", color: "FFF", logo: COPILOT_LOGO },
      { text: "TRAE", color: "FFF", logo: TRAE_LOGO },
      { text: "LangChain", color: "00AC47", logo: "langchain" },
      { text: "Gradio", color: "FFF", logo: GRADIO_LOGO },
      { text: "HuggingFace", color: "FFD21E", logo: "huggingface" }
    ]
  }
};
