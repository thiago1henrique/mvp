export type Profile = 'dev' | 'data'
export type Theme = 'dark' | 'light'

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
    { label: 'Linguagens',    items: ['Java', 'Python', 'JavaScript', 'TypeScript'] },
    { label: 'Frontend',      items: ['React', 'Angular', 'HTML5', 'CSS3'] },
    { label: 'Backend',       items: ['Node.js', 'Spring Boot', 'NestJS', 'REST APIs'] },
    { label: 'Banco de Dados', items: ['MySQL', 'PostgreSQL', 'SQLite'] },
    { label: 'Qualidade',     items: ['Planejamento de Testes', 'Análise de Requisitos', 'Boas Práticas de QA', 'Relatórios de Qualidade'] },
    { label: 'Testes',        items: ['Testes Manuais', 'Testes Automatizados', 'Cypress', 'JUnit', 'Relatórios de Bugs'] },
  ],
  data: [
    { label: 'Análise de Dados',      items: ['Pandas', 'NumPy', 'SciPy', 'Estatística Descritiva', 'EDA'] },
    { label: 'Visualização de Dados', items: ['Power BI', 'Looker Studio', 'Plotly', 'Seaborn', 'Matplotlib'] },
    { label: 'Banco de Dados',        items: ['MySQL', 'PostgreSQL', 'SQL Avançado'] },
    { label: 'Machine Learning',      items: ['Scikit-learn', 'Random Forest', 'SVM', 'Regressão Logística', 'XGBoost', 'KNN', 'GridSearchCV'] },
    { label: 'Deep Learning',         items: ['TensorFlow', 'Keras', 'CNNs', 'Transfer Learning', 'Data Augmentation', 'Xception', 'ResNet'] },
    { label: 'Técnicas',              items: ['Feature Engineering', 'Modelagem Preditiva', 'Classificação', 'Regressão', 'Validação de Modelos', 'Cross-Validation'] },
  ],
}

export interface Project {
  title: string
  description: string
  techs: string[]
  github?: string
  demo?: string
  embedUrl?: string
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
  ],
  data: [
    {
      title: 'CardioAI',
      description: 'Modelo preditivo para previsão de doenças cardíacas com alta acurácia, deploy interativo via Streamlit.',
      techs: ['Random Forest', 'Scikit-learn', 'Streamlit', 'Pandas'],
    },
    {
      title: 'Detecção de Tumores Cerebrais',
      description: 'Classificação de imagens de ressonância magnética (RM) com Deep Learning usando arquitetura Xception. Acurácia superior a 95%.',
      techs: ['TensorFlow', 'Keras', 'CNNs', 'Xception'],
    },
    {
      title: 'Dashboard Analítico · Looker Studio',
      description: 'Relatório interativo de análise de dados construído no Google Looker Studio. Explore métricas e visualizações diretamente no painel abaixo.',
      techs: ['Looker Studio', 'Google Data Studio', 'BI', 'Data Visualization'],
      embedUrl: 'https://datastudio.google.com/embed/reporting/b732b899-8344-47ee-9e2f-fa9b',
    },
  ],
}

export interface ResearchItem {
  title: string
  category: 'Estudo' | 'Artigo' | 'Exploração Teórica'
  description: string
  year: string
  tags: string[]
  href?: string
}

export const research: ResearchItem[] = [
  {
    title: 'Algoritmos de Classificação para Diagnóstico de Doenças Cardíacas',
    category: 'Estudo',
    description: 'Comparação sistemática entre Random Forest, SVM e Regressão Logística aplicados ao dataset Heart Disease UCI, avaliando métricas de acurácia, precisão, recall e F1-score para identificação do modelo mais adequado ao contexto clínico.',
    year: '2024',
    tags: ['Machine Learning', 'Scikit-learn', 'Classificação', 'Saúde'],
    href: '#',
  },
  {
    title: 'Deep Learning para Classificação de Tumores via Ressonância Magnética',
    category: 'Estudo',
    description: 'Investigação do uso de redes neurais convolucionais (CNNs) com arquitetura Xception para classificação de quatro categorias de tumores cerebrais em imagens de RM, atingindo acurácia superior a 95% com técnicas de data augmentation.',
    year: '2024',
    tags: ['Deep Learning', 'CNN', 'TensorFlow', 'Imagens Médicas'],
    href: '#',
  },
  {
    title: 'Feature Engineering e seu Impacto em Modelos Preditivos',
    category: 'Exploração Teórica',
    description: 'Análise do impacto de técnicas de Feature Engineering — normalização, codificação categórica e criação de variáveis derivadas — no desempenho de modelos de regressão e classificação. Inclui estudo de caso com o dataset Boston Housing.',
    year: '2025',
    tags: ['Feature Engineering', 'EDA', 'Pandas', 'Modelagem Preditiva'],
    href: '#',
  },
]

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
