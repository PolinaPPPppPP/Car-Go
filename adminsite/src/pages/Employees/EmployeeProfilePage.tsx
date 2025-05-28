import {
  Title,
  Container,
  Stack,
  Paper,
  Group,
  Text,
  Badge,
  Button,
  Avatar
} from '@mantine/core';
import { IconEdit, IconPhone, IconMail, IconBriefcase } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: number;
  fullName: string;
  position: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  hireDate: string;
  birthDate: string;
}

export default function EmployeeProfilePage() {
  const navigate = useNavigate();

  // Пример данных (в реальном приложении нужно загружать по ID)
  const employee: Employee = {
    id: 1,
    fullName: 'Иванова Мария Петровна',
    position: 'Менеджер по продажам',
    phone: '+7 (912) 345-67-89',
    email: 'maria.ivanova@example.com',
    status: 'active',
    hireDate: '15.03.2020',
    birthDate: '22.05.1985'
  };

  return (
    <Container size="lg" py="md">
      <Stack gap="xl">
        <Group justify="space-between">
          <Title order={1}>Профиль сотрудника</Title>
          <Badge color={employee.status === 'active' ? 'green' : 'red'} size="lg">
            {employee.status === 'active' ? 'Активен' : 'Неактивен'}
          </Badge>
        </Group>

        <Paper p="md" shadow="sm" radius="md">
          <Group align="flex-start" gap="xl">
            <Avatar size={120} color="blue" radius="xl">
              {employee.fullName.split(' ').map(n => n[0]).join('')}
            </Avatar>

            <Stack gap="sm">
              <Title order={2}>{employee.fullName}</Title>
              
              <Group gap="xl" mt="sm">
                <Stack gap="sm">
                  <Group gap="sm">
                    <IconBriefcase size="1.2rem" />
                    <Text>Должность: {employee.position}</Text>
                  </Group>
                  <Group gap="sm">
                    <IconPhone size="1.2rem" />
                    <Text>Телефон: {employee.phone}</Text>
                  </Group>
                </Stack>

                <Stack gap="sm">
                  <Group gap="sm">
                    <IconMail size="1.2rem" />
                    <Text>Email: {employee.email}</Text>
                  </Group>
                  <Text>Дата приема: {employee.hireDate}</Text>
                </Stack>
              </Group>
            </Stack>
          </Group>
        </Paper>

        <Group justify="flex-end">
          <Button 
            leftSection={<IconEdit size="1rem" />}
            onClick={() => navigate(`/employees/edit/${employee.id}`)}
          >
            Редактировать
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}