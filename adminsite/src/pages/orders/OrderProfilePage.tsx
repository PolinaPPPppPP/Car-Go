import { Title, Container, Stack, Paper, Group, Badge, Text, Button } from '@mantine/core';
import { IconCalendar, IconUser, IconWallet, IconTruck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; // Добавляем импорт useNavigate

export default function OrderProfilePage() {
  const navigate = useNavigate(); // Инициализируем навигацию

  // Пример данных заказа
  const order = {
    id: 'ORD-1001',
    client: 'Смирнова Анна Сергеевна',
    products: ['Норковая шуба "Элегант"', 'Мутоновая шапка'],
    amount: 125000,
    status: 'Доставлен',
    paymentMethod: 'Онлайн-оплата',
    deliveryMethod: 'Кузнецовская доставка',
    orderDate: '15.05.2023',
    deliveryDate: '18.05.2023',
    deliveryAddress: 'г. Москва, ул. Примерная, д. 10, кв. 25'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новый': return 'blue';
      case 'В обработке': return 'yellow';
      case 'Отправлен': return 'orange';
      case 'Доставлен': return 'green';
      case 'Отменен': return 'red';
      default: return 'gray';
    }
  };

  // Функция для обработки клика по кнопке редактирования
  const handleEditClick = () => {
    navigate(`/orders/edit/${order.id}`); // Перенаправляем на страницу редактирования
  };

  return (
    <Container size="lg">
      <Stack gap="xl">
        <Group justify="space-between">
          <Title order={2}>Заказ #{order.id}</Title>
          <Badge color={getStatusColor(order.status)} size="xl">
            {order.status}
          </Badge>
        </Group>

        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Информация о заказе</Title>
          <Group gap="xl">
            <Stack gap="sm">
              <Group gap="sm">
                <IconUser />
                <Text>Клиент: {order.client}</Text>
              </Group>
              <Group gap="sm">
                <IconCalendar />
                <Text>Дата заказа: {order.orderDate}</Text>
              </Group>
              <Text fw={500}>Сумма: {order.amount.toLocaleString()} ₽</Text>
            </Stack>
          </Group>
        </Paper>

        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Товары</Title>
          <Stack gap="sm">
            {order.products.map((product, index) => (
              <Text key={index}>- {product}</Text>
            ))}
          </Stack>
        </Paper>

        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Оплата и доставка</Title>
          <Group gap="xl">
            <Stack gap="sm">
              <Group gap="sm">
                <IconWallet />
                <Text>Способ оплаты: {order.paymentMethod}</Text>
              </Group>
            </Stack>
            <Stack gap="sm">
              <Group gap="sm">
                <IconTruck />
                <Text>Способ доставки: {order.deliveryMethod}</Text>
              </Group>
              <Text>Адрес: {order.deliveryAddress}</Text>
              <Text>Дата доставки: {order.deliveryDate}</Text>
            </Stack>
          </Group>
        </Paper>

        <Group justify="flex-end">
          <Button 
            onClick={handleEditClick} // Добавляем обработчик клика
            color="blue"
          >
            Редактировать
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}