import { useState, useEffect } from 'react';
import {
  Title,
  Container,
  Stack,
  Paper,
  TextInput,
  Select,
  Button,
  Group,
  LoadingOverlay,
  Text,
  Alert
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowLeft, IconAlertCircle, IconCheck } from '@tabler/icons-react';

interface Employee {
  id: number;
  fullName: string;
  position: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  hireDate?: string;
  birthDate?: string;
}

export default function EditEmployeePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockEmployee: Employee = {
          id: Number(id),
          fullName: 'Иванова Мария Петровна',
          position: 'Менеджер по продажам',
          phone: '+7 (912) 345-67-89',
          email: 'maria.ivanova@example.com',
          status: 'active',
          hireDate: '15.03.2020',
          birthDate: '22.05.1985'
        };
        
        form.setValues(mockEmployee);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить данные сотрудника');
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const form = useForm<Employee>({
    initialValues: {
      id: 0,
      fullName: '',
      position: '',
      phone: '',
      email: '',
      status: 'active'
    },
    validate: {
      fullName: (value) => (value.trim().length < 2 ? 'Введите полное имя' : null),
      position: (value) => (value.trim().length < 2 ? 'Введите должность' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      phone: (value) => (value.length >= 10 ? null : 'Некорректный телефон')
    }
  });

  const handleSubmit = async (values: Employee) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Обновленные данные:', values);
      setSuccess(true);
      setTimeout(() => navigate('/employees'), 1500);
    } catch (err) {
      setError('Ошибка при сохранении изменений');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log('Сотрудник удален:', id);
        navigate('/employees');
      } catch (err) {
        setError('Ошибка при удалении сотрудника');
        setLoading(false);
      }
    }
  };

  return (
    <Container size="lg" pos="relative">
      <LoadingOverlay 
        visible={loading} 
        zIndex={1000}
        overlayProps={{ blur: 2 }} // Исправленное свойство для Mantine v7
      />
      
      {/* Остальной код остается без изменений */}
      <Button
        variant="outline"
        leftSection={<IconArrowLeft size="1rem" />}
        onClick={() => navigate('/employees')}
        mb="xl"
      >
        Назад к списку
      </Button>

      <Title order={1} mb="xl">Редактирование сотрудника</Title>

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Ошибка" color="red" mb="xl">
          {error}
        </Alert>
      )}

      {success && (
        <Alert icon={<IconCheck size="1rem" />} title="Успешно!" color="green" mb="xl">
          Данные сотрудника успешно обновлены
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xl">
          <Paper p="md" shadow="sm" radius="md">
            <TextInput
              label="ФИО"
              placeholder="Введите полное имя"
              required
              {...form.getInputProps('fullName')}
            />
            
            <TextInput
              label="Должность"
              placeholder="Введите должность"
              required
              mt="md"
              {...form.getInputProps('position')}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md">
            <TextInput
              label="Телефон"
              placeholder="+7 (___) ___-__-__"
              required
              {...form.getInputProps('phone')}
            />
            
            <TextInput
              label="Email"
              placeholder="example@mail.com"
              required
              mt="md"
              {...form.getInputProps('email')}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md">
            <Select
              label="Статус"
              data={[
                { value: 'active', label: 'Активен' },
                { value: 'inactive', label: 'Неактивен' }
              ]}
              required
              {...form.getInputProps('status')}
            />

            {form.values.hireDate && (
              <Text mt="md" c="dimmed">
                Дата приема: {form.values.hireDate}
              </Text>
            )}
          </Paper>

          <Group justify="space-between">
            <Button 
              variant="outline" 
              color="red"
              onClick={handleDelete}
              disabled={loading}
            >
              Удалить сотрудника
            </Button>
            
            <Group>
              <Button 
                variant="outline" 
                onClick={() => navigate('/employees')}
                disabled={loading}
              >
                Отмена
              </Button>
              <Button 
                type="submit" 
                color="blue"
                disabled={loading}
              >
                Сохранить изменения
              </Button>
            </Group>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}