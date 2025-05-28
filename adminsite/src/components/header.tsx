import {
  Group,
  ActionIcon,
  Burger,
  Title,
  Button,
  Avatar,
  Menu,
  useMantineTheme,
  Modal,
  Text,
  Box,
  Divider,
  Badge,
  Anchor,
  Image
} from '@mantine/core';
import { IconBell, IconLogout, IconHome } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

interface HeaderProps {
  onMobileNavbarToggle: () => void;
  onDesktopNavbarToggle: () => void;
  desktopOpened: boolean;
}

export function Header({ 
  onMobileNavbarToggle, 
  onDesktopNavbarToggle,
  desktopOpened 
}: HeaderProps) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  // Цветовая схема мехового салона
  const furColors = {
    dark: '#8a6337',
    darker: '#50381b',
  };

  const handleLogout = () => {
    close();
    notifications.show({
      title: 'Выход из системы',
      message: 'Вы успешно вышли из системы',
      color: 'green',
    });
    navigate('/');
  };

  return (
    <>
      <Group justify="space-between" h="100%" px="md" bg={theme.colors.gray[0]}>
        <Group>
          {/* Mobile burger button */}
          <Burger
            opened={false}
            onClick={onMobileNavbarToggle}
            size="sm"
            mr="xl"
            hiddenFrom="sm"
            aria-label="Toggle mobile navigation"
            color={furColors.dark}
          />

          {/* Desktop burger button */}
          <Burger
            opened={desktopOpened}
            onClick={onDesktopNavbarToggle}
            size="sm"
            mr="xl"
            visibleFrom="sm"
            aria-label="Toggle desktop navigation"
            color={furColors.dark}
          />

          {/* Логотип и название с ссылкой */}
          <Anchor 
            underline="never" 
            onClick={() => navigate('/dashboard')}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Group gap="xs">
              {/* Замените на ваш логотип */}
              <Image
                src="/Fur-coatsLogo.png" // Укажите правильный путь к логотипу
                width={32}
                height={32}
                alt="Логотип Д&К"
                fallbackSrc="https://placehold.co/32x32?text=Д&К"
              />
              <Box>
                <Title order={3} c={furColors.darker}>
                  Д&К
                </Title>
                <Text size="xs" c="dimmed">Дорого Красиво</Text>
              </Box>
            </Group>
          </Anchor>
        </Group>

        <Group gap="xl">
          <Group gap={4}>
            <Badge variant="filled" color={furColors.dark} radius="sm">
              Системный администратор
            </Badge>
            <Divider orientation="vertical" />
            <Text 
              size="sm" 
              c={furColors.darker} 
              style={{ cursor: 'pointer' }}
              onClick={open}
            >
              Logout
            </Text>
          </Group>

          <ActionIcon 
            variant="subtle" 
            size="lg"
            color={furColors.dark}
          >
            <IconBell size="1.1rem" />
          </ActionIcon>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar
                radius="xl"
                style={{ cursor: 'pointer' }}
                color={furColors.dark}
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Личный кабинет</Menu.Label>
              <Menu.Item 
                leftSection={<IconHome size={14} />}
                onClick={() => navigate('/dashboard')}
              >
                На главную
              </Menu.Item>
              <Menu.Item>Профиль</Menu.Item>
              <Menu.Divider />
              <Menu.Item 
                color="red" 
                leftSection={<IconLogout size={14} />}
                onClick={open}
              >
                Выйти
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>

      {/* Logout confirmation modal */}
      <Modal opened={opened} onClose={close} title="Подтверждение выхода" centered>
        <Text mb="md">Вы уверены, что хотите выйти из системы?</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={close}>
            Отмена
          </Button>
          <Button 
            color="red" 
            leftSection={<IconLogout size={18} />}
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </Group>
      </Modal>
    </>
  );
}