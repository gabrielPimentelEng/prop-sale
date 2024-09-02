import { NextResponse } from 'next/server';
import { getPropertyById } from '@/lib/prisma';

export async function GET(
    request : Request,
    {params}: {params: {propertyId: string}}) {
  try {
    const propertyId = parseInt(params.propertyId, 10);
    if(isNaN(propertyId)){
        return NextResponse.json({error: 'Invalid property ID'}, {status: 400});
    }

    const property = await getPropertyById({id: propertyId});
    if (!property){
        return NextResponse.json({error: 'Property not found'}, {status:404});
    }
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Error fetching property' }, { status: 500 });
  }
}
