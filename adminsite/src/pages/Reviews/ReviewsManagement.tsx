import { useState } from 'react';
import { 
  TextInput, 
  Textarea, 
  Button, 
  Group, 
  Paper, 
  Text, 
  Stack, 
  Select,
  Rating,
  Modal,
  ActionIcon,
  Table,
  Pagination,
  Title,
  Divider,
  Badge
} from '@mantine/core';
import { IconTrash, IconMailUp, IconEye, IconCheck, IconX } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';

interface Review {
  id: number;
  username: string;
  text: string;
  rating: number;
  status: 'pending' | 'published' | 'rejected';
  date: Date;
  reply?: string;
}

interface ReviewReply {
  id: number;
  reviewId: number;
  username: string;
  text: string;
  date: Date;
}

export default function ReviewsManagement() {
  // Состояние для отзывов
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      username: 'Иван Иванов',
      text: 'Отличная шуба, очень теплая!',
      rating: 5,
      status: 'published',
      date: new Date('2023-10-15'),
      reply: 'Спасибо за ваш отзыв! Рады, что вам понравилось.'
    },
    {
      id: 2,
      username: 'Мария Петрова',
      text: 'Разочарована качеством шва',
      rating: 2,
      status: 'pending',
      date: new Date('2023-11-20')
    }
  ]);

  // Состояние для ответов
  const [replies, setReplies] = useState<ReviewReply[]>([]);
  const [activeReview, setActiveReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyUsername, setReplyUsername] = useState('Администратор');
  
  // Фильтры
  const [filters, setFilters] = useState({
    status: '',
    rating: '',
    dateFrom: null as Date | null,
    dateTo: null as Date | null
  });

  // Пагинация
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Модальные окна
  const [replyModalOpened, { open: openReplyModal, close: closeReplyModal }] = useDisclosure(false);
  const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  // Обработчики для ответов
  const handleReplySubmit = () => {
    if (!activeReview) return;

    const newReply: ReviewReply = {
      id: replies.length + 1,
      reviewId: activeReview.id,
      username: replyUsername,
      text: replyText,
      date: new Date()
    };

    // Обновляем отзыв с ответом
    setReviews(reviews.map(review => 
      review.id === activeReview.id 
        ? { ...review, reply: replyText, status: 'published' } 
        : review
    ));

    // Добавляем ответ в историю
    setReplies([...replies, newReply]);

    // Сброс формы
    setReplyText('');
    closeReplyModal();
  };

  // Обработчики для статусов
  const handlePublish = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'published' } : review
    ));
  };

  const handleReject = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: 'rejected' } : review
    ));
  };

  const handleDelete = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  // Фильтрация и пагинация
  const filteredReviews = reviews.filter(review => {
    if (filters.status && review.status !== filters.status) return false;
    if (filters.rating && review.rating !== Number(filters.rating)) return false;
    if (filters.dateFrom && review.date < filters.dateFrom) return false;
    if (filters.dateTo && review.date > filters.dateTo) return false;
    return true;
  });

  const paginatedReviews = filteredReviews.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  // Функция для отображения статуса
  const renderStatus = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge color="green">Опубликован</Badge>;
      case 'pending':
        return <Badge color="yellow">На модерации</Badge>;
      case 'rejected':
        return <Badge color="red">Отклонен</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Stack gap="xl">
      <Title order={2}>Управление отзывами</Title>

      {/* Фильтры */}
      <Paper p="md" shadow="sm">
        <Title order={4} mb="md">Фильтры</Title>
        <Group gap="md">
          <DatePickerInput
            label="Дата от"
            placeholder="Выберите дату"
            value={filters.dateFrom}
            onChange={(date) => setFilters({ ...filters, dateFrom: date })}
          />
          <DatePickerInput
            label="Дата до"
            placeholder="Выберите дату"
            value={filters.dateTo}
            onChange={(date) => setFilters({ ...filters, dateTo: date })}
          />
          <Select
            label="Статус"
            placeholder="Все статусы"
            data={[
              { value: '', label: 'Все' },
              { value: 'pending', label: 'На модерации' },
              { value: 'published', label: 'Опубликован' },
              { value: 'rejected', label: 'Отклонен' }
            ]}
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value || '' })}
          />
          <Select
            label="Рейтинг"
            placeholder="Любой рейтинг"
            data={[
              { value: '', label: 'Любой' },
              { value: '1', label: '⭐' },
              { value: '2', label: '⭐⭐' },
              { value: '3', label: '⭐⭐⭐' },
              { value: '4', label: '⭐⭐⭐⭐' },
              { value: '5', label: '⭐⭐⭐⭐⭐' }
            ]}
            value={filters.rating}
            onChange={(value) => setFilters({ ...filters, rating: value || '' })}
          />
        </Group>
      </Paper>

      {/* Таблица отзывов */}
      <Paper p="md" shadow="sm">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Пользователь</Table.Th>
              <Table.Th>Текст</Table.Th>
              <Table.Th>Рейтинг</Table.Th>
              <Table.Th>Статус</Table.Th>
              <Table.Th>Дата</Table.Th>
              <Table.Th>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedReviews.map((review) => (
              <Table.Tr key={review.id}>
                <Table.Td>{review.id}</Table.Td>
                <Table.Td>{review.username}</Table.Td>
                <Table.Td>
                  <Text lineClamp={1}>{review.text}</Text>
                </Table.Td>
                <Table.Td>
                  <Rating value={review.rating} count={5} readOnly />
                </Table.Td>
                <Table.Td>{renderStatus(review.status)}</Table.Td>
                <Table.Td>{review.date.toLocaleDateString()}</Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      onClick={() => {
                        setActiveReview(review);
                        openViewModal();
                      }}
                      title="Просмотреть"
                    >
                      <IconEye size="1rem" />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="green"
                      onClick={() => {
                        setActiveReview(review);
                        openReplyModal();
                      }}
                      title="Ответить"
                    >
                      <IconMailUp size="1rem" />
                    </ActionIcon>
                    {review.status !== 'published' && (
                      <ActionIcon
                        variant="subtle"
                        color="green"
                        onClick={() => handlePublish(review.id)}
                        title="Опубликовать"
                      >
                        <IconCheck size="1rem" />
                      </ActionIcon>
                    )}
                    {review.status !== 'rejected' && (
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => handleReject(review.id)}
                        title="Отклонить"
                      >
                        <IconX size="1rem" />
                      </ActionIcon>
                    )}
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => handleDelete(review.id)}
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
            total={Math.ceil(filteredReviews.length / itemsPerPage)}
            value={activePage}
            onChange={setActivePage}
          />
        </Group>
      </Paper>

      {/* Модальное окно просмотра отзыва */}
      <Modal
        opened={viewModalOpened}
        onClose={closeViewModal}
        title={`Отзыв #${activeReview?.id}`}
        size="lg"
      >
        {activeReview && (
          <Stack gap="md">
            <Text><strong>Пользователь:</strong> {activeReview.username}</Text>
            <Text><strong>Дата:</strong> {activeReview.date.toLocaleDateString()}</Text>
            <Text><strong>Рейтинг:</strong> <Rating value={activeReview.rating} count={5} readOnly /></Text>
            <Text><strong>Статус:</strong> {renderStatus(activeReview.status)}</Text>
            <Divider />
            <Text><strong>Текст отзыва:</strong></Text>
            <Text>{activeReview.text}</Text>
            {activeReview.reply && (
              <>
                <Divider />
                <Text><strong>Ответ:</strong></Text>
                <Text>{activeReview.reply}</Text>
              </>
            )}
          </Stack>
        )}
      </Modal>

      {/* Модальное окно ответа на отзыв */}
      <Modal
        opened={replyModalOpened}
        onClose={closeReplyModal}
        title={`Ответ на отзыв #${activeReview?.id}`}
        size="md"
      >
        {activeReview && (
          <Stack gap="md">
            <Text><strong>Пользователь:</strong> {activeReview.username}</Text>
            <Text><strong>Рейтинг:</strong> <Rating value={activeReview.rating} count={5} readOnly /></Text>
            <Text><strong>Дата:</strong> {activeReview.date.toLocaleDateString()}</Text>
            <Divider />
            <Text><strong>Текст отзыва:</strong></Text>
            <Text mb="sm">{activeReview.text}</Text>
            
            <TextInput
              label="Имя отвечающего"
              value={replyUsername}
              onChange={(e) => setReplyUsername(e.target.value)}
            />
            <Textarea
              label="Ответ на отзыв"
              placeholder="Введите ваш ответ..."
              autosize
              minRows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            
            <Group justify="flex-end" mt="md">
              <Button variant="outline" onClick={closeReplyModal}>
                Отмена
              </Button>
              <Button onClick={handleReplySubmit}>
                Отправить ответ
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
}