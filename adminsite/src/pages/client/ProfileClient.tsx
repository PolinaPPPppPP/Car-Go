import { 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Container,
  Paper,
  Badge,
  Avatar
} from '@mantine/core';
import { IconEdit, IconCalendar, IconMail, IconPhone } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function ClientProfilePage() {
  const navigate = useNavigate();
  
  // Данные клиента
  const clientData = {
    id: '937601',
    fullName: 'Смирнова Анна Сергеевна',
    clientId: 'ID 937601',
    email: 'anna.smirnova@example.com',
    phone: '+7 (951) 083-34-38',
    birthDate: '16.07.1989',
    registrationDate: '15.04.2015',
    role: 'vip',
    comment: 'Постоянная клиентка с 2015 года. Предпочитает изделия из норки. Размер 48. Любимые цвета: черный, бежевый.',
    purchases: 12,
    totalSpent: 450000
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      'vip': 'violet',
      'regular': 'blue',
      'new': 'green'
    };
    const labels = {
      'vip': 'VIP клиент',
      'regular': 'Постоянный клиент',
      'new': 'Новый клиент'
    };
    return <Badge color={colors[role as keyof typeof colors]} size="lg">{labels[role as keyof typeof labels]}</Badge>;
  };

  const handleEditClick = () => {
    navigate(`/clients/edit/${clientData.id}`); 
  };

  return (
    <Container size="lg" py="md">
      <Stack gap="xl">
        <Title order={1} ta="center">
          Профиль клиента
        </Title>

        {/* Основная информация */}
        <Paper p="md" shadow="sm" radius="md">
          <Group align="flex-start" gap="xl">
            <Avatar size={120} color="blue" radius="xl">
              {clientData.fullName.split(' ').map(n => n[0]).join('')}
            </Avatar>

            <Stack gap="sm">
              <Group gap="sm" align="center">
                <Title order={2}>{clientData.fullName}</Title>
                {getRoleBadge(clientData.role)}
              </Group>

              <Text size="md" c="dimmed">
                {clientData.clientId}
              </Text>

              <Group gap="xl" mt="sm">
                <Stack gap={4}>
                  <Group gap="sm">
                    <IconPhone size="1.2rem" />
                    <Text>{clientData.phone}</Text>
                  </Group>
                  <Group gap="sm">
                    <IconMail size="1.2rem" />
                    <Text>{clientData.email}</Text>
                  </Group>
                </Stack>

                <Stack gap={4}>
                  <Group gap="sm">
                    <IconCalendar size="1.2rem" />
                    <Text>Дата рождения: {clientData.birthDate}</Text>
                  </Group>
                  <Group gap="sm">
                    <IconCalendar size="1.2rem" />
                    <Text>Клиент с: {clientData.registrationDate}</Text>
                  </Group>
                </Stack>
              </Group>
            </Stack>
          </Group>
        </Paper>

        {/* Комментарии */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="sm">Комментарии и предпочтения</Title>
          <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>
            {clientData.comment}
          </Text>
        </Paper>

        <Group justify="flex-end">
          <Button 
            leftSection={<IconEdit size="1rem" />} 
            onClick={handleEditClick} // Используем объявленный обработчик
            color="blue"
          >
            Редактировать профиль
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}