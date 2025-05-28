import { useState, useEffect } from 'react';
import {
  Table,
  TextInput,
  Pagination,
  Button,
  Container,
  Title,
  LoadingOverlay,
  Group,
  Center,
  Badge,
  Text,
  ActionIcon,
  Paper,
  Stack,
  Modal,
  Textarea,
  rem,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { 
  IconPlus, 
  IconArrowsSort, 
  IconCalendar, 
  IconUser, 
  IconMail, 
  IconPhone,
  IconEye,
  IconEdit,
  IconTrash,
  IconSearch
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface Client {
  id: number;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  birthDate: string;
  registrationDate: string;
  address?: string;
  notes?: string;
}

const mockClients: Client[] = [
  {
    id: 1,
    userId: 'ID 937601',
    fullName: 'Смирнова Анна Сергеевна',
    phone: '+7 (951) 083-34-38',
    email: 'anna.smirnova@example.com',
    role: 'vip',
    birthDate: '16.07.1989',
    registrationDate: '15.04.2015',
    address: 'г. Москва, ул. Ленина, д. 15, кв. 42',
    notes: 'Предпочитает шубы из натурального меха'
  },
  {
    id: 2,
    userId: 'ID 845212',
    fullName: 'Иванова Мария Петровна',
    phone: '+7 (912) 345-67-89',
    email: 'maria.ivanova@example.com',
    role: 'regular',
    birthDate: '22.11.1992',
    registrationDate: '10.02.2020',
    address: 'г. Санкт-Петербург, Невский пр-т, д. 100',
    notes: 'Интересуется демисезонными моделями'
  }
];

type SortField = 'id' | 'fullName' | 'role' | 'registrationDate';

const ClientsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [clientsData, setClientsData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: 'asc' | 'desc';
  }>({ field: 'id', direction: 'asc' });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  
  const itemsPerPage = 10;

  const loadDataFromDB = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setClientsData(mockClients);
    setLoading(false);
  };

  useEffect(() => {
    loadDataFromDB();
  }, []);

  const handleSort = (field: SortField) => {
    setSortConfig({
      field,
      direction: sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedClients = [...clientsData].sort((a, b) => {
    if (sortConfig.field === 'id') {
      return sortConfig.direction === 'asc' ? a.id - b.id : b.id - a.id;
    } else if (sortConfig.field === 'fullName') {
      return sortConfig.direction === 'asc'
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName);
    } else if (sortConfig.field === 'registrationDate') {
      return sortConfig.direction === 'asc'
        ? new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime()
        : new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
    } else {
      return sortConfig.direction === 'asc'
        ? a.role.localeCompare(b.role)
        : b.role.localeCompare(a.role);
    }
  });

  const filteredClients = sortedClients.filter(client =>
    client.fullName.toLowerCase().includes(search.toLowerCase()) ||
    client.phone.includes(search) ||
    client.email.toLowerCase().includes(search.toLowerCase()) ||
    client.userId.includes(search)
  );

  const paginatedClients = filteredClients.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const getRoleBadge = (role: string) => {
    const colors = {
      'vip': 'violet',
      'regular': 'blue',
      'new': 'green'
    };
    const labels = {
      'vip': 'VIP',
      'regular': 'Постоянный',
      'new': 'Новый'
    };
    return <Badge color={colors[role as keyof typeof colors]}>{labels[role as keyof typeof labels]}</Badge>;
  };

  const handleDelete = (id: number) => {
    setClientsData(clientsData.filter(client => client.id !== id));
  };

  const handleView = (client: Client) => {
    setSelectedClient(client);
    open();
  };

  const SortableHeader = ({ 
    field, 
    children 
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <Table.Th 
      style={{ cursor: 'pointer' }}
      onClick={() => handleSort(field)}
    >
      <Group gap={4} wrap="nowrap">
        {children}
        <IconArrowsSort 
          style={{
            width: rem(16),
            height: rem(16),
            opacity: sortConfig.field === field ? 1 : 0.3,
            transform: sortConfig.field === field && sortConfig.direction === 'desc' ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms ease, opacity 200ms ease'
          }}
        />
      </Group>
    </Table.Th>
  );

  return (
    <Container size="xl" py="md">
      <Stack gap="md">
        <Paper p="md" shadow="sm">
          <Group justify="space-between" mb="md">
            <Title order={2}>Клиенты</Title>
            <Button 
              leftSection={<IconPlus size="1rem" />}
              onClick={() => navigate('/clients/add')}
            >
              Добавить клиента
            </Button>
          </Group>

          <TextInput
            placeholder="Поиск по имени, ID, телефону или email"
            leftSection={<IconSearch size="1rem" />}
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            mb="md"
          />
        </Paper>

        <Paper p="md" shadow="sm" pos="relative">
          <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <SortableHeader field="id">ID</SortableHeader>
                <SortableHeader field="fullName">ФИО</SortableHeader>
                <Table.Th>Телефон</Table.Th>
                <Table.Th>Email</Table.Th>
                <SortableHeader field="role">Статус</SortableHeader>
                <SortableHeader field="registrationDate">Регистрация</SortableHeader>
                <Table.Th>Действия</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedClients.map(client => (
                <Table.Tr key={client.id}>
                  <Table.Td>{client.userId}</Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <IconUser size="1rem" />
                      {client.fullName}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <IconPhone size="1rem" />
                      {client.phone}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <IconMail size="1rem" />
                      {client.email}
                    </Group>
                  </Table.Td>
                  <Table.Td>{getRoleBadge(client.role)}</Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <IconCalendar size="1rem" />
                      {client.registrationDate}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleView(client)}
                        title="Просмотреть"
                      >
                        <IconEye size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="yellow"
                        onClick={() => navigate(`/clients/edit/${client.id}`)}
                        title="Редактировать"
                      >
                        <IconEdit size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(client.id)}
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

          {filteredClients.length > 0 && (
            <Center mt="md">
              <Pagination
                total={Math.ceil(filteredClients.length / itemsPerPage)}
                value={activePage}
                onChange={setActivePage}
              />
            </Center>
          )}
        </Paper>
      </Stack>

      {/* Модальное окно просмотра клиента */}
      <Modal 
        opened={opened} 
        onClose={close} 
        title={`Клиент: ${selectedClient?.fullName}`}
        size="lg"
      >
        {selectedClient && (
          <Stack gap="md">
            <Group>
              <Text fw={500}>ID:</Text>
              <Text>{selectedClient.userId}</Text>
            </Group>
            <Group>
              <Text fw={500}>Телефон:</Text>
              <Text>{selectedClient.phone}</Text>
            </Group>
            <Group>
              <Text fw={500}>Email:</Text>
              <Text>{selectedClient.email}</Text>
            </Group>
            <Group>
              <Text fw={500}>Дата рождения:</Text>
              <Text>{selectedClient.birthDate}</Text>
            </Group>
            <Group>
              <Text fw={500}>Дата регистрации:</Text>
              <Text>{selectedClient.registrationDate}</Text>
            </Group>
            <Group>
              <Text fw={500}>Статус:</Text>
              {getRoleBadge(selectedClient.role)}
            </Group>
            {selectedClient.address && (
              <Group align="flex-start">
                <Text fw={500}>Адрес:</Text>
                <Text>{selectedClient.address}</Text>
              </Group>
            )}
            {selectedClient.notes && (
              <Group align="flex-start">
                <Text fw={500}>Примечания:</Text>
                <Textarea
                  value={selectedClient.notes}
                  autosize
                  minRows={2}
                  readOnly
                  style={{ flex: 1 }}
                />
              </Group>
            )}
          </Stack>
        )}
      </Modal>
    </Container>
  );
};

export default ClientsPage;