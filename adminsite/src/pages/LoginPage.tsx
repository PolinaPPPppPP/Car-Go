import { 
  Container, 
  Title, 
  TextInput, 
  PasswordInput, 
  Button, 
  Stack, 
  Paper, 
  Box,
  Text,
  Divider,
  Center
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { IconLock, IconUser, IconLogin, IconShirt } from '@tabler/icons-react';

export default function LoginPage() {
  const navigate = useNavigate();

  // Цветовая палитра для меховой тематики
  const furColors = {
    light: '#f5f1e6',    // светлый бежевый
    medium: '#d9c3a7',   // средний бежевый
    dark: '#8a6337',     // темно-коричневый
    darker: '#50381b',   // очень темный коричневый
  };

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value: string) => (value.length < 3 ? 'Логин слишком короткий' : null),
      password: (value: string) => (value.length < 5 ? 'Пароль должен содержать минимум 6 символов' : null),
    },
  });

  const handleSubmit = (values: { username: string; password: string }) => {
    if (values.username === 'admin' && values.password === 'admin') {
      localStorage.setItem('authToken', 'demo-token');
      navigate('/dashboard'); // Просто переходим без уведомления
    } else {
      alert('Неверный логин или пароль'); // Оставляем только ошибку
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${furColors.light} 0%, ${furColors.medium} 100%)`,
      }}
    >
      <Container size="xs" w="100%">
        <Paper 
          withBorder 
          shadow="xl" 
          p={40}
          radius="lg"
          style={{
            backgroundColor: 'rgba(255, 245, 238, 0.95)',
            borderColor: furColors.dark,
          }}
        >
          <Stack align="center" mb="xl" gap="xs">
            <IconShirt 
              size={60} 
              color={furColors.dark} 
              stroke={1.2}
            />
            <Title order={2} c={furColors.darker} fw={700} style={{ fontFamily: "'Georgia', serif" }}>
              Д&К - Администратор
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Эксклюзивный доступ к управлению ассортиментом
            </Text>
          </Stack>

          <Divider my="md" color={furColors.medium} />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              <TextInput
                withAsterisk
                label="Логин"
                placeholder="Ваш логин"
                leftSection={<IconUser size="1.2rem" color={furColors.dark} />}
                styles={{
                  input: {
                    borderColor: furColors.medium,
                    '&:focus': {
                      borderColor: furColors.dark,
                    }
                  },
                }}
                {...form.getInputProps('username')}
              />

              <PasswordInput
                withAsterisk
                label="Пароль"
                placeholder="Ваш пароль"
                leftSection={<IconLock size="1.2rem" color={furColors.dark} />}
                styles={{
                  input: {
                    borderColor: furColors.medium,
                    '&:focus': {
                      borderColor: furColors.dark,
                    }
                  },
                }}
                {...form.getInputProps('password')}
              />

              <Button 
                type="submit"
                leftSection={<IconLogin size="1.2rem" />}
                variant="filled"
                color="dark"
                fullWidth
                size="md"
                mt="xl"
                style={{
                  transition: 'all 0.3s',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    backgroundColor: furColors.darker,
                  }
                }}
              >
                Войти в систему
              </Button>
            </Stack>
          </form>

          <Center mt="xl">
            <Text c="dimmed" size="xs">
              © 2025 Д&К - Дорого Красиво
            </Text>
          </Center>
        </Paper>
      </Container>
    </Box>
  );
}