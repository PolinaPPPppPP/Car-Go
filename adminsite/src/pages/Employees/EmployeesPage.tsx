import { useState } from 'react';
import {
  Title,
  Table,
  Paper,
  Container,
  Stack,
  Group,
  Button,
  TextInput,
  Pagination,
  ActionIcon,
  Text,
  Badge,
  Modal
} from '@mantine/core';
import { IconEdit, IconTrash, IconPlus, IconSearch, IconEye } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: number;
  fullName: string;
  position: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
}

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const itemsPerPage = 10;

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      fullName: 'Иванова Мария Петровна',
      position: 'Менеджер по продажам',
      phone: '+7 (912) 345-67-89',
      email: 'maria.ivanova@example.com',
      status: 'active'
    },
    {
      id: 2,
      fullName: 'Петров Иван Сергеевич',
      position: 'Администратор',
      phone: '+7 (923) 456-78-90',
      email: 'ivan.petrov@example.com',
      status: 'active'
    }
  ]);

  const filteredEmployees = employees.filter(employee =>
    employee.fullName.toLowerCase().includes(search.toLowerCase()) ||
    employee.position.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpened(true);
  };

  const handleEdit = (id: number) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <Container size="xl" py="md">
      <Stack gap="xl">
        <Title order={1}>Сотрудники</Title>

        <Group justify="space-between">
          <TextInput
            placeholder="Поиск по имени или должности"
            leftSection={<IconSearch size="1rem" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '400px' }}
          />
          <Button 
            leftSection={<IconPlus size="1rem" />}
            onClick={() => navigate('/employees/add')}
          >
            Добавить сотрудника
          </Button>
        </Group>

        <Paper p="md" shadow="sm" radius="md">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ФИО</Table.Th>
                <Table.Th>Должность</Table.Th>
                <Table.Th>Статус</Table.Th>
                <Table.Th>Действия</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedEmployees.map((employee) => (
                <Table.Tr key={employee.id}>
                  <Table.Td>{employee.fullName}</Table.Td>
                  <Table.Td>{employee.position}</Table.Td>
                  <Table.Td>
                    <Badge color={employee.status === 'active' ? 'green' : 'red'}>
                      {employee.status === 'active' ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={() => handleView(employee)}
                        title="Просмотреть"
                      >
                        <IconEye size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="yellow"
                        onClick={() => handleEdit(employee.id)}
                        title="Редактировать"
                      >
                        <IconEdit size="1rem" />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleDelete(employee.id)}
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

          <Pagination
            total={Math.ceil(filteredEmployees.length / itemsPerPage)}
            value={activePage}
            onChange={setActivePage}
            mt="xl"
          />
        </Paper>
      </Stack>

      {/* Модальное окно для просмотра */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Подробная информация о сотруднике"
        size="lg"
      >
        {selectedEmployee && (
          <Stack gap="md">
            <Text><strong>ФИО:</strong> {selectedEmployee.fullName}</Text>
            <Text><strong>Должность:</strong> {selectedEmployee.position}</Text>
            <Text><strong>Телефон:</strong> {selectedEmployee.phone}</Text>
            <Text><strong>Email:</strong> {selectedEmployee.email}</Text>
            <Text>
              <strong>Статус:</strong> 
              <Badge color={selectedEmployee.status === 'active' ? 'green' : 'red'} ml="sm">
                {selectedEmployee.status === 'active' ? 'Активен' : 'Неактивен'}
              </Badge>
            </Text>
            <Group justify="flex-end" mt="md">
              <Button 
                leftSection={<IconEdit size="1rem" />}
                onClick={() => {
                  setOpened(false);
                  handleEdit(selectedEmployee.id);
                }}
                color="blue"
              >
                Редактировать
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Container>
  );
}