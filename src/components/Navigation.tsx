'use client';

import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:4000';

const Navigation = () => {
  const path = usePathname();
  const router = useRouter(() => {});
  const { data: session } = useSession();

  const checkSessionForUpload = () => {
    if (!session) {
      signIn();
    } else {
      router.push('/upload');
    }
  };

  const testAPI = () => {
    if (!session) {
      signIn();
      return;
    }
    axios
      .get(BACKEND_URL + '/api/auth/test', {
        headers: {
          displayName: session.user.name,
          email: session.user.email,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">MeTube</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            <p
              className={
                path === '/'
                  ? 'font-bold text-inherit'
                  : 'text-inherit opacity-50'
              }
            >
              Home
            </p>
          </Link>
        </NavbarItem>
        <span>&nbsp;</span>
        <NavbarItem>
          <Link color="foreground" onClick={testAPI}>
            <p
              className={
                path === '/upload'
                  ? 'font-bold text-inherit'
                  : 'text-inherit opacity-50'
              }
            >
              Upload
            </p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {session ? (
            <Button
              onClick={() => signOut()}
              color="primary"
              href="#"
              variant="bordered"
            >
              <span className="font-bold text-inherit text-primary">
                Sign out
              </span>
            </Button>
          ) : (
            <Button
              onClick={() => signIn()}
              color="primary"
              href="#"
              variant="bordered"
            >
              <span className="font-bold text-inherit text-primary">
                Sign in
              </span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Navigation;
