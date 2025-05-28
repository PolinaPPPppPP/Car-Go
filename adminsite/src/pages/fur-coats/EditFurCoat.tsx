import {
  Title,
  Button,
  Group,
  Stack,
  Container,
  Paper,
  TextInput,
  Select,
  FileInput,
  SimpleGrid,
  Badge,
  Modal,
  Avatar,
  ActionIcon,
  Textarea,
  Checkbox
} from '@mantine/core';
import { IconUpload, IconEdit, IconX, IconPhoto, IconRuler, IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';

interface FurCoatData {
  id: string;
  name: string;
  category: string;
  price: string;
  material: string;
  color: string;
  size: string;
  season: string;
  country: string;
  status: string;
  description: string;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  photoUrl: string;
  mainPhotoFile: File | null;
  additionalPhotosFiles: File[];
  sizeChartFile: File | null;
  certificateFile: File | null;
}

interface SelectOption {
  value: string;
  label: string;
}

const EditFurCoatPage = () => {
  // Данные шубы
  const [furCoatData, setFurCoatData] = useState<FurCoatData>({
    id: 'FUR-2024-125',
    name: 'Норковая шуба "Зимняя сказка"',
    category: 'Шубы',
    price: '125000',
    material: 'Натуральный мех норки',
    color: 'Шоколадный',
    size: '42-44',
    season: 'Зима',
    country: 'Италия',
    status: 'available',
    description: 'Элегантная норковая шуба премиум-класса. Длина до колена, прямой крой. Воротник-стойка. Внутренняя подкладка из натурального шелка.',
    isNewArrival: true,
    isBestSeller: false,
    isOnSale: false,
    photoUrl: 'https://example.com/fur-coat-photo.jpg',
    mainPhotoFile: null,
    additionalPhotosFiles: [],
    sizeChartFile: null,
    certificateFile: null,
  });

  const [openedPhoto, setOpenedPhoto] = useState(false);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  const statuses: SelectOption[] = [
    { value: 'available', label: 'В наличии' },
    { value: 'unavailable', label: 'Нет в наличии' },
    { value: 'reserved', label: 'Зарезервирована' },
  ];

  const categories: SelectOption[] = [
    'Шубы', 'Дубленки', 'Пальто', 'Жакеты'
  ].map(item => ({ value: item, label: item }));

  const materials: SelectOption[] = [
    'Натуральный мех', 'Искусственный мех', 'Комбинированный'
  ].map(item => ({ value: item, label: item }));

  const seasons: SelectOption[] = [
    'Зима', 'Демисезон', 'Всесезонный'
  ].map(item => ({ value: item, label: item }));

  const sizes: SelectOption[] = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', '42-44', '44-46', '46-48', '48-50', '50-52'
  ].map(item => ({ value: item, label: item }));

  const handleChange = (field: keyof FurCoatData, value: any) => {
    setFurCoatData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Сохранение данных шубы:', furCoatData);
    // Здесь будет логика сохранения данных
  };

  const handleReset = () => {
    console.log('Сброс изменений');
    // Здесь будет логика сброса изменений
  };

  const handleRemovePhoto = () => {
    setFurCoatData(prev => ({ ...prev, photoUrl: '', mainPhotoFile: null }));
  };

  const handleAdditionalPhotosChange = (files: File[]) => {
    handleChange('additionalPhotosFiles', files);
    const previews: string[] = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setAdditionalPreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'green';
      case 'reserved': return 'blue';
      default: return 'red';
    }
  };

  const currentStatus = statuses.find(s => s.value === furCoatData.status);

  return (
    <Container size="lg" py="md">
      {/* Модальное окно для просмотра фото */}
      <Modal
        opened={openedPhoto}
        onClose={() => setOpenedPhoto(false)}
        title={`Фото шубы ${furCoatData.name}`}
        size="xl"
      >
        <Group justify="center">
          <Avatar 
            src={furCoatData.photoUrl} 
            size="100%"
            maw="100%"
            mah="70vh"
            radius="md"
            alt={`Фото ${furCoatData.name}`}
          />
        </Group>
      </Modal>

      <Stack gap="xl">
        <Title order={1} ta="center">
          Редактирование шубы
        </Title>

        {/* Основная информация */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Основная информация</Title>
          
          <Group align="flex-start" wrap="nowrap" gap="xl">
            <Stack align="center">
              <Avatar 
                src={furCoatData.photoUrl || null}
                size={160}
                radius="md"
                alt={`Фото ${furCoatData.name}`}
                onClick={() => furCoatData.photoUrl && setOpenedPhoto(true)}
                style={{ cursor: furCoatData.photoUrl ? 'pointer' : 'default' }}
              />
              <Group>
                <FileInput
                  placeholder="Изменить фото"
                  accept="image/*"
                  value={furCoatData.mainPhotoFile}
                  onChange={(file) => handleChange('mainPhotoFile', file)}
                  leftSection={<IconUpload size="1rem" />}
                  variant="filled"
                  size="xs"
                />
                {furCoatData.photoUrl && (
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={handleRemovePhoto}
                    title="Удалить фото"
                  >
                    <IconX size="1rem" />
                  </ActionIcon>
                )}
              </Group>
            </Stack>

            <SimpleGrid cols={2} style={{ flexGrow: 1 }}>
              <TextInput
                label="Название модели"
                value={furCoatData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
              <Select
                label="Категория"
                data={categories}
                value={furCoatData.category}
                onChange={(value) => handleChange('category', value)}
                required
              />
              <TextInput
                label="Цена (руб)"
                value={furCoatData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                required
                type="number"
              />
              <Select
                label="Материал"
                data={materials}
                value={furCoatData.material}
                onChange={(value) => handleChange('material', value)}
                required
              />
              <TextInput
                label="Цвет"
                value={furCoatData.color}
                onChange={(e) => handleChange('color', e.target.value)}
                required
              />
              <Select
                label="Размер"
                data={sizes}
                value={furCoatData.size}
                onChange={(value) => handleChange('size', value)}
                leftSection={<IconRuler size="1rem" />}
              />
              <Select
                label="Сезон"
                data={seasons}
                value={furCoatData.season}
                onChange={(value) => handleChange('season', value)}
                leftSection={<IconCalendar size="1rem" />}
              />
              <TextInput
                label="Страна производства"
                value={furCoatData.country}
                onChange={(e) => handleChange('country', e.target.value)}
              />
              <Select
                label="Статус"
                data={statuses}
                value={furCoatData.status}
                onChange={(value) => handleChange('status', value)}
                leftSection={
                  currentStatus && (
                    <Badge 
                      color={getStatusColor(furCoatData.status)}
                      variant="light"
                      size="sm"
                    >
                      {currentStatus.label}
                    </Badge>
                  )
                }
                leftSectionWidth={90}
              />
            </SimpleGrid>
          </Group>

          <Group mt="md">
            <Checkbox
              label="Новинка"
              checked={furCoatData.isNewArrival}
              onChange={(e) => handleChange('isNewArrival', e.target.checked)}
            />
            <Checkbox
              label="Хит продаж"
              checked={furCoatData.isBestSeller}
              onChange={(e) => handleChange('isBestSeller', e.target.checked)}
            />
            <Checkbox
              label="Распродажа"
              checked={furCoatData.isOnSale}
              onChange={(e) => handleChange('isOnSale', e.target.checked)}
            />
          </Group>
        </Paper>

        {/* Фотографии */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Фотографии</Title>
          
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <div>
              <FileInput
                label="Главное фото"
                placeholder="Выберите файл"
                accept="image/*"
                value={furCoatData.mainPhotoFile}
                onChange={(file) => handleChange('mainPhotoFile', file)}
                leftSection={<IconPhoto size="1rem" />}
                clearable
              />
            </div>
            
            <div>
              <FileInput
                label="Дополнительные фото"
                placeholder="Выберите файлы"
                accept="image/*"
                multiple
                value={furCoatData.additionalPhotosFiles}
                onChange={handleAdditionalPhotosChange}
                leftSection={<IconPhoto size="1rem" />}
                clearable
              />
              <Group mt="sm" gap="sm">
                {additionalPreviews.map((preview, index) => (
                  <Avatar
                    key={index}
                    src={preview}
                    size={80}
                    radius="sm"
                    alt={`Дополнительное фото ${index + 1}`}
                  />
                ))}
              </Group>
            </div>
          </SimpleGrid>
        </Paper>

        {/* Документы */}
        <Paper p="md" shadow="sm" radius="md">
          <Title order={3} mb="md">Документы</Title>
          
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <FileInput
              label="Таблица размеров"
              placeholder="Загрузить файл"
              accept=".pdf,.jpg,.jpeg,.png"
              value={furCoatData.sizeChartFile}
              onChange={(file) => handleChange('sizeChartFile', file)}
              leftSection={<IconUpload size="1rem" />}
            />
            <FileInput
              label="Сертификат качества"
              placeholder="Загрузить файл"
              accept=".pdf,.jpg,.jpeg,.png"
              value={furCoatData.certificateFile}
              onChange={(file) => handleChange('certificateFile', file)}
              leftSection={<IconUpload size="1rem" />}
            />
          </SimpleGrid>
        </Paper>

        {/* Описание */}
        <Paper p="md" shadow="sm" radius="md">
          <Textarea
            label="Описание"
            value={furCoatData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            autosize
            minRows={3}
          />
        </Paper>

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={handleReset}>
            Отменить
          </Button>
          <Button onClick={handleSave} leftSection={<IconEdit size="1rem" />}>
            Сохранить изменения
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default EditFurCoatPage;