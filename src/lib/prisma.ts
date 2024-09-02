import { PrismaClient, Property, Offer } from '@prisma/client';

const prisma = new PrismaClient();


interface GetAllPropertiesParams {
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export async function getAllProperties({sortOrder= 'asc', page = 1, pageSize = 5}: GetAllPropertiesParams) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [properties, totalCount] = await Promise.all([
    prisma.property.findMany({
    include: {
      offers: true,
      },
      orderBy: {
        price: sortOrder,
      },
      skip,
      take,
    }),
    prisma.property.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    properties,
    totalPages,
    currentPage: page,
  };
}


export async function getPropertyById(data:{id: number}) {
  try{

    const property = prisma.property.findUnique({
      where: {
        id: data.id, 
      }
    });
    return property;
  } catch (error){
    console.error('Error fetching proeprt', error);
  }
} 


export async function addProperty(data: {
    image: string;
    price: number;
    description: string;
    characteristics: string[];
}) {
    try {
      const property = await prisma.property.create({
        data: {
          image: data.image,
          price: data.price,
          description: data.description,
          characteristics: data.characteristics,
        },
      });
  
      return property;
    } catch (error) {
      console.error('Error adding property:', error);
      throw error;
    }
}


export async function addOffer(data: {
    name: string;
    email: string;
    description: string;
    propertyId: number;
  }) {
    try {
      const offer = await prisma.offer.create({
        data: {
          name: data.name,
          email: data.email,
          description: data.description,
          propertyId: data.propertyId,
        },
      });
  
      return offer;
    } catch (error) {
      console.error('Error adding offer:', error);
      throw error;
    }
  }

export async function deleteProperty(id: number) {
  try {
    const deletedProperty = await prisma.property.delete({
      where: { id },
    });
    return deletedProperty;
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
}


export async function updateProperty(id: number, updates: Partial<{ image: string; price: number; description: string; characteristics: string[] }>) {
  try {
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: updates,
    });
    return updatedProperty;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
}
