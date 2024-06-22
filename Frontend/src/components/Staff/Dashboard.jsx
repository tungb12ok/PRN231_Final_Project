// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  Card,
  Breadcrumbs,
  CardBody,
  Typography,
  Avatar,
  Checkbox,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faArrowUp,
  faCalendar,
  faBagShopping
} from "@fortawesome/free-solid-svg-icons";
import { fetchOrders } from "../../services/DashboardService";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [activeAmount, setActiveAmount] = useState(0);
  const [completedAmount, setCompletedAmount] = useState(0);
  const [activeLength, setActiveLength] = useState(0);
  const [completedLength, setCompletedLength] = useState(0);
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format(value) + ' VND';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
        console.log("ordersData", ordersData);

        // Calculate totals
        const totalOrdersCount = ordersData.length;
        const totalAmountSum = ordersData.reduce((acc, order) => acc + parseFloat(order.amount), 0);
        setTotalOrders(totalOrdersCount);
        setTotalAmount(totalAmountSum);
      } catch (error) {
        console.log(error);
        setOrders([]);
      }
    };

    fetchData();
  }, []);

  const onSelectChange = (selectedKey) => {
    setSelectedRowKeys((prevSelectedRowKeys) =>
      prevSelectedRowKeys.includes(selectedKey)
        ? prevSelectedRowKeys.filter((key) => key !== selectedKey)
        : [...prevSelectedRowKeys, selectedKey]
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold mx-10 mt-4">Dashboard</h2>
      <div className="flex justify-between items-center mx-10 my-4">
        <Breadcrumbs className="flex-grow">
          <a href="#" className="opacity-60">
            Home
          </a>
          <a href="#">Dashboard</a>
        </Breadcrumbs>
      </div>

      <div className="flex justify-around items-center space-x-4 mx-10">
        <Card className="shadow-md p-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-black">Total Orders <p className="text-lg">({totalOrders})</p></h3>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
          <div className="flex items-center justify-start mb-2">
          <FontAwesomeIcon icon={faBagShopping} className="text-orange-500 pr-2"/>
            <p className="text-xl font-bold">{formatPrice(totalAmount.toFixed(2))}</p>
          </div>
        </Card>
        <Card className="shadow-md p-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-black">Active Orders:</h3>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
          <div className="flex items-center justify-start mb-2">
          <div className="flex items-center justify-start mb-2">
          <FontAwesomeIcon icon={faBagShopping} className="text-orange-500 pr-2"/>
            <p className="text-xl font-bold"></p>
          </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-xl font-bold"></p>
            </div>
          </div>
        </Card>
        <Card className="shadow-md p-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-black">
              Completed Orders:
            </h3>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
          <div className="flex items-center justify-start mb-2">
          <div className="flex items-center justify-start mb-2">
          <FontAwesomeIcon icon={faBagShopping} className="text-orange-500 pr-2"/>
            <p className="text-xl font-bold"></p>
          </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-xl font-bold"></p>
            </div>
          </div>
        </Card>
        <Card className="shadow-md p-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-black">Return Orders:</h3>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
          <div className="flex items-center justify-start mb-2">
          <div className="flex items-center justify-start mb-2">
          <FontAwesomeIcon icon={faBagShopping} className="text-orange-500 pr-2"/>
            <p className="text-xl font-bold"></p>
          </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-xl font-bold"></p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="h-full w-[95.7%] mx-10 my-10">
        <Typography variant="h6" color="black" className="mx-10 mt-4 text-2xl">
          Recent Orders
        </Typography>

        <CardBody className="overflow-scroll px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Checkbox
                    color="blue"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRowKeys(orders.map((row) => row.id));
                      } else {
                        setSelectedRowKeys([]);
                      }
                    }}
                    checked={selectedRowKeys.length === orders.length}
                    indeterminate={
                      selectedRowKeys.length > 0 &&
                      selectedRowKeys.length < orders.length
                    }
                  />
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="large"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Order ID
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="large"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Date
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="large"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Customer
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="large"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Status
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="large"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    TotalPrice
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const isLast = index === orders.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                const isSelected = selectedRowKeys.includes(order.id);

                return (
                  <tr
                    key={order.id}
                    className={isSelected ? "bg-blue-100" : ""}
                  >
                    <td className={classes}>
                      <Checkbox
                        color="blue"
                        checked={isSelected}
                        onChange={() => onSelectChange(order.id)}
                      />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {order.orderCode}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(order.createDate).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {order.customerName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-2 h-2 mr-2 rounded-full ${
                            order.status === "Order Confirmation"
                              ? "bg-green-500"
                              : order.status === "Canceled"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        ></span>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {order.status}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {order.amount}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}
