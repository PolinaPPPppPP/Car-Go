import {
  Title,
  Container,
  Stack,
  Paper,
  TextInput,
  Select,
  Button,
  Group
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export default function AddEmployeePage() {
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      fullName: '',
      position: '',
      phone: '',
      email: '',
      status: 'active'
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      phone: (value) => (value.length >= 10 ? null : 'Некорректный телефон')
    }
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Добавление сотрудника:', values);
    navigate('/employees');
  };

  return (
    <Container size="lg">
      <Title order={1} mb="xl">Добавить сотрудника</Title>
      
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
              {...form.getInputProps('status')}
            />
          </Paper>

          <Group justify="flex-end">
            <Button variant="outline" onClick={() => navigate('/employees')}>
              Отмена
            </Button>
            <Button type="submit">
              Добавить сотрудника
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}