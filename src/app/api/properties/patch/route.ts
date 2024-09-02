import { NextResponse } from 'next/server';
import { updateProperty } from '@/lib/prisma';

export async function PATCH(request: Request) {
  const data = await request.json();
  const { id, ...updates } = data; 
  try {
    const updatedProperty = await updateProperty(id, updates);

    if (updatedProperty) {
      return NextResponse.json(updatedProperty, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Error updating property' }, { status: 500 });
  }
}
