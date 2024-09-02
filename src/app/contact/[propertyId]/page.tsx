'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Import useRouter from next/navigation
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
  const router = useRouter();  // Use useRouter from next/navigation
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);
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
        setIsSubmitted(true);
        setSuccessMessage('Oferta enviada! Você será redirecionado em alguns segundos...');
        setTimeout(() => {
          router.push('/');
        }, 5000); // Redirect after 5 seconds
      } else {
        console.error('Failed to send the offer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Offers_Form
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      successMessage={successMessage} // Pass the success message
    />
  );
}
