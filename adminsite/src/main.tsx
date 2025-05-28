import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import { AppLayout } from "./components/AppLayout.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { DashboardPage } from "./pages/Dashboard.tsx";
import { ClientAddPage } from "./pages/client/AddClient.tsx";
import { AddFurCoatPage } from './pages/fur-coats/AddFurCoat.tsx';
import FurCoatProfile from "./pages/fur-coats/Fur-coats.tsx";
import ClientsPage from "./pages/client/Client.tsx";
import EmployeesPage from "./pages/Employees/EmployeesPage.tsx";
import AddEmployee from "./pages/Employees/AddEmployeePage.tsx";
import FurCoatsPage from "./pages/fur-coats/FurCoatsPage.tsx";
import ClientProfilePage from "./pages/client/ProfileClient.tsx";
import EmployeeProfilePage from "./pages/Employees/EmployeeProfilePage.tsx";
import ReviewsManagement from "./pages/Reviews/ReviewsManagement.tsx";
import EditFurCoatPage from "./pages/fur-coats/EditFurCoat.tsx";
import EditClientPage from "./pages/client/EditClient.tsx";
import EditEmployeePage from "./pages/Employees/EditEmployeePage.tsx";
import OrdersManagementPage from "./pages/orders/OrdersManagementPage.tsx";
import AddOrderPage from "./pages/orders/AddOrderPage.tsx";
import OrderProfilePage from "./pages/orders/OrderProfilePage.tsx";
import EditOrderPage from "./pages/orders/EditOrderPage.tsx";
import CategoriesManagementPage from "./pages/categories/Categories.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, 
  },
  {
    element: (
        <AppLayout />
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
        handle: { crumb: "Дашборд" }
      },
      {
        path: "feedback",
        element: <ReviewsManagement />,
        handle: { crumb: "Обратная связь" }
      },
      {
        path: "clients",
        handle: { crumb: "Клиенты" },
        children: [
          { index: true, element: <ClientsPage /> },
          { 
            path: "add", 
            element: <ClientAddPage />,
            handle: { crumb: "Добавить клиента" }
          },
          { 
            path: ":id", 
            element: <ClientProfilePage />,
            handle: { crumb: "Профиль клиента" }
          },
          { 
            path: "edit/:id", 
            element: <EditClientPage />,
            handle: { crumb: "Редактировать профиль клиента" }
          }
        ]
      },
      {
        path: "fur-coats",
        handle: { crumb: "Шубы" },
        children: [
          { index: true, element: <FurCoatsPage /> },
          { 
            path: "add", 
            element: <AddFurCoatPage />,
            handle: { crumb: "Добавить шубу" }
          },
          { 
            path: ":id", 
            element: <FurCoatProfile />,
            handle: { crumb: "Карточка шубы" }
          },
          { 
            path: "edit/:id", 
            element: <EditFurCoatPage />,
            handle: { crumb: "Редактировать шубу" }
          }
        ]
      },
      {
        path: "employees",
        handle: { crumb: "Сотрудники" },
        children: [
          { index: true, element: <EmployeesPage /> },
          { 
            path: "add", 
            element: <AddEmployee />,
            handle: { crumb: "Добавить сотрудника" }
          },
          { 
            path: ":id", 
            element: <EmployeeProfilePage />,
            handle: { crumb: "Профиль сотрудника" }
          },
          { 
            path: "edit/:id", 
            element: <EditEmployeePage />,
            handle: { crumb: "Редактировать профиль сотрудника" }
          }
        ]
      },
      {
        path: "orders",
        handle: { crumb: "Заказы" },
        children: [
          { 
            index: true, 
            element: <OrdersManagementPage />,
            handle: { crumb: "Управление заказами" }
          },
          { 
            path: "add", 
            element: <AddOrderPage />,
            handle: { crumb: "Создать заказ" }
          },
          { 
            path: ":id", 
            element: <OrderProfilePage />,
            handle: { crumb: "Карточка заказа" }
          },
          { 
            path: "edit/:id", 
            element: <EditOrderPage />,
            handle: { crumb: "Редактировать заказ" }
          }
        ]
      },
      {
            path: "employees",
            handle: { crumb: "Сотрудники" },
            children: [
              { index: true, element: <EmployeesPage /> },
              { 
                path: "add", 
                element: <EmployeesPage />,
                handle: { crumb: "Добавить сотрудника" }
              },
              { 
                path: ":id", 
                element: <EmployeeProfilePage />,
                handle: { crumb: "Профиль сотрудника" }
              },
              { 
                path: "edit/:id", 
                element: <EditEmployeePage />,
                handle: { crumb: "Редактировать сотрудника" }
              }
            ]
        },
        {
        path: "categories",
        handle: { crumb: "Категории" },
        children: [
          { 
            index: true, 
            element: <CategoriesManagementPage />,
            handle: { crumb: "Управление категориями" }
          }
        ]
      }
    ]
  },
  { 
    path: "*", 
    element: <div>404 Not Found</div>,
    handle: { crumb: "Страница не найдена" }
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme}>
    <RouterProvider router={router} />
  </MantineProvider>
);