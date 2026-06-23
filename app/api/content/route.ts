import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getContent, updateContent } from '@/lib/content';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
    }

    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('GET /api/content hatası:', error);
    return NextResponse.json(
      { error: 'İçerik yüklenirken hata oluştu' }, 
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

    const newContent = await request.json();
    
    // Validasyon
    if (!newContent || typeof newContent !== 'object') {
      return NextResponse.json(
        { error: 'Geçersiz içerik formatı' }, 
        { status: 400 }
      );
    }

    const updated = await updateContent(newContent);
    return NextResponse.json({ 
      success: true, 
      message: 'İçerik başarıyla kaydedildi',
      data: updated 
    });
  } catch (error) {
    console.error('POST /api/content hatası:', error);
    return NextResponse.json(
      { error: 'İçerik kaydedilirken hata oluştu' }, 
      { status: 500 }
    );
  }
}