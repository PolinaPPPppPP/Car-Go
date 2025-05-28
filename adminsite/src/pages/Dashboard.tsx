import {
    Container,
    Title,
    Grid,
    Card,
    Text,
    Group,
    Button,
    Divider,
  } from '@mantine/core';
  import { Line } from 'react-chartjs-2';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Регистрируем необходимые компоненты Chart.js
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
  );
  
  export function DashboardPage() {
    // Пример данных (можете заменить своими)
    const dailyOrdersData = {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      datasets: [
        {
          label: 'График заказов в день',
          data: [12, 19, 3, 5, 2, 3, 7],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  
    const yearlyOrdersData = {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      datasets: [
        {
          label: 'График заказов за последний год',
          data: [30, 20, 50, 40, 60, 70, 80, 90, 100, 110, 120, 130],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  
    return (
      <Container>
        <Title order={2}>Главная</Title>
        <Grid>
          <Grid.Col span={3}>
            <Card>
              <Text>Количество автомобилей</Text>
              <Title order={3}>50</Title>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card>
              <Text>Свободные автомобили</Text>
              <Title order={3}>26</Title>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card>
              <Text>Забронированные автомобили</Text>
              <Title order={3}>20</Title>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card>
              <Text>В ремонте</Text>
              <Title order={3}>4</Title>
            </Card>
          </Grid.Col>
        </Grid>
  
        <Title order={3} mt="lg">График заказов в день</Title>
        <Line data={dailyOrdersData} />
  
        <Title order={3} mt="lg">График заказов за последний год</Title>
        <Line data={yearlyOrdersData} />
  
        <Divider my="lg" />
  
        <Title order={3}>Объявления</Title>
        <Card>
          <Text>Автор: Текст</Text>
        </Card>
        <Card mt="sm">
          <Text>Автор: Текст</Text>
        </Card>
        <Card mt="sm">
          <Text>Автор: Текст</Text>
        </Card>
  
        <Group>
          <Button variant="outline">Добавить заявку...</Button>
        </Group>
      </Container>
    );
  }