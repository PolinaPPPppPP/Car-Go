import { NavLink, ScrollArea, Box, rem } from '@mantine/core';
import {
  IconUsers,
  IconBriefcase,
  IconMessage,
  IconShoppingCart, // Добавляем иконку для заказов
  IconJacket,
  IconCategory
} from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './css/Navbar.module.css';

interface NavItem {
  icon: React.ComponentType<{ size: string }>;
  label: string;
  path: string;
}

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: IconUsers, label: 'Клиенты', path: '/clients' },
    { icon: IconJacket, label: 'Шубы', path: '/fur-coats' },
    { icon: IconBriefcase, label: 'Сотрудники', path: '/employees' },
    { icon: IconShoppingCart, label: 'Заказы', path: '/orders' }, // Новый пункт для заказов
    { icon: IconMessage, label: 'Обратная связь', path: '/feedback' },
    { icon: IconCategory, label: 'Категории', path: '/categories' },
  ];

  return (
    <ScrollArea h={`calc(100vh - ${rem(60)})`} className={classes.scrollArea}>
      <Box p="md" className={classes.navbarBox}>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              component="button"
              label={item.label}
              leftSection={<Icon size="1.2rem" />}
              onClick={() => navigate(item.path)}
              active={location.pathname.startsWith(item.path)}
              className={classes.navLink}
              classNames={{
                root: classes.navLinkRoot,
                body: classes.navLinkBody,
                label: classes.navLinkLabel,
              }}
              variant="subtle"
            />
          );
        })}
      </Box>
    </ScrollArea>
  );
}