import { 
  Title, 
  Button, 
  Group, 
  Stack, 
  Container,
  Paper,
  TextInput,
  Textarea,
  SimpleGrid,
  Divider,
  Badge,
  Select
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates'; // Добавляем импорт
import { IconEdit, IconCalendar, IconUser, IconMail, IconPhone, IconId } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditClientPage() {
  const navigate = useNavigate();
  
  const [clientData, setClientData] = useState({
    fullName: 'Смирнова Анна Сергеевна',
    clientId: 'ID 937601',
    email: 'anna.smirnova@example.com',
    phone: '+7 (951) 083-34-38',
    birthDate: new Date(1989, 6, 16),
    registrationDate: new Date(2015, 3, 15),
    role: 'vip',
    comment: 'Постоянная клиентка с 2015 года. Предпочитает изделия из норки. Размер 48.'
  });

  const handleChange = (field: string, value: any) => {
    setClientData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Сохранение данных клиента:', clientData);
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };
  //@ts-ignore
  const getRoleBadge = (role: string) => {
    const colors = {
      'vip': 'violet',
      'regular': 'blue',
      'new': 'green'
    };
    const labels = {
      'vip': 'VIP клиент',
      'regular': 'Постоянный клиент',
      'new': 'Новый клиент'
    };
    return <Badge color={colors[role as keyof typeof colors]} size="lg">{labels[role as keyof typeof labels]}</Badge>;
  };

  return (
    <Container size="lg" py="md">
      <Stack gap="xl">
        <Title order={1} ta="center">
          Редактирование профиля клиента
        </Title>

        <Paper p="md" shadow="sm" radius="md">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            <TextInput
              label="ФИО"
              value={clientData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              leftSection={<IconUser size="1.2rem" />}
            />
            <TextInput
              label="ID клиента"
              value={clientData.clientId}
              leftSection={<IconId size="1.2rem" />}
              readOnly
              disabled
            />
            <TextInput
              label="Email"
              value={clientData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              leftSection={<IconMail size="1.2rem" />}
            />
            <TextInput
              label="Телефон"
              value={clientData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              leftSection={<IconPhone size="1.2rem" />}
            />
            <DatePickerInput
              label="Дата рождения"
              value={clientData.birthDate}
              onChange={(date) => handleChange('birthDate', date)}
              leftSection={<IconCalendar size="1.2rem" />}
              valueFormat="DD.MM.YYYY"
              placeholder="Выберите дату"
            />
            <DatePickerInput
              label="Дата регистрации"
              value={clientData.registrationDate}
              onChange={(date) => handleChange('registrationDate', date)}
              leftSection={<IconCalendar size="1.2rem" />}
              valueFormat="DD.MM.YYYY"
              placeholder="Выберите дату"
            />
            <Select
              label="Статус клиента"
              value={clientData.role}
              onChange={(value) => handleChange('role', value)}
              data={[
                { value: 'vip', label: 'VIP клиент' },
                { value: 'regular', label: 'Постоянный клиент' },
                { value: 'new', label: 'Новый клиент' },
              ]}
            />
          </SimpleGrid>
        </Paper>

        <Divider my="sm" />

        <Paper p="md" shadow="sm" radius="md">
          <Textarea
            label="Комментарии о клиенте"
            description="Предпочтения, размеры, особенности"
            value={clientData.comment}
            onChange={(e) => handleChange('comment', e.target.value)}
            minRows={3}
            autosize
          />
        </Paper>

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={handleCancel}>
            Отменить
          </Button>
          <Button 
            leftSection={<IconEdit size="1rem" />} 
            onClick={handleSave}
            color="blue"
          >
            Сохранить изменения
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}