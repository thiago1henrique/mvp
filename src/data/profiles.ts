export type Profile = 'dev' | 'data'

export const hero = {
  name: 'Débora Alves',
  age: 21,
  location: 'Recife, Pernambuco',
  phone: '(81) 99320-0183',
  email: 'deboraalves.uni@gmail.com',
  github: 'https://github.com/debbtrbl',
  linkedin: 'https://linkedin.com/in/debora-leticia-alves/',
  subtitles: {
    dev: 'Desenvolvedora Full-Stack & Qualidade de Software',
    data: 'Analista de Dados | Machine Learning',
  },
  summaries: {
    dev: 'Desenvolvedora apaixonada por criar soluções web robustas e escaláveis. Experiência em desenvolvimento full-stack com Java, Python e JavaScript, aliada a práticas de engenharia de qualidade de software.',
    data: 'Analista de Dados especializada em soluções de Machine Learning e Inteligência Artificial. Experiência com classificação de imagens via Deep Learning, Análise Exploratória de Dados (EDA) e modelagem preditiva para geração de insights estratégicos.',
  },
}

export const skills: Record<Profile, { label: string; items: string[] }[]> = {
  dev: [
    {
      label: 'Linguagens',
      items: ['Java', 'Python', 'JavaScript', 'TypeScript'],
    },
    {
      label: 'Frontend',
      items: ['React', 'Angular'],
    },
    {
      label: 'Backend',
      items: ['Node.js', 'Express', 'Spring Boot', 'NestJS'],
    },
    {
      label: 'Banco de Dados',
      items: ['MySQL', 'PostgreSQL', 'SQLite'],
    },
    {
      label: 'Qualidade',
      items: ['Testes de QA', 'Engenharia de Qualidade'],
    },
  ],
  data: [
    {
      label: 'Manipulação de Dados',
      items: ['Pandas', 'NumPy', 'EDA', 'Feature Engineering'],
    },
    {
      label: 'Machine Learning',
      items: ['Scikit-learn', 'Modelos Preditivos'],
    },
    {
      label: 'Deep Learning',
      items: ['TensorFlow', 'Keras', 'CNNs'],
    },
    {
      label: 'Visualização & BI',
      items: ['Power BI', 'Looker', 'Plotly', 'Streamlit'],
    },
  ],
}

export interface Project {
  title: string
  description: string
  techs: string[]
  github?: string
  demo?: string
}

export const projects: Record<Profile, Project[]> = {
  dev: [
    {
      title: 'ReqON',
      description: 'Plataforma de automação de requerimentos acadêmicos com fluxo de aprovação em múltiplas etapas e gestão de documentos.',
      techs: ['React', 'Node.js', 'NestJS', 'MySQL'],
    },
    {
      title: 'Quiz Chico',
      description: 'Plataforma interativa de Quizzes com sistema de pontuação, múltiplos temas e ranking de usuários.',
      techs: ['Node.js', 'Express', 'Sequelize'],
    },
    {
      title: 'Oxefood',
      description: 'Clone funcional do iFood com catálogo de restaurantes, carrinho de compras e fluxo completo de pedido.',
      techs: ['Spring Boot', 'React', 'PostgreSQL'],
    },
    {
      title: 'Projeto News',
      description: 'API RESTful de notícias com CRUD completo, filtragem por categoria e paginação.',
      techs: ['Node.js', 'SQLite'],
    },
  ],
  data: [
    {
      title: 'CardioAI',
      description: 'Modelo preditivo para previsão de doenças cardíacas com alta acurácia, deploy interativo via Streamlit.',
      techs: ['Random Forest', 'Scikit-learn', 'Streamlit', 'Pandas'],
    },
    {
      title: 'Detecção de Tumores Cerebrais',
      description: 'Classificação de imagens de ressonância magnética (RM) com Deep Learning usando arquitetura Xception.',
      techs: ['TensorFlow', 'Keras', 'CNNs', 'Xception'],
    },
    {
      title: 'Boston Housing AI',
      description: 'Análise exploratória e modelagem preditiva de preços de imóveis com visualizações interativas.',
      techs: ['Scikit-learn', 'Pandas', 'Plotly', 'NumPy'],
    },
  ],
}

export interface EducationItem {
  institution: string
  course: string
  period: string
}

export const education = {
  common: [
    {
      institution: 'IFPE – Jaboatão dos Guararapes',
      course: 'Análise e Desenvolvimento de Sistemas',
      period: 'Fev 2024 – Jul 2026',
    },
    {
      institution: 'Cesar School',
      course: 'Engenharia de Qualidade de Software',
      period: 'Jul 2025 – Set 2025',
    },
    {
      institution: 'Cisco Networking Academy',
      course: 'Python Essentials 1 e 2',
      period: 'Certificação',
    },
  ],
  dataOnly: [
    {
      institution: 'Udemy',
      course: 'Ciência de Dados',
      period: 'Certificação',
    },
    {
      institution: 'Alura',
      course: 'Análise de Dados e Inteligência Artificial',
      period: 'Certificação',
    },
    {
      institution: 'PrograMaria',
      course: 'Análise de Dados',
      period: 'Certificação',
    },
  ],
}
