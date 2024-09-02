
import { NextResponse } from 'next/server';
import { getAllProperties } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'asc';
    const page = Number(searchParams.get('page')) || 1;

    const propertiesData = await getAllProperties({
      sortOrder,
      page,
    });

    return NextResponse.json(propertiesData);
  } catch (error: any) {
    console.error('Error fetching properties:', error.message, error.stack);
    return NextResponse.json({ error: 'Error fetching properties' }, { status: 500 });
  }
}
