import { NextResponse } from 'next/server';
import { addOffer } from '@/lib/prisma';

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const offer = await addOffer({
      name: data.name,
      email: data.email,
      description: data.description,
      propertyId: data.propertyId,
    });

    return NextResponse.json(offer);
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json({ error: 'Error creating offer' }, { status: 500 });
  }
}
