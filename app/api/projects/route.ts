import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { 
  getProjects, 
  getProjectBySlug, 
  addProject, 
  updateProjectBySlug, 
  deleteProjectBySlug 
} from '@/lib/content';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET /api/projects hatası:', error);
    return NextResponse.json(
      { error: 'Projeler yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const project = await request.json();
    
    if (!project.title || !project.slug) {
      return NextResponse.json(
        { error: 'Başlık ve slug zorunludur' },
        { status: 400 }
      );
    }

    const added = await addProject(project);
    return NextResponse.json({ success: true, data: added });
  } catch (error) {
    console.error('POST /api/projects hatası:', error);
    return NextResponse.json(
      { error: 'Proje eklenirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const { slug, project } = await request.json();
    
    if (!slug || !project) {
      return NextResponse.json(
        { error: 'Slug ve proje verisi zorunludur' },
        { status: 400 }
      );
    }

    const updated = await updateProjectBySlug(slug, project);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('PUT /api/projects hatası:', error);
    return NextResponse.json(
      { error: 'Proje güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const { slug } = await request.json();
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug zorunludur' },
        { status: 400 }
      );
    }

    await deleteProjectBySlug(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/projects hatası:', error);
    return NextResponse.json(
      { error: 'Proje silinirken hata oluştu' },
      { status: 500 }
    );
  }
}