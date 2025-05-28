import {
  TextInput,
  Button,
  Stack,
  Title,
  FileInput,
  Group,
  Container,
  SimpleGrid,
  Select,
  Textarea,
  Checkbox,
  Paper,
  Image,
  rem
} from '@mantine/core';
import { IconUpload, IconPhoto, IconRuler, IconCalendar, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export const AddFurCoatPage = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    category: '',
    price: '',
    material: '',
    color: '',
    size: '',
    season: '',
    country: '',
    description: '',
    isNewArrival: false,
    isBestSeller: false,
    isOnSale: false,
    mainPhoto: null as File | null,
    additionalPhotos: [] as File[],
    sizeChart: null as File | null,
    certificate: null as File | null,
  });

  const [mainPhotoPreview, setMainPhotoPreview] = useState('');
  const [additionalPhotosPreviews, setAdditionalPhotosPreviews] = useState<string[]>([]);

  const handleChange = (field: string, value: any) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      handleChange('price', value);
    }
  };

  const handleMainPhotoChange = (file: File | null) => {
    handleChange('mainPhoto', file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setMainPhotoPreview('');
    }
  };

  const handleAdditionalPhotosChange = (files: File[]) => {
    handleChange('additionalPhotos', files);
    const previews: string[] = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setAdditionalPhotosPreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
    if (files.length === 0) {
      setAdditionalPhotosPreviews([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);
    // Здесь будет отправка данных
  };

  const resetForm = () => {
    setFormValues({
      name: '',
      category: '',
      price: '',
      material: '',
      color: '',
      size: '',
      season: '',
      country: '',
      description: '',
      isNewArrival: false,
      isBestSeller: false,
      isOnSale: false,
      mainPhoto: null,
      additionalPhotos: [],
      sizeChart: null,
      certificate: null,
    });
    setMainPhotoPreview('');
    setAdditionalPhotosPreviews([]);
  };

  const furCategories = [
    'Шубы',
    'Дубленки',
    'Пальто',
    'Жакеты'
  ];

  const materials = [
    'Натуральный мех',
    'Искусственный мех',
    'Комбинированный'
  ];

  const seasons = [
    'Зима',
    'Демисезон',
    'Всесезонный'
  ];

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">Добавить новую шубу</Title>
      
      <form onSubmit={handleSubmit}>
        <Stack gap="xl">
          <Paper withBorder p="md" radius="md">
            <Title order={4} mb="md">Основная информация</Title>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              <TextInput 
                label="Название модели"
                value={formValues.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
              
              <Select
                label="Категория"
                data={furCategories}
                value={formValues.category}
                onChange={(value) => handleChange('category', value)}
                required
              />
              
              <TextInput
                label="Цена (руб)"
                value={formValues.price}
                onChange={handlePriceChange}
                placeholder="Введите цену"
                required
              />
              
              <Select
                label="Материал"
                data={materials}
                value={formValues.material}
                onChange={(value) => handleChange('material', value)}
                required
              />
              
              <TextInput
                label="Цвет"
                value={formValues.color}
                onChange={(e) => handleChange('color', e.target.value)}
                required
              />
              
              <TextInput
                label="Размер"
                value={formValues.size}
                onChange={(e) => handleChange('size', e.target.value)}
                leftSection={<IconRuler size={18} />}
              />
              
              <Select
                label="Сезон"
                data={seasons}
                value={formValues.season}
                onChange={(value) => handleChange('season', value)}
                leftSection={<IconCalendar size={18} />}
              />
              
              <TextInput
                label="Страна производства"
                value={formValues.country}
                onChange={(e) => handleChange('country', e.target.value)}
              />
            </SimpleGrid>
            
            <Textarea
              label="Описание"
              value={formValues.description}
              onChange={(e) => handleChange('description', e.target.value)}
              mt="md"
              autosize
              minRows={3}
            />
            
            <Group mt="md">
              <Checkbox
                label="Новинка"
                checked={formValues.isNewArrival}
                onChange={(e) => handleChange('isNewArrival', e.target.checked)}
              />
              <Checkbox
                label="Хит продаж"
                checked={formValues.isBestSeller}
                onChange={(e) => handleChange('isBestSeller', e.target.checked)}
              />
              <Checkbox
                label="Распродажа"
                checked={formValues.isOnSale}
                onChange={(e) => handleChange('isOnSale', e.target.checked)}
              />
            </Group>
          </Paper>

          <Paper withBorder p="md" radius="md">
            <Title order={4} mb="md">Фотографии</Title>
            
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <div>
                <FileInput 
                  label="Главное фото"
                  description="Основное изображение для каталога"
                  accept="image/*"
                  value={formValues.mainPhoto}
                  onChange={handleMainPhotoChange}
                  leftSection={<IconPhoto size={18} />}
                  clearable
                  required
                />
                {mainPhotoPreview && (
                  <Image 
                    src={mainPhotoPreview} 
                    mt="sm" 
                    radius="sm"
                    height={160}
                    fit="contain"
                    alt="Предпросмотр главного фото"
                  />
                )}
              </div>
              
              <div>
                <FileInput 
                  label="Дополнительные фото"
                  description="До 5 дополнительных изображений"
                  accept="image/*"
                  multiple
                  value={formValues.additionalPhotos}
                  onChange={handleAdditionalPhotosChange}
                  leftSection={<IconPhoto size={18} />}
                  clearable
                />
                <Group mt="sm" gap="sm">
                  {additionalPhotosPreviews.map((preview, index) => (
                    <Image
                      key={index}
                      src={preview}
                      radius="sm"
                      height={80}
                      width={80}
                      fit="cover"
                      alt={`Дополнительное фото ${index + 1}`}
                    />
                  ))}
                </Group>
              </div>
            </SimpleGrid>
          </Paper>

          <Paper withBorder p="md" radius="md">
            <Title order={4} mb="md">Документы</Title>
            
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <FileInput 
                label="Таблица размеров"
                description="PDF или изображение"
                accept=".pdf,.jpg,.jpeg,.png"
                value={formValues.sizeChart}
                onChange={(file) => handleChange('sizeChart', file)}
                leftSection={<IconUpload size={18} />}
                clearable
              />
              
              <FileInput 
                label="Сертификат качества"
                description="PDF или изображение"
                accept=".pdf,.jpg,.jpeg,.png"
                value={formValues.certificate}
                onChange={(file) => handleChange('certificate', file)}
                leftSection={<IconUpload size={18} />}
                clearable
              />
            </SimpleGrid>
          </Paper>

          <Group justify="flex-end" mt="md">
            <Button 
              variant="outline" 
              color="red" 
              leftSection={<IconTrash size={rem(18)} />}
              onClick={resetForm}
              type="button"
            >
              Очистить форму
            </Button>
            <Button 
              color="blue" 
              size="md"
              type="submit"
            >
              Сохранить шубу
            </Button>
          </Group>
        </Stack>
      </form>
    </Container>
  );
};

export default AddFurCoatPage;