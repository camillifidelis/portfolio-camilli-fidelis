// Single source of truth for portfolio content. Every entry comes from the
// current site, the CV or the public GitHub READMEs — never invent data here.

export const PROFILE = {
  name: "Camilli Fidelis",
  email: "cfidelisg@gmail.com",
  github: "https://github.com/camillifidelis",
  linkedin: "https://www.linkedin.com/in/camilli-fidelis-40287b228/",
  formEndpoint: "https://formspree.io/f/xrepzovp",
} as const;

export const NAV_ITEMS = [
  { id: "sobre", label: "Sobre mim" },
  { id: "projetos", label: "Projetos" },
  { id: "skills", label: "Skills" },
  { id: "contato", label: "Contato" },
] as const;

export type JourneyIcon =
  | "graduation"
  | "briefcase"
  | "users"
  | "kanban"
  | "globe"
  | "server"
  | "monitor";

export interface JourneyItem {
  category: string;
  period: string;
  title: string;
  description: string;
  icon: JourneyIcon;
  highlight?: boolean;
}

export const JOURNEY: JourneyItem[] = [
  {
    category: "Formação",
    period: "2022 — Atual",
    title: "UFRRJ",
    description:
      "Graduação em Sistemas de Informação com foco em programação, banco de dados e engenharia de software.",
    icon: "graduation",
  },
  {
    category: "Empresa Júnior",
    period: "2022 — 2023",
    title: "Signal Jr.",
    description:
      "Projetos reais para clientes, levantamento de requisitos, documentação e alinhamento de entregas.",
    icon: "briefcase",
  },
  {
    category: "Acadêmico",
    period: "2023",
    title: "Monitoria",
    description:
      "Apoio na disciplina Linguagem de Programação I e reforço de fundamentos técnicos.",
    icon: "users",
  },
  {
    category: "Gestão",
    period: "2024",
    title: "Gestão de Projeto",
    description:
      "Liderança de equipe em sistema acadêmico de reservas hoteleiras, cronograma e modelagem UML.",
    icon: "kanban",
  },
  {
    category: "Evento acadêmico",
    period: "2024",
    title: "BSDDay",
    description:
      "Desenvolvimento do site institucional do evento do Departamento de Computação com HTML, CSS e Git.",
    icon: "globe",
  },
  {
    category: "Experiência",
    period: "2026 — Atual",
    title: "Treina Mais",
    description:
      "Monitora de T.I.: suporte aos alunos em informática e programação, configuração de softwares e resolução de problemas técnicos.",
    icon: "monitor",
  },
  {
    category: "Foco atual",
    period: "Atual",
    title: "Backend Java",
    description: "Estudo e desenvolvimento com Java, Spring Boot, APIs REST e SQL.",
    icon: "server",
    highlight: true,
  },
];

export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  github: string;
  demo?: string;
  detail: {
    objective: string;
    features: string[];
    structure: string[];
    context: string;
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "todolist-java",
    number: "01",
    title: "API REST — To-do List com Autenticação",
    category: "API REST · Segurança",
    description:
      "API REST para gerenciamento de tarefas desenvolvida com Java 21 e Spring Boot. O projeto inclui autenticação via Basic Auth, criptografia de senhas com BCrypt, containerização com Docker e deploy em ambiente cloud. Permite operações completas de CRUD com foco em segurança e organização.",
    highlights: ["Autenticação", "Persistência de dados", "CRUD", "Deploy em cloud"],
    tech: ["Java 21", "Spring Boot", "Docker", "BCrypt", "Basic Auth", "Render"],
    github: "https://github.com/camillifidelis/todolist-java",
    demo: "https://todolist-java-fnic.onrender.com",
    detail: {
      objective:
        "Construir uma API de tarefas com foco em segurança, persistência e boas práticas, pronta para rodar em container e em produção.",
      features: [
        "CRUD completo de tarefas com associação por usuário",
        "Controle de acesso por autenticação Basic Auth",
        "Isolamento de dados: cada usuário acessa apenas suas tarefas",
        "Validações de negócio para datas e consistência dos dados",
        "Criptografia de senha com BCrypt",
      ],
      structure: [
        "Java 21 · Spring Boot · Spring Data JPA · Spring Security",
        "H2 Database (em memória, para desenvolvimento e testes)",
        "Dockerfile na raiz e deploy automatizado no Render",
        "Endpoints: POST /users · POST /tasks · GET /tasks · PUT /tasks/{id}",
      ],
      context: "Desenvolvido durante o evento Next Level Week (NLW) da Rocketseat.",
    },
  },
  {
    slug: "workshop-springboot4-jpa",
    number: "02",
    title: "API REST — Pedidos e Usuários",
    category: "API REST · ORM",
    description:
      "API REST desenvolvida com Spring Boot e JPA, focada no gerenciamento de pedidos, usuários, produtos e categorias. Implementa operações de CRUD, relacionamento entre entidades e persistência com banco de dados relacional.",
    highlights: ["Recursos organizados", "Relacionamentos", "CRUD"],
    tech: ["Spring Boot", "JPA", "Hibernate", "H2"],
    github: "https://github.com/camillifidelis/workshop-springboot4-jpa",
    detail: {
      objective:
        "Praticar mapeamento objeto-relacional com JPA, tratando associações entre entidades e operações CRUD completas.",
      features: [
        "Modelo de domínio com entidades, associações e coleções",
        "Mapeamento objeto-relacional com JPA/Hibernate",
        "Busca, inserção, atualização e deleção de recursos",
        "Tratamento de exceções customizado",
        "Seed automático do banco de dados",
      ],
      structure: [
        "Camadas Resource/Controller, Service e Repository",
        "H2 em memória no perfil de testes; suporte a PostgreSQL",
        "Recursos: Users, Orders, Categories e Products",
        "Testes de requisições com Postman",
      ],
      context:
        "Projeto guiado do curso Java Completo (Udemy), com orientação do professor Nelio Alves.",
    },
  },
  {
    slug: "cami-projeto-mongo",
    number: "03",
    title: "API REST — Autores, Posts e Comentários",
    category: "API REST · NoSQL",
    description:
      "API REST desenvolvida com Spring Boot e MongoDB para gerenciamento de autores, posts e comentários. Inclui operações de CRUD e testes de requisições utilizando Postman.",
    highlights: ["Relacionamento entre entidades", "Organização da API", "CRUD"],
    tech: ["Spring Boot", "MongoDB", "Postman"],
    github: "https://github.com/camillifidelis/cami-projeto-mongo",
    detail: {
      objective:
        "Praticar integração com banco NoSQL e operações CRUD via API REST.",
      features: [
        "Operações CRUD via API REST (GET, POST, PUT, DELETE)",
        "Persistência de dados em MongoDB",
        "Gerenciamento de autores, posts e comentários",
      ],
      structure: [
        "Camadas controller, service e repository",
        "Spring Data MongoDB",
        "Testes de endpoints com Postman",
      ],
      context:
        "Projeto guiado do curso Java Completo (Udemy), com orientação do professor Nelio Alves.",
    },
  },
];

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export interface StackItem {
  name: string;
  icon: string;
  local?: "excel" | "word" | "powerpoint" | "powerbi";
  invertInDark?: boolean;
}

export interface StackGroup {
  label: string;
  code: string;
  items: StackItem[];
}

export const STACK: StackGroup[] = [
  {
    label: "Backend",
    code: "01",
    items: [
      { name: "Java", icon: `${DEVICON}/java/java-original.svg` },
      { name: "Spring Boot", icon: `${DEVICON}/spring/spring-original.svg` },
      { name: "APIs REST", icon: "api" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    label: "Banco de dados",
    code: "02",
    items: [
      { name: "MySQL", icon: `${DEVICON}/mysql/mysql-original.svg` },
      { name: "MongoDB", icon: `${DEVICON}/mongodb/mongodb-original.svg` },
    ],
  },
  {
    label: "Linguagens & Frontend",
    code: "03",
    items: [
      { name: "C", icon: `${DEVICON}/c/c-original.svg` },
      { name: "JavaScript", icon: `${DEVICON}/javascript/javascript-original.svg` },
      { name: "HTML5", icon: `${DEVICON}/html5/html5-original.svg` },
      { name: "CSS3", icon: `${DEVICON}/css3/css3-original.svg` },
    ],
  },
  {
    label: "Ferramentas",
    code: "04",
    items: [
      { name: "Git", icon: `${DEVICON}/git/git-original.svg` },
      { name: "GitHub", icon: `${DEVICON}/github/github-original.svg`, invertInDark: true },
      { name: "Docker", icon: `${DEVICON}/docker/docker-original.svg` },
      { name: "Postman", icon: `${DEVICON}/postman/postman-original.svg` },
    ],
  },
  {
    label: "Outras ferramentas",
    code: "05",
    items: [
      { name: "Excel", icon: "", local: "excel" },
      { name: "Word", icon: "", local: "word" },
      { name: "PowerPoint", icon: "", local: "powerpoint" },
      { name: "Power BI", icon: "", local: "powerbi" },
    ],
  },
];
