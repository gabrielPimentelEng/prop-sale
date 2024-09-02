import { NextResponse } from 'next/server';
import { addProperty } from '@/lib/prisma';

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const property = await addProperty({
      image: data.image,
      price: data.price,
      description: data.description,
      characteristics: data.characteristics,
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Error creating property' }, { status: 500 });
  }
}
