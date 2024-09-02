import { PrismaClient, Property, Offer } from '@prisma/client';

const prisma = new PrismaClient();


// export async function getAllProperties(sortOrder: 'asc' | 'desc' = 'asc') {
//   return prisma.property.findMany({
//     include: {
//       offers: true,
//     },
//     orderBy: {
//       price: sortOrder,
//     },
//   });
// }
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