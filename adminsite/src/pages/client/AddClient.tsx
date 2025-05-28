import {
  TextInput,
  Button,
  Stack,
  Title,
  Group,
  Container,
  SimpleGrid,
  Select,
  Paper,
  rem,
} from '@mantine/core';
import { IconCalendar, IconTrash, IconUser, IconMail, IconPhone, IconId } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IMaskInput } from 'react-imask';

export function ClientAddPage() {
  const form = useForm({
    initialValues: {
      userId: '',
      fullName: '',
      email: '',
      phone: '',
      role: '',
      birthDate: null as Date | null,
      registrationDate: null as Date | null,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Некорректный email'),
      phone: (value) => (value.replace(/\D/g, '').length === 11 ? null : 'Некорректный номер'),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    // Обработка отправки формы
  };

  const resetForm = () => {
    form.reset();
  };

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">Добавить нового клиента</Title>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xl">
          <Paper withBorder p="md" radius="md">
            <Title order={4} mb="md">Основная информация</Title>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              <TextInput 
                label="ID клиента"
                placeholder="Введите уникальный ID"
                leftSection={<IconId size={18} />}
                required
                {...form.getInputProps('userId')}
              />
              
              <TextInput 
                label="ФИО"
                placeholder="Введите полное имя"
                leftSection={<IconUser size={18} />}
                required
                {...form.getInputProps('fullName')}
              />
              
              <TextInput 
                label="Email"
                placeholder="example@mail.com"
                leftSection={<IconMail size={18} />}
                required
                {...form.getInputProps('email')}
              />
              
              <TextInput 
                label="Телефон"
                placeholder="+7 (___) ___-__-__"
                leftSection={<IconPhone size={18} />}
                component={IMaskInput}
                required
                {...form.getInputProps('phone')}
              />
              
              <Select
                label="Роль"
                placeholder="Выберите роль"
                data={[
                  { value: 'vip', label: 'VIP клиент' },
                  { value: 'regular', label: 'Постоянный клиент' },
                  { value: 'new', label: 'Новый клиент' },
                ]}
                required
                {...form.getInputProps('role')}
              />
            </SimpleGrid>
          </Paper>

          <Paper withBorder p="md" radius="md">
            <Title order={4} mb="md">Дополнительная информация</Title>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              <DatePickerInput
                label="Дата рождения"
                placeholder="Выберите дату"
                leftSection={<IconCalendar size={18} />}
                valueFormat="DD.MM.YYYY"
                maxDate={new Date()}
                clearable
                {...form.getInputProps('birthDate')}
              />
              
              <DatePickerInput
                label="Дата регистрации"
                placeholder="Выберите дату"
                leftSection={<IconCalendar size={18} />}
                valueFormat="DD.MM.YYYY"
                maxDate={new Date()}
                clearable
                {...form.getInputProps('registrationDate')}
              />
            </SimpleGrid>
          </Paper>

          <Group justify="flex-end" mt="md">
            <Button 
              variant="outline" 
              color="red" 
              leftSection={<IconTrash size={rem(18)} />}
              onClick={resetForm}
              type="button"
            >
              Очистить форму
            </Button>
            <Button 
              color="blue" 
              size="md"
              type="submit"
            >
              Сохранить клиента
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}