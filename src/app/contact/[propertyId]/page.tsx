'use client';

import React from 'react';
import axios from 'axios';
import Offers_Form from '@/components/offers-components/offers-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Zod validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(50, "O nome não pode ter mais de 50 caracteres."),
  email: z
    .string()
    .email("Por favor, insira um endereço de email válido."),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres.")
    .max(300, "A descrição não pode ter mais de 300 caracteres."),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage({ params }: { params: { propertyId: string } }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const offer = {
      ...data,
      propertyId: parseInt(params.propertyId),
    };

    try {
      const response = await axios.post('/api/offers/create', offer);

      if (response.status >= 200 && response.status <= 299) {
        alert('Offer sent successfully!');
      } else {
        console.error('Failed to send the offer');
        alert('Failed to send the offer');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the offer');
    }
  };

  return (
    <Offers_Form
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
