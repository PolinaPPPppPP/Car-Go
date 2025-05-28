import { Title, Container, Stack, Paper, TextInput, Select, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

export default function AddOrderPage() {
  const form = useForm({
    initialValues: {
      client: '',
      products: [],
      amount: 0,
      status: 'Новый',
      paymentMethod: '',
      deliveryMethod: '',
      orderDate: new Date(),
      deliveryAddress: ''
    }
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Создание заказа:', values);
    // Логика сохранения заказа
  };

  return (
    <Container size="lg">
      <Title order={2} mb="xl">Создание нового заказа</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xl">
          <Paper p="md" shadow="sm" radius="md">
            <Select
              label="Клиент"
              placeholder="Выберите клиента"
              data={[]}
              required
              {...form.getInputProps('client')}
            />
            
            <Select
              label="Товары"
              placeholder="Выберите товары"
              data={[]}
              multiple
              required
              {...form.getInputProps('products')}
            />

            <TextInput
              label="Сумма заказа"
              type="number"
              required
              {...form.getInputProps('amount')}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md">
            <Select
              label="Статус заказа"
              data={['Новый', 'В обработке', 'Отправлен', 'Доставлен', 'Отменен']}
              required
              {...form.getInputProps('status')}
            />

            <DatePickerInput
              label="Дата заказа"
              leftSection={<IconCalendar size="1rem" />}
              required
              {...form.getInputProps('orderDate')}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md">
            <Select
              label="Способ оплаты"
              data={['Онлайн-оплата', 'Оплата при получении', 'Наличные', 'Безналичные']}
              required
              {...form.getInputProps('paymentMethod')}
            />

            <Select
              label="Способ доставки"
              data={['Кузнецовская доставка', 'Самоефонная', 'Транспортная компания', 'Почта России']}
              required
              {...form.getInputProps('deliveryMethod')}
            />

            <TextInput
              label="Адрес доставки"
              {...form.getInputProps('deliveryAddress')}
            />
          </Paper>

          <Group justify="flex-end">
            <Button type="submit">Создать заказ</Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}