import { useState } from 'react';
import { AppShell, Box } from '@mantine/core';
import { Header } from '../components/header';
import { Navbar } from '../components/navbar';
import { Outlet } from 'react-router';
import { AppBreadcrumbs } from './Breadcrumbs';

export function AppLayout() {
  const [mobileOpened, setMobileOpened] = useState(false);
  const [desktopOpened, setDesktopOpened] = useState(true);

  return (
    <AppShell
      layout="alt"
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { 
          mobile: !mobileOpened,
          desktop: !desktopOpened 
        }
      }}
      transitionDuration={300}
      transitionTimingFunction="ease"
    >
      <AppShell.Header>
        <Header 
          onMobileNavbarToggle={() => setMobileOpened((o) => !o)}
          onDesktopNavbarToggle={() => setDesktopOpened((o) => !o)}
          desktopOpened={desktopOpened}
        />
      </AppShell.Header>
      
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      
      <AppShell.Main>
        <Box p="md">
          <AppBreadcrumbs />
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}