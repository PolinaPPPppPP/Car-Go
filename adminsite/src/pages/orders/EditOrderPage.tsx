import { Title, Container, Stack, Paper, TextInput, Select, Button, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

export default function EditOrderPage() {
  // Пример данных заказа для редактирования
  const order = {
    id: 'ORD-1001',
    client: 'Смирнова Анна Сергеевна',
    products: ['Норковая шуба "Элегант"', 'Мутоновая шапка'],
    amount: 125000,
    status: 'Доставлен',
    paymentMethod: 'Онлайн-оплата',
    deliveryMethod: 'Кузнецовская доставка',
    orderDate: new Date(2023, 4, 15),
    deliveryDate: new Date(2023, 4, 18),
    deliveryAddress: 'г. Москва, ул. Примерная, д. 10, кв. 25'
  };

  const form = useForm({
    initialValues: {
      status: order.status,
      paymentMethod: order.paymentMethod,
      deliveryMethod: order.deliveryMethod,
      deliveryDate: order.deliveryDate,
      deliveryAddress: order.deliveryAddress
    }
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Обновление заказа:', values);
    // Логика обновления заказа
  };

  return (
    <Container size="lg">
      <Title order={2} mb="xl">Редактирование заказа #{order.id}</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xl">
          <Paper p="md" shadow="sm" radius="md">
            <Text fw={500}>Клиент: {order.client}</Text>
            <Text>Товары: {order.products.join(', ')}</Text>
            <Text>Сумма: {order.amount.toLocaleString()} ₽</Text>
            <Text>Дата заказа: {order.orderDate.toLocaleDateString()}</Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md">
            <Select
              label="Статус заказа"
              data={['Новый', 'В обработке', 'Отправлен', 'Доставлен', 'Отменен']}
              required
              {...form.getInputProps('status')}
            />

            <Select
              label="Способ оплаты"
              data={['Онлайн-оплата', 'Оплата при получении', 'Наличные', 'Безналичные']}
              required
              {...form.getInputProps('paymentMethod')}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md">
            <Select
              label="Способ доставки"
              data={['Кузнецовская доставка', 'Самоефонная', 'Транспортная компания', 'Почта России']}
              required
              {...form.getInputProps('deliveryMethod')}
            />

            <DatePickerInput
              label="Дата доставки"
              leftSection={<IconCalendar size="1rem" />}
              {...form.getInputProps('deliveryDate')}
            />

            <TextInput
              label="Адрес доставки"
              {...form.getInputProps('deliveryAddress')}
            />
          </Paper>

          <Group justify="flex-end" gap="md">
            <Button variant="outline" color="red">
              Удалить заказ
            </Button>
            <Button type="submit">
              Сохранить изменения
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
}