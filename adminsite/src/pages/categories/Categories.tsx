import {
  Title,
  Table,
  Paper,
  Container,
  Stack,
  Group,
  Button,
  TextInput,
  Select,
  Pagination,
  ActionIcon,
  Modal,
  SimpleGrid
} from '@mantine/core';
import { IconEdit, IconTrash, IconPlus, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

export default function CategoriesManagementPage() {
  // Состояние для модального окна
  const [opened, setOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  
  // Состояние для пагинации
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Фильтры
  const [filters, setFilters] = useState({
    gender: '',
    color: '',
    season: '',
    composition: '',
    size: ''
  });

  // Пример данных категорий
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Шуба натуральная' },
    { id: 2, name: 'Дубленка' },
    { id: 3, name: 'Пальто' },
    { id: 4, name: 'Жакет' },
    { id: 5, name: 'Жилет' },
    // ... другие категории
  ]);

  // Форма для добавления/редактирования
  const [formValues, setFormValues] = useState({
    name: ''
  });

  // Обработчики для CRUD операций
  const handleAddCategory = () => {
    setEditMode(false);
    setCurrentCategory(null);
    setFormValues({ name: '' });
    setOpened(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditMode(true);
    setCurrentCategory(category);
    setFormValues({ name: category.name });
    setOpened(true);
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleSubmit = () => {
    if (editMode && currentCategory) {
      // Редактирование существующей категории
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id ? { ...cat, name: formValues.name } : cat
      ));
    } else {
      // Добавление новой категории
      const newId = Math.max(...categories.map(c => c.id), 0) + 1;
      setCategories([...categories, { id: newId, name: formValues.name }]);
    }
    setOpened(false);
  };

  // Фильтрация и пагинация
  const filteredCategories = categories.filter(category => {
    // Здесь можно добавить логику фильтрации по другим параметрам
    return category.name.toLowerCase().includes(filters.gender.toLowerCase());
  });

  const paginatedCategories = filteredCategories.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <Container size="xl" py="md">
      <Stack gap="xl">
        <Title order={1}>Управление категориями</Title>

        {/* Фильтры */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Фильтры</Title>
          <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="md">
            <Select
              label="Пол"
              placeholder="Выберите пол"
              data={['Мужской', 'Женский', 'Унисекс']}
              value={filters.gender}
              onChange={(value) => setFilters({ ...filters, gender: value || '' })}
            />
            <Select
              label="Цвет"
              placeholder="Выберите цвет"
              data={['Черный', 'Белый', 'Бежевый', 'Коричневый']}
              value={filters.color}
              onChange={(value) => setFilters({ ...filters, color: value || '' })}
            />
            <Select
              label="Сезон"
              placeholder="Выберите сезон"
              data={['Зима', 'Демисезон', 'Лето', 'Всесезонный']}
              value={filters.season}
              onChange={(value) => setFilters({ ...filters, season: value || '' })}
            />
            <Select
              label="Состав"
              placeholder="Выберите состав"
              data={['Натуральный мех', 'Искусственный мех', 'Комбинированный']}
              value={filters.composition}
              onChange={(value) => setFilters({ ...filters, composition: value || '' })}
            />
            <Select
              label="Размер"
              placeholder="Выберите размер"
              data={['XS', 'S', 'M', 'L', 'XL']}
              value={filters.size}
              onChange={(value) => setFilters({ ...filters, size: value || '' })}
            />
          </SimpleGrid>
        </Paper>

        {/* Таблица категорий */}
        <Paper p="md" shadow="sm" radius="md">
          <Group justify="space-between" mb="md">
            <Title order={3}>Категории</Title>
            <Button 
              leftSection={<IconPlus size="1rem" />}
              onClick={handleAddCategory}
            >
              Добавить категорию
            </Button>
          </Group>

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Категория</Table.Th>
                <Table.Th>Действия</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedCategories.map((category) => (
                <Table.Tr key={category.id}>
                  <Table.Td>{category.id}</Table.Td>
                  <Table.Td>{category.name}</Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleEditCategory(category)}
                        title="Редактировать"
                      >
                        <IconEdit size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleDeleteCategory(category.id)}
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

          {/* Пагинация */}
          <Group justify="space-between" mt="xl">
            <Select
              value={itemsPerPage.toString()}
              onChange={(value) => setItemsPerPage(Number(value))}
              data={[
                { value: '20', label: '20 / страница' },
                { value: '40', label: '40 / страница' },
                { value: '60', label: '60 / страница' },
              ]}
            />
            <Pagination
              total={Math.ceil(filteredCategories.length / itemsPerPage)}
              value={activePage}
              onChange={setActivePage}
              siblings={1}
              nextIcon={IconChevronRight}
              previousIcon={IconChevronLeft}
            />
          </Group>
        </Paper>
      </Stack>

      {/* Модальное окно для добавления/редактирования */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={editMode ? 'Редактировать категорию' : 'Добавить категорию'}
      >
        <Stack gap="md">
          <TextInput
            label="Название категории"
            placeholder="Введите название"
            value={formValues.name}
            onChange={(e) => setFormValues({ name: e.target.value })}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={() => setOpened(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>
              {editMode ? 'Сохранить' : 'Добавить'}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}