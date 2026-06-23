import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src/data');
const dataPath = path.join(dataDir, 'content.json');

const defaultContent = {
  hero: {
    title: "Dijital Deneyimleri Yeniden Tanımlıyoruz",
    subtitle: "Web, mobil ve yapay zeka projelerinde uçtan uca tasarım ve geliştirme.",
    ctaText: "Projeleri Gör",
    ctaLink: "#projects"
  },
  about: {
    title: "Kod yazmıyoruz, deneyimler tasarlıyoruz.",
    description: "Wingcrea, 2006'den bu yana premium dijital ürünler geliştiren bağımsız bir yazılım stüdyosudur.",
    stats: [
      { number: "120+", label: "Tamamlanan Proje" },
      { number: "45+", label: "Mutlu Müşteri" },
      { number: "18+", label: "Yıllık Deneyim" },
      { number: "15", label: "Ödül" }
    ]
  },
  services: [],
  projects: [],
  contact: {
    email: "hello@wingcrea.com",
    phone: "+90 212 555 0123",
    address: "İstanbul, Türkiye",
    workingHours: "Pzt - Cum: 09:00 - 18:00"
  }
};

async function ensureFileExists() {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify(defaultContent, null, 2), 'utf8');
    console.log('✅ content.json otomatik oluşturuldu');
  }
}

export async function getContent() {
  await ensureFileExists();
  const fileContents = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(fileContents);
}

export async function updateContent(newContent: any) {
  await ensureFileExists();
  await fs.writeFile(dataPath, JSON.stringify(newContent, null, 2), 'utf8');
  return newContent;
}

export async function getProjects() {
  const content = await getContent();
  return content.projects || [];
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((p: any) => p.slug === slug) || null;
}

export async function addProject(project: any) {
  const content = await getContent();
  if (!content.projects) content.projects = [];
  content.projects.push(project);
  await updateContent(content);
  return project;
}

export async function updateProjectBySlug(slug: string, updatedProject: any) {
  const content = await getContent();
  const index = content.projects.findIndex((p: any) => p.slug === slug);
  if (index !== -1) {
    content.projects[index] = updatedProject;
    await updateContent(content);
    return updatedProject;
  }
  throw new Error('Proje bulunamadı');
}

export async function deleteProjectBySlug(slug: string) {
  const content = await getContent();
  content.projects = content.projects.filter((p: any) => p.slug !== slug);
  await updateContent(content);
}