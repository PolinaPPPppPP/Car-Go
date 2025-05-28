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
  Avatar,
  Box,
  rem,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { 
  IconPlus, 
  IconArrowsSort, 
  IconEye,
  IconEdit,
  IconTrash,
  IconSearch,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface FurCoat {
  id: string;
  name: string;
  category: string;
  price: string;
  material: string;
  color: string;
  size: string;
  status: 'В наличии' | 'Под заказ' | 'Продана';
  photoUrl: string;
}

const mockFurCoats: FurCoat[] = [
  {
    id: 'FUR-2024-125',
    name: 'Норковая шуба "Зимняя сказка"',
    category: 'Шубы',
    price: '125 000',
    material: 'Натуральный мех норки',
    color: 'Шоколадный',
    size: '42-44',
    status: 'В наличии',
    photoUrl: 'https://example.com/fur-coat-photo.jpg'
  },
  {
    id: 'FUR-2024-126',
    name: 'Лисичья шуба "Русская зима"',
    category: 'Шубы',
    price: '98 000',
    material: 'Натуральный мех лисицы',
    color: 'Рыжий',
    size: '46-48',
    status: 'В наличии',
    photoUrl: 'https://example.com/fur-coat-photo2.jpg'
  }
];

type SortField = 'id' | 'name' | 'price' | 'status';

const FurCoatsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [furCoatsData, setFurCoatsData] = useState<FurCoat[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    direction: 'asc' | 'desc';
  }>({ field: 'id', direction: 'asc' });
  const [selectedFurCoat, setSelectedFurCoat] = useState<FurCoat | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  
  const itemsPerPage = 10;

  const loadDataFromDB = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setFurCoatsData(mockFurCoats);
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

  const sortedFurCoats = [...furCoatsData].sort((a, b) => {
    if (sortConfig.field === 'id') {
      return sortConfig.direction === 'asc' 
        ? a.id.localeCompare(b.id) 
        : b.id.localeCompare(a.id);
    } else if (sortConfig.field === 'name') {
      return sortConfig.direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortConfig.field === 'price') {
      const priceA = parseInt(a.price.replace(/\s/g, ''));
      const priceB = parseInt(b.price.replace(/\s/g, ''));
      return sortConfig.direction === 'asc' ? priceA - priceB : priceB - priceA;
    } else {
      return sortConfig.direction === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
  });

  const filteredFurCoats = sortedFurCoats.filter(furCoat =>
    furCoat.name.toLowerCase().includes(search.toLowerCase()) ||
    furCoat.id.includes(search) ||
    furCoat.material.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedFurCoats = filteredFurCoats.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      'В наличии': 'green',
      'Под заказ': 'blue',
      'Продана': 'gray'
    };
    return <Badge color={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const handleDelete = (id: string) => {
    setFurCoatsData(furCoatsData.filter(furCoat => furCoat.id !== id));
  };

  const handleView = (furCoat: FurCoat) => {
    setSelectedFurCoat(furCoat);
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
            <Title order={2}>Шубы</Title>
            <Button 
              leftSection={<IconPlus size="1rem" />}
              onClick={() => navigate('/fur-coats/add')}
            >
              Добавить шубу
            </Button>
          </Group>

          <TextInput
            placeholder="Поиск по названию, ID или материалу"
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
                <Table.Th>Фото</Table.Th>
                <SortableHeader field="name">Название</SortableHeader>
                <Table.Th>Материал</Table.Th>
                <Table.Th>Цвет</Table.Th>
                <Table.Th>Размер</Table.Th>
                <SortableHeader field="price">Цена</SortableHeader>
                <SortableHeader field="status">Статус</SortableHeader>
                <Table.Th>Действия</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedFurCoats.map(furCoat => (
                <Table.Tr key={furCoat.id}>
                  <Table.Td>{furCoat.id}</Table.Td>
                  <Table.Td>
                    <Avatar 
                      src={furCoat.photoUrl}
                      size={40}
                      radius="sm"
                      alt={`Фото `}
                    />
                  </Table.Td>
                  <Table.Td>{furCoat.name}</Table.Td>
                  <Table.Td>{furCoat.material}</Table.Td>
                  <Table.Td>{furCoat.color}</Table.Td>
                  <Table.Td>{furCoat.size}</Table.Td>
                  <Table.Td>{furCoat.price} руб.</Table.Td>
                  <Table.Td>{getStatusBadge(furCoat.status)}</Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleView(furCoat)}
                        title="Просмотреть"
                      >
                        <IconEye size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="yellow"
                        onClick={() => navigate(`/fur-coats/edit/${furCoat.id}`)}
                        title="Редактировать"
                      >
                        <IconEdit size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(furCoat.id)}
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

          {filteredFurCoats.length > 0 && (
            <Center mt="md">
              <Pagination
                total={Math.ceil(filteredFurCoats.length / itemsPerPage)}
                value={activePage}
                onChange={setActivePage}
              />
            </Center>
          )}
        </Paper>
      </Stack>

      {/* Модальное окно просмотра шубы */}
      <Modal 
        opened={opened} 
        onClose={close} 
        title={`Шуба: ${selectedFurCoat?.name}`}
        size="md"
      >
        {selectedFurCoat && (
          <Stack gap="sm">
            <Group>
              <Text fw={500}>ID:</Text>
              <Text>{selectedFurCoat.id}</Text>
            </Group>
            <Group>
              <Text fw={500}>Цена:</Text>
              <Text>{selectedFurCoat.price} руб.</Text>
            </Group>
            <Group>
              <Text fw={500}>Материал:</Text>
              <Text>{selectedFurCoat.material}</Text>
            </Group>
            <Group>
              <Text fw={500}>Цвет:</Text>
              <Text>{selectedFurCoat.color}</Text>
            </Group>
            <Group>
              <Text fw={500}>Размер:</Text>
              <Text>{selectedFurCoat.size}</Text>
            </Group>
            <Group>
              <Text fw={500}>Статус:</Text>
              {getStatusBadge(selectedFurCoat.status)}
            </Group>
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar 
                src={selectedFurCoat.photoUrl}
                size={150}
                radius="md"
                alt={`Фото ${selectedFurCoat.name}`}
              />
            </Box>
          </Stack>
        )}
      </Modal>
    </Container>
  );
};

export default FurCoatsPage;