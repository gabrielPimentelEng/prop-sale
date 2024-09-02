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

  const PropertiesGrid = styled.div`
  display: flex;
  flex-direction:column;
  // grid-template-columns: repeat(5, 1fr);
  // grid-template-rows: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
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
        <PropertiesGrid>
          {properties.map((property) => (
            <Property_Card key={property.id} property={property} />
          ))}
        </PropertiesGrid>
        <PaginationContainer>
          {renderPageButtons()}
        </PaginationContainer>
      </div>
    );
  }
  

// import Property_Card from './properties-card';
// import styled from 'styled-components';

// interface Offer {
//   id: number;
//   name: string;
//   email: string;
//   description: string;
//   propertyId: number;
// }

// interface Property {
//   id: number;
//   image: string;
//   price: number;
//   description: string;
//   characteristics: string[];
//   offers: Offer[];
// }

// interface PropertiesProps {
//   properties: Property[];
//   page: number;
//   totalPages: number;
//   onNextPage: () => void;
//   onPreviousPage: () => void;
//   onPageSelect: (pageNumber: number) => void;
// }

// const PropertiesGrid = styled.div`
//   display: flex;
//   gap: 1rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 1rem;
// `;

// const PageButton = styled.button<{ $isActive: boolean }>` /* Use $ prefix for transient prop */
//   width: 40px;
//   height: 40px;
//   margin: 0 5px;
//   background-color: ${(props) => (props.$isActive ? '#0070f3' : '#eaeaea')}; /* Access the transient prop with $ */
//   color: ${(props) => (props.$isActive ? 'white' : 'black')};
//   border: none;
//   border-radius: 4px;
//   font-size: 16px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   &:hover {
//     background-color: ${(props) => (props.$isActive ? '#005bb5' : '#cccccc')};
//   }
// `;

// export default function Properties_Fetch({
//   properties = [],
//   page,
//   totalPages,
//   onNextPage,
//   onPreviousPage,
//   onPageSelect,
// }: PropertiesProps) {
//   const renderPageButtons = () => {
//     const buttons = [];
//     for (let i = 1; i <= totalPages; i++) {
//       buttons.push(
//         <PageButton
//           key={i}
//           $isActive={i === page} /* Pass the prop with $ prefix */
//           onClick={() => onPageSelect(i)}
//         >
//           {i}
//         </PageButton>
//       );
//     }
//     return buttons;
//   };

//   return (
//     <div>
//       <PropertiesGrid>
//         {properties.map((property) => (
//           <Property_Card key={property.id} property={property} />
//         ))}
//       </PropertiesGrid>
//       <PaginationContainer>{renderPageButtons()}</PaginationContainer>
//     </div>
//   );
// }
