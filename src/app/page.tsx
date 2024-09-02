'use client';
import axios from 'axios';
import Header from "@/components/header-auth";
import Properties from "@/components/properties-components/properties-fetch";
import Filter_Card from '@/components/properties-components/properties-filter-card';

import styled from 'styled-components';

import React, { useState, useEffect } from 'react';

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

const Main_Container = styled.div`
display: flex;
justify-content: space-between;
padding: 1rem;
@media (max-width: 768px) {
    flex-direction: column;
  }
`

const Properties_Container = styled.div`
display:flex;
justify-content:center;
flex-grow:1
`

const Filter_Card_Container = styled.div`
margin: 0 0 2rem 0;
`;

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/properties', {
          params: {
            sortOrder,
            page,
          },
        });
        setProperties(data.properties);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [sortOrder, page]); // Re-fetch properties whenever sortOrder changes

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageSelect = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <Main_Container>
      <Filter_Card_Container>
        <Filter_Card setSortOrder={setSortOrder}/>
      </Filter_Card_Container>
      <Properties_Container>
        <Properties 
          properties={properties}
          page={page}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          onPageSelect={handlePageSelect}
          />
      </Properties_Container>
    </Main_Container>
  );
}


