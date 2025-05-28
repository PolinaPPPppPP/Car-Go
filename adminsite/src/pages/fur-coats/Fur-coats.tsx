import {
  Title,
  Text,
  Button,
  Group,
  Stack,
  Container,
  Paper,
  Box,
  ActionIcon,
  Modal,
  Avatar,
  Table,
  Anchor,
  Badge
} from '@mantine/core';
import { IconDownload, IconEdit, IconCertificate, IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FurCoatProfilePage = () => {
  const [openedPhoto, setOpenedPhoto] = useState(false);
  const navigate = useNavigate();
  
  // Данные шубы
  const furCoatData = {
    id: 'FUR-2024-125',
    name: 'Норковая шуба "Зимняя сказка"',
    category: 'Шубы',
    price: '125 000',
    material: 'Натуральный мех норки',
    color: 'Шоколадный',
    size: '42-44',
    season: 'Зима',
    country: 'Италия',
    status: 'В наличии',
    description: 'Элегантная норковая шуба премиум-класса. Длина до колена, прямой крой. Воротник-стойка. Внутренняя подкладка из натурального шелка.',
    photoUrl: 'https://example.com/fur-coat-photo.jpg',
    documents: [
      { 
        type: 'Сертификат подлинности', 
        icon: <IconCertificate size="1.2rem" />,
        number: 'CERT-1254879', 
        date: '15.10.2023',
        previewUrl: '/api/documents/certificate-preview.jpg',
        fileUrl: '/api/documents/certificate.pdf'
      },
      { 
        type: 'Гарантийный талон', 
        icon: <IconInfoCircle size="1.2rem" />,
        number: 'WARR-458712', 
        date: '15.10.2023',
        previewUrl: '/api/documents/warranty-preview.jpg',
        fileUrl: '/api/documents/warranty.pdf'
      }
    ],
    additionalPhotos: [
      'https://example.com/fur-coat-photo2.jpg',
      'https://example.com/fur-coat-photo3.jpg',
      'https://example.com/fur-coat-photo4.jpg'
    ]
  };

  const handleViewDoc = (docType: string) => {
    console.log(`Просмотр ${docType}`);
    // В реальном приложении здесь будет открытие модального окна с документом
  };

  const handleDownloadDoc = (docType: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Скачивание ${docType}`);
    // В реальном приложении здесь будет запрос к API для скачивания файла
  };

  const handleEditClick = () => {
    // Переход на страницу редактирования с передачей ID шубы
    navigate(`/fur-coats/edit`);
  };

  return (
    <Container size="lg" py="md">
      {/* Модальное окно для просмотра фото */}
      <Modal
        opened={openedPhoto}
        onClose={() => setOpenedPhoto(false)}
        title={`Фото шубы ${furCoatData.name}`}
        size="xl"
      >
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <img 
            src={furCoatData.photoUrl} 
            alt={`Фото ${furCoatData.name}`} 
            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
          />
        </Box>
      </Modal>

      <Stack gap="xl">
        <Title order={1} ta="center">
          Профиль шубы
        </Title>

        {/* Основная информация */}
        <Paper p="md" shadow="sm" radius="md">
          <Group align="flex-start" wrap="nowrap">
            <Avatar 
              src={furCoatData.photoUrl}
              size={120}
              radius="md"
              alt={`Фото ${furCoatData.name}`}
              onClick={() => setOpenedPhoto(true)}
              style={{ cursor: 'pointer' }}
            />
            <Stack gap="xs">
              <Text size="xl" fw={500}>
                {furCoatData.name}
              </Text>
              <Text size="md" c="dimmed">
                ID: {furCoatData.id}
              </Text>
              <Text size="md">
                Категория: {furCoatData.category}
              </Text>
              <Text size="md">
                Цена: {furCoatData.price} руб.
              </Text>
              <Text size="md">
                Материал: {furCoatData.material}
              </Text>
              <Text size="md">
                Цвет: {furCoatData.color}
              </Text>
              <Text size="md">
                Размер: {furCoatData.size}
              </Text>
              <Text size="md">
                Статус: <Badge color="green" variant="light">{furCoatData.status}</Badge>
              </Text>
            </Stack>
          </Group>

          {/* Дополнительные фото */}
          <Box mt="md">
            <Text size="sm" fw={500} mb="xs">Дополнительные фото:</Text>
            <Group gap="sm">
              {furCoatData.additionalPhotos.map((photo, index) => (
                <Avatar
                  key={index}
                  src={photo}
                  size={80}
                  radius="sm"
                  onClick={() => {
                    setOpenedPhoto(true);
                    // Здесь нужно обновить photoUrl для модального окна
                  }}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Group>
          </Box>
        </Paper>

        {/* Документы */}
        <Box>
          <Title order={2} mb="sm">
            Документы
          </Title>
          
          <Table striped
            highlightOnHover
            withColumnBorders
            horizontalSpacing="md"
            verticalSpacing="sm"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: '40px' }}></Table.Th>
                <Table.Th>Тип документа</Table.Th>
                <Table.Th>Номер</Table.Th>
                <Table.Th>Дата выдачи</Table.Th>
                <Table.Th style={{ width: '60px' }}></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {furCoatData.documents.map((doc, index) => (
                <Table.Tr key={index} style={{ cursor: 'pointer' }} onClick={() => handleViewDoc(doc.type)}>
                  <Table.Td>{doc.icon}</Table.Td>
                  <Table.Td>
                    <Anchor component="span" c="blue" underline="hover">
                      {doc.type}
                    </Anchor>
                  </Table.Td>
                  <Table.Td>{doc.number}</Table.Td>
                  <Table.Td>{doc.date}</Table.Td>
                  <Table.Td>
                    <ActionIcon 
                      variant="subtle" 
                      color="green"
                      onClick={(e) => handleDownloadDoc(doc.type, e)}
                      title="Скачать документ"
                    >
                      <IconDownload size="1rem" />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>

        {/* Описание */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Описание</Title>
          <Stack gap="xs">
            <Text>{furCoatData.description}</Text>
            <Text size="sm" c="dimmed">
              Сезон: {furCoatData.season}
            </Text>
            <Text size="sm" c="dimmed">
              Страна производства: {furCoatData.country}
            </Text>
          </Stack>
        </Paper>

        <Group justify="flex-end">
          <Button 
            leftSection={<IconEdit size="1rem" />}
            variant="outline"
            onClick={handleEditClick}
          >
            Редактировать
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default FurCoatProfilePage;