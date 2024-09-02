'use client';
import { Avatar, Popover, Button, Typography } from "@mui/material";
import * as React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import styled from 'styled-components';


const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled(Typography)`
  margin-left: 0.5rem;
  cursor: pointer;

  &:hover{
    text-decoration: underline;
    color: #0070f3;
  }
`;

export default function HeaderAuth() {
  const { data: session } = useSession(); // Get session data from next-auth
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <HeaderContainer>
      <LeftContainer>
        {/* Avatar and Popover Trigger */}
        <Avatar
          src={session?.user?.image || ''} // Safely handle session image
          alt={session?.user?.name || 'Profile'}
        >
          {/* Fallback to first letter of the user's name, or default image */}
          {session?.user?.name?.charAt(0) || ''}
        </Avatar>
        <UserName onClick={handleClick}>
          {session?.user ? `Welcome, ${session.user.name}` : 'Entrar'}
        </UserName>

        {/* Popover */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {/* If currently logged in, show option to log out and vice versa */}
          <div style={{ padding: '16px' }}>
            {session?.user ? (
              <div>
                <Typography>Signed in as {session.user.name}</Typography>
                <Button variant="contained" color="primary" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="contained" color="primary" onClick={() => signIn('github')}>
                Sign In with GitHub
              </Button>
            )}
          </div>
        </Popover>
      </LeftContainer>
    </HeaderContainer>
  );
}
