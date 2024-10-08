// import Property_Card from './properties-card';
// import styled from 'styled-components';

// interface Offer {
//     id: number;
//     name: string;
//     email: string;
//     description: string;
//     propertyId: number;
//   }
  
//   interface Property {
//     id: number;
//     image: string;
//     price: number;
//     description: string;
//     characteristics: string[];
//     offers: Offer[];
//   }
  
//   interface PropertiesProps {
//     properties: Property[];
//     page: number;
//     totalPages: number;
//     onNextPage: () => void;
//     onPreviousPage: () => void;
//     onPageSelect: (pageNumber: number) => void;
//   }

// const PropertiesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   grid-template-rows: repeat(2, 1fr);
//   gap: 1rem;
//   margin-bottom: 2rem;
//   overflow-y: auto; /* Enable vertical scrolling if content overflows */

//   & > :nth-child(3),
//   & > :nth-child(4),
//   & > :nth-child(5) {
//     grid-column: span 2;
//   }

//   & > :nth-child(1) {
//     grid-column-start: 2;
//     grid-column-end: span 2;
//   }

//   & > :nth-child(2) {
//     grid-column: span 1;
//     grid-column-start: 4;
//     grid-column-end: span 2;
//   }

//   @media (max-width: 1000px){
//   display: flex;
//   flex-direction:column;
// }
// `;


//   const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 1rem;
// `;

// const PageButton = styled.button<{ isActive: boolean }>`
//   width: 40px;
//   height: 40px;
//   margin: 0 5px;
//   background-color: ${(props) => (props.isActive ? '#0070f3' : '#eaeaea')};
//   color: ${(props) => (props.isActive ? 'white' : 'black')};
//   border: none;
//   border-radius: 4px;
//   font-size: 16px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &:hover {
//     background-color: ${(props) => (props.isActive ? '#005bb5' : '#cccccc')};
//   }
// `;
  
//   export default function Properties_Fetch({
//     properties = [],
//     page,
//     totalPages,
//     onNextPage,
//     onPreviousPage,
//     onPageSelect,
//   }: PropertiesProps) {

//     const renderPageButtons = () => {
//       const buttons = [];
//       for (let i = 1; i <= totalPages; i++) {
//         buttons.push(
//           <PageButton
//             key={i}
//             isActive={i === page}
//             onClick={() => onPageSelect(i)}
//           >
//             {i}
//           </PageButton>
//         );
//       }
//       return buttons;
//     };

//     return (
//       <div>
//         <PropertiesGrid>
//           {properties.map((property) => (
//             <Property_Card key={property.id} property={property} />
//           ))}
//         </PropertiesGrid>
//         {properties.length > 0 && (
//                 <PaginationContainer>
//                     {renderPageButtons()}
//                 </PaginationContainer>
//             )}
//       </div>
//     );
//   }
import React, { useState } from 'react';
import Property_Card from './properties-card';
import styled from 'styled-components';

interface Offer {
  id: number;
  name: string;
  email: string;
  description: string;
  propertyId: number;
}

interface Property {
  id: number;
  image: string;
  price: number;
  description: string;
  characteristics: string[];
  offers: Offer[];
}

interface PropertiesProps {
  properties: Property[];
  page: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageSelect: (pageNumber: number) => void;
}

const PropertiesGrid = styled.div<{ itemCount: number }>`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-y: auto;
  

  ${(props) =>
    props.itemCount < 5
      ? `
        display:flex;
      `
      : `
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(2, 1fr);

        & > :nth-child(3),
        & > :nth-child(4),
        & > :nth-child(5) {
          grid-column: span 2;
        }

        & > :nth-child(1) {
          grid-column-start: 2;
          grid-column-end: span 2;
        }

        & > :nth-child(2) {
          grid-column: span 1;
          grid-column-start: 4;
          grid-column-end: span 2;
        }
      `}

  @media (max-width: 748px) {
    display: flex;
    flex-direction: column;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  background-color: ${(props) => (props.isActive ? '#0070f3' : '#eaeaea')};
  color: ${(props) => (props.isActive ? 'white' : 'black')};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#005bb5' : '#cccccc')};
  }
`;

export default function Properties_Fetch({
  properties = [],
  page,
  totalPages,
  onNextPage,
  onPreviousPage,
  onPageSelect,
}: PropertiesProps) {
  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PageButton
          key={i}
          isActive={i === page}
          onClick={() => onPageSelect(i)}
        >
          {i}
        </PageButton>
      );
    }
    return buttons;
  };

  return (
    <div>
      <PropertiesGrid itemCount={properties.length}>
        {properties.map((property) => (
          <Property_Card key={property.id} property={property} />
        ))}
      </PropertiesGrid>
      {properties.length > 0 && (
        <PaginationContainer>
          {renderPageButtons()}
        </PaginationContainer>
      )}
    </div>
  );
}
