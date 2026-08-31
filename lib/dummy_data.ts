export const stacks = ["React", "Next.js", "Laravel", "Node.js", "Python", "Go", "REST", "AI & ML Model Integration", "PostgreSQL", "Redis"];

export type Experience = {
  role: string;
  company: string;
  type: string;
  period: string;
  description: string;
  tags: string[];
};

export const experiencesEn: Experience[] = [
  {
    role: "Staff Fullstack Developer",
    company: "PT Varnion Technology Semesta",
    type: "Full-time",
    period: "April 2025 — Present",
    description:
      `
        Contributed to maintaining the company's production-ready website, Fiberzone, working on both the frontend using React and Next.js and the backend using Go and PHP. I also collaborated with QA engineers, DevOps, developers, and other divisions to plan requirements, develop features, and ensure successful deployment and delivery.

        I was also involved in maintaining the company's billing system, which manages available products or services and promotional offers for each coverage area. In addition, I contributed to the development of the company's newest billing system website, built with Go, Gin, and PostgreSQL, where I was responsible for developing the product, promo, transaction, and dashboard modules.

        I contributed to developing an internal system-log feature using the ELK Stack (Elasticsearch, Logstash, and Kibana) to track and monitor data changes. I also refactored several modules to improve request and response performance, successfully reducing request times by approximately 2× through improvements to database relationships and queries.

        Additionally, I contributed to developing an internet subscription feature for B2B customers with customizable invoice dates and developed features for generating and gathering tax reports to support the Finance division. Through these projects, I have been actively involved in improving the company's internal systems, business productivity, and operational processes.
      `,
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Go", "PostgreSQL", "MySQL", "PHP", "Redis", "Minio"],
  },
  {
    role: "Back End Developer",
    company: "PT Sinergi Merah Putih",
    type: "Part-time",
    period: "Nov 2024 — May 2025",
    description:
      `
        Contributed as a Backend Developer in the development of the HRIS (Tesis) Cycle 2 project, using Node.js, Express.js, Prisma ORM, and PostgreSQL as the main technology stack. I actively participated in daily and weekly standups to report task progress and collaborated closely with frontend developers to understand and fulfill their API requirements.

        I was responsible for developing and delivering features related to overtime management for internal use cases. I also contributed as an individual contributor to the Lab as a Service project, where I developed endpoints for dashboard data and other management-related APIs. Additionally, I successfully developed APIs to support business processes, served data required for dashboard functionality, and debugged and resolved various issues across different business processes.

        Through these projects, I gained experience in backend API development, database management, cross-functional collaboration, and troubleshooting real-world business processes.
      `,
    tags: ["Express.js", "Node.js", "PostgreSQL", "Prisma ORM"],
  },
  {
    role: "Web Developer",
    company: "WIR Group",
    type: "Internship",
    period: "Nov 2024 — Mar 2025",
    description:
      `
        Collaborated with the R&D team as a Frontend Web Developer to develop a chatbot website using React.js and Firebase. During the project, I learned and implemented the Atomic Design pattern in React.js to create a more structured and maintainable frontend architecture.

        I also worked closely with backend developers to plan new features and define API specifications. In addition, I contributed to the development of a client company's profile website using React.js and TypeScript. I also took on backend development responsibilities by using Nest.js to develop authentication APIs, gaining experience across both frontend and backend development.
      `,
    tags: ["React", "Nest.JS", "PostgreSQL", "Prisma", "Wordpress", "Tailwind", "Firebase"],
  },
  {
    role: "Full Stack Developer",
    company: "Vapezoo",
    type: "Internship",
    period: "Jun 2024 — Oct 2024",
    description:
      `
        Supported the company's daily operations as an IT Support, assisting with various technical and operational needs. I also contributed to developing company profile websites for clients using Laravel and MySQL, gaining hands-on experience in web development and database management.
      `,
    tags: ["Laravel", "MySQL", "Node.JS", "React", "Tailwind", "Bootstrap"],
  },
  {
    role: "Web Developer",
    company: "Self Employee",
    type: "Freelance",
    period: "Jul 2023 — Present",
    description:
      `
        Open web development services from scratch that meet customer needs, from simple company profiles to complex business management systems.
      `,
    tags: ["Laravel", "MySQL", "Node.JS", "React", "Tailwind", "Bootstrap", "Express.js", "PHP"],
  },
  {
    role: "Web Software Engineer",
    company: "Nusantara Beta Studio",
    type: "Internship",
    period: "Feb 2023 — Jun 2023",
    description:
      `
        Contributed to several projects as an individual contributor while also collaborating with development teams in an Agile environment. Used Laravel as the primary web development framework, following established development best practices and coding standards. Worked collaboratively with team members using Git and GitLab for version control and source code management.

        During these projects, I gained experience implementing various software design patterns and writing unit tests to improve code quality and maintainability. I also implemented technical SEO practices to improve website visibility and increase organic website traffic.
      `,
    tags: ["Laravel", "MySQL", "Bootstrap", "PHP", "PostgreSQL"],
  },
];

export const experiencesId: Experience[] = [
  {
    role: "Staff Fullstack Developer",
    company: "PT Varnion Technology Semesta",
    type: "Full-time",
    period: "April 2025 — Sekarang",
    description:
      `
        Berkontribusi dalam memelihara situs web siap produksi perusahaan, Fiberzone, bekerja pada frontend menggunakan React dan Next.js serta backend menggunakan Go dan PHP. Saya juga berkolaborasi dengan QA engineer, DevOps, developer, dan divisi lain untuk merencanakan kebutuhan, mengembangkan fitur, serta memastikan keberhasilan deployment dan delivery.

        Saya juga terlibat dalam memelihara sistem penagihan (billing) perusahaan, yang mengelola produk atau layanan yang tersedia serta penawaran promosi untuk setiap area cakupan. Selain itu, saya berkontribusi pada pengembangan situs web sistem penagihan terbaru perusahaan, yang dibangun dengan Go, Gin, dan PostgreSQL, di mana saya bertanggung jawab mengembangkan modul produk, promo, transaksi, dan dasbor.

        Saya berkontribusi dalam mengembangkan fitur log sistem internal menggunakan ELK Stack (Elasticsearch, Logstash, dan Kibana) untuk melacak dan memantau perubahan data. Saya juga melakukan refaktorisasi pada beberapa modul untuk meningkatkan kinerja request dan response, berhasil memangkas waktu request sekitar 2× melalui peningkatan hubungan database dan query.

        Selain itu, saya berkontribusi dalam mengembangkan fitur langganan internet untuk pelanggan B2B dengan tanggal faktur yang dapat disesuaikan dan mengembangkan fitur untuk menghasilkan serta mengumpulkan laporan pajak untuk mendukung divisi Keuangan. Melalui proyek-proyek ini, saya telah terlibat aktif dalam meningkatkan sistem internal perusahaan, produktivitas bisnis, dan proses operasional.
      `,
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Go", "PostgreSQL", "MySQL", "PHP", "Redis", "Minio"],
  },
  {
    role: "Back End Developer",
    company: "PT Sinergi Merah Putih",
    type: "Part-time",
    period: "Nov 2024 — Mei 2025",
    description:
      `
        Berkontribusi sebagai Backend Developer dalam pengembangan proyek HRIS (Tesis) Siklus 2, menggunakan Node.js, Express.js, Prisma ORM, dan PostgreSQL sebagai stack teknologi utama. Saya berpartisipasi aktif dalam standup harian dan mingguan untuk melaporkan kemajuan tugas dan berkolaborasi erat dengan frontend developer untuk memahami dan memenuhi kebutuhan API mereka.

        Saya bertanggung jawab mengembangkan dan mendistribusikan fitur yang berkaitan dengan manajemen lembur untuk kasus penggunaan internal. Saya juga berkontribusi sebagai kontributor individu pada proyek Lab as a Service, di mana saya mengembangkan endpoint untuk data dasbor dan API terkait manajemen lainnya. Selain itu, saya berhasil mengembangkan API untuk mendukung proses bisnis, menyajikan data yang diperlukan untuk fungsi dasbor, serta men-debug dan menyelesaikan berbagai masalah di berbagai proses bisnis.

        Melalui proyek-proyek ini, saya memperoleh pengalaman dalam pengembangan API backend, manajemen database, kolaborasi lintas fungsi, dan penyelesaian masalah proses bisnis di dunia nyata.
      `,
    tags: ["Express.js", "Node.js", "PostgreSQL", "Prisma ORM"],
  },
  {
    role: "Web Developer",
    company: "WIR Group",
    type: "Internship",
    period: "Nov 2024 — Mar 2025",
    description:
      `
        Kolaborasi dengan tim R&D sebagai Frontend Web Developer untuk mengembangkan situs web chatbot menggunakan React.js dan Firebase. Selama proyek berlangsung, saya mempelajari dan menerapkan pola Atomic Design di React.js untuk menciptakan arsitektur frontend yang lebih terstruktur dan mudah dipelihara.

        Saya juga bekerja sama erat dengan backend developer untuk merencanakan fitur baru dan menetapkan spesifikasi API. Selain itu, saya berkontribusi pada pengembangan situs web profil perusahaan klien menggunakan React.js dan TypeScript. Saya juga mengambil tanggung jawab pengembangan backend dengan menggunakan Nest.js untuk mengembangkan API autentikasi, memperoleh pengalaman baik di pengembangan frontend maupun backend.
      `,
    tags: ["React", "Nest.JS", "PostgreSQL", "Prisma", "Wordpress", "Tailwind", "Firebase"],
  },
  {
    role: "Full Stack Developer",
    company: "Vapezoo",
    type: "Internship",
    period: "Jun 2024 — Okt 2024",
    description:
      `
        Mendukung operasional harian perusahaan sebagai IT Support, membantu berbagai kebutuhan teknis dan operasional. Saya juga berkontribusi dalam mengembangkan situs web profil perusahaan untuk klien menggunakan Laravel dan MySQL, mendapatkan pengalaman langsung dalam pengembangan web dan manajemen database.
      `,
    tags: ["Laravel", "MySQL", "Node.JS", "React", "Tailwind", "Bootstrap"],
  },
  {
    role: "Web Developer",
    company: "Pekerja Mandiri",
    type: "Freelance",
    period: "Jul 2023 — Sekarang",
    description:
      `
        Membuka layanan pengembangan web dari awal yang memenuhi kebutuhan pelanggan, mulai dari profil perusahaan sederhana hingga sistem manajemen bisnis yang kompleks.
      `,
    tags: ["Laravel", "MySQL", "Node.JS", "React", "Tailwind", "Bootstrap", "Express.js", "PHP"],
  },
  {
    role: "Web Software Engineer",
    company: "Nusantara Beta Studio",
    type: "Internship",
    period: "Feb 2023 — Jun 2023",
    description:
      `
        Berkontribusi pada beberapa proyek sebagai kontributor individu sekaligus berkolaborasi dengan tim pengembangan dalam lingkungan Agile. Menggunakan Laravel sebagai framework pengembangan web utama, mengikuti praktik terbaik pengembangan dan standar penulisan kode yang telah ditetapkan. Bekerja secara kolaboratif dengan anggota tim menggunakan Git dan GitLab untuk kontrol versi dan manajemen kode sumber.

        Selama proyek ini, saya memperoleh pengalaman dalam menerapkan berbagai pola desain perangkat lunak (software design patterns) dan menulis unit test untuk meningkatkan kualitas kode dan kemudahan pemeliharaan. Saya juga menerapkan praktik SEO teknis untuk meningkatkan visibilitas situs web dan meningkatkan lalu lintas situs web organik.
      `,
    tags: ["Laravel", "MySQL", "Bootstrap", "PHP", "PostgreSQL"],
  },
];

export function getExperiences(locale: string): Experience[] {
  return locale === 'id' ? experiencesId : experiencesEn;
}