'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import { TextField, Button, Typography } from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useSession } from 'next-auth/react';

interface OffersFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// Styled Components
const StyledBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const StyledCard = styled(Card)`
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 600px;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const StyledButton = styled(Button)`
  align-self: center;
  width: 100px;
`;

const Styled_Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.6rem;
  font-weight: bold;
`;


export default function Offers_Form({
  register,
  errors,
  onSubmit,
}: OffersFormProps) {
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session?.user) {
      // If the user is logged in, set the default values to session data
      register('name', { value: session.user?.name });
      register('email', { value: session.user?.email });
    }
  }, [session, register]);

  return (
    <StyledBox>
      <StyledCard>
        <FormContainer>
          <FormTitle>
            Formulário de oferta
          </FormTitle>
          <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
            <Styled_Container>
              {session ? (
                <>
                  <Typography variant="body1">
                    Nome: {session.user?.name}
                  </Typography>
                  <Typography variant="body1">
                    Email: {session.user?.email}
                  </Typography>
                </>
              ) : (
                <>
                  <StyledTextField
                    id="name"
                    label="Nome"
                    variant="filled"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message?.toString()}
                    required
                  />
                  <StyledTextField
                    id="email"
                    label="Email"
                    variant="filled"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message?.toString()}
                    required
                  />
                </>
              )}
              <StyledTextField
                id="description"
                label="Observação"
                variant="filled"
                multiline
                rows={4}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message?.toString()}
                required
              />
              <StyledButton type="submit" variant="contained">
                Enviar
              </StyledButton>
            </Styled_Container>
          </Box>
        </FormContainer>
      </StyledCard>
    </StyledBox>
  );
}
