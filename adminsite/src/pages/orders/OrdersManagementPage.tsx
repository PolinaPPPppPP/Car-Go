import {
  Title,
  Table,
  Paper,
  Container,
  Stack,
  Group,
  Button,
  ActionIcon,
  Badge,
} from '@mantine/core';
import { IconEdit, IconTrash, IconEye, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const OrdersManagementPage = () => {
  const navigate = useNavigate();

  // Пример данных заказов
  const orders = [
    {
      id: 'ORD-1001',
      client: 'Смирнова А.С.',
      amount: 125000,
      status: 'Новый',
      payment: 'Онлайн-оплата',
      delivery: 'Кузнецовская доставка',
      date: '15.05.2023'
    },
    // ... другие заказы
  ];

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

  const handleView = (id: string) => {
    navigate(`/orders/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/orders/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log('Удаление заказа:', id);
    // Логика удаления заказа
  };

  const handleAdd = () => {
    navigate('/orders/add');
  };

  return (
    <Container size="xl" py="md">
      <Stack gap="xl">
        <Group justify="space-between">
          <Title order={1}>Управление заказами</Title>
          <Button 
            leftSection={<IconPlus size="1rem" />}
            onClick={handleAdd}
          >
            Создать заказ
          </Button>
        </Group>

        <Paper p="md" shadow="sm" radius="md">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID заказа</Table.Th>
                <Table.Th>Клиент</Table.Th>
                <Table.Th>Сумма</Table.Th>
                <Table.Th>Статус</Table.Th>
                <Table.Th>Действия</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {orders.map((order) => (
                <Table.Tr key={order.id}>
                  <Table.Td>{order.id}</Table.Td>
                  <Table.Td>{order.client}</Table.Td>
                  <Table.Td>{order.amount.toLocaleString()} ₽</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleView(order.id)}
                        title="Просмотреть"
                      >
                        <IconEye size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="yellow"
                        onClick={() => handleEdit(order.id)}
                        title="Редактировать"
                      >
                        <IconEdit size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(order.id)}
                        title="Удалить"
                      >
                        <IconTrash size="1rem" />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>
    </Container>
  );
};

export default OrdersManagementPage;