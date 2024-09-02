import { NextResponse } from 'next/server';
import { deleteProperty } from '@/lib/prisma';

export async function DELETE(request: Request) {
  const { id } = await request.json(); 

  try {
    const deletedProperty = await deleteProperty(id);

    if (deletedProperty) {
      return NextResponse.json({ message: 'Property deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Error deleting property' }, { status: 500 });
  }
}
