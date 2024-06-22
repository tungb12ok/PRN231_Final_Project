using _2Sport_BE.DataContent;
using _2Sport_BE.Infrastructure.Services;
using _2Sport_BE.Repository.Interfaces;
using _2Sport_BE.Repository.Models;
using _2Sport_BE.Service.Enums;
using _2Sport_BE.Service.Services;
using _2Sport_BE.ViewModels;
using MailKit.Search;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace _2Sport_BE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : Controller
    {
        private readonly IPaymentService _paymentService;
        private readonly IOrderService _orderService;
        private readonly IOrderDetailService _orderDetailService;
        private readonly IUserService _userService;
        private readonly ICartItemService _cartItemService;
        private readonly ICartService _cartService;
        private readonly IShipmentDetailService _shipmentDetailService;
        private readonly IPaymentMethodService _paymentMethodService;
        private readonly IProductService _productService;
        private readonly IWarehouseService _warehouseService;
        private readonly IUnitOfWork _unitOfWork;

        public PaymentController(
            IPaymentService paymentService,
            IOrderService orderService,
            IUserService userService,
            ICartService cartService,
            ICartItemService cartItemService,
            IShipmentDetailService shipmentDetailService,
            IPaymentMethodService paymentMethodService,
            IProductService productService,
            IOrderDetailService orderDetailService,
            IWarehouseService warehouseService,
            IUnitOfWork unitOfWork)
        {
            _paymentService = paymentService;
            _orderService = orderService;
            _userService = userService;
            _cartService = cartService;
            _cartItemService = cartItemService;
            _shipmentDetailService = shipmentDetailService;
            _paymentMethodService = paymentMethodService;
            _productService = productService;
            _orderDetailService = orderDetailService;
            _warehouseService = warehouseService;
            _unitOfWork = unitOfWork;
        }
        [HttpPost("checkout-orders")]
        public async Task<IActionResult> CreatePayOsLink([FromBody] OrderCM orderCM, int orderMethodId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid request data.");
            }

            var user = await GetUserFromToken();
            if (user is null)
            {
                return Unauthorized("Invalid user!");
            }

            var cart = await _cartService.GetCartByUserId(user.Id);
            if (cart == null || !cart.CartItems.Any())
            {
                return NotFound("Your Cart is empty");
            }

            Order order = null;
            if (orderMethodId == (int)OrderMethods.PayOS || orderMethodId == (int)OrderMethods.COD)
            {
                order = await CreateOrder(orderCM, orderMethodId);
                if (order == null)
                {
                    return StatusCode(500, "Order creation failed.");
                }

                var paymentLink = orderMethodId == (int)OrderMethods.PayOS
                                  ? await _paymentService.PaymentWithPayOs(order.Id)
                                  : null;

                var check = await DeleteCartItem(user.Id, orderCM.OrderDetails);
                if (!check)
                {
                    return StatusCode(500, "Failed to delete cart items.");
                }

                var orderVM = new OrderVM()
                {
                    ShipmentDetailId = orderCM.ShipmentDetailId,
                    PaymentMethod = order.PaymentMethod.PaymentMethodName,
                    ReceivedDate = order.ReceivedDate,
                    TransportFee = order.TransportFee,
                    IntoMoney = order.IntoMoney,
                    Status = order.Status,
                    PaymentLink = paymentLink,
                    OrderDetails = orderCM.OrderDetails
                    
                };

                var responseModel = new ResponseModel<OrderVM>
                {
                    IsSuccess = true,
                    Message = "Query successfully!",
                    Data = orderVM
                };
                return Ok(responseModel);
            }

            return BadRequest("Invalid order method.");
        }

        [HttpGet("GetPaymentLinkInformation/{orderId}")]
        public async Task<IActionResult> GetPaymentLinkInformation(int orderId)
        {
            try
            {
                var paymentLinkInfo = await _paymentService.GetPaymentLinkInformationAsync(orderId);
                if (paymentLinkInfo == null)
                {
                    return NotFound();
                }
                return Ok(paymentLinkInfo);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost("CancelPaymentLink")]
        public async Task<IActionResult> CancelPaymentLink([FromBody] CancelPaymentRequest request)
        {
            try
            {
                var checkOrderExist = await _orderService.GetOrderByIdFromUserAsync(request.OrderId, GetCurrentUserIdFromToken());
                if (checkOrderExist == null){
                    return BadRequest("You don't have permission in this function");
                }
                checkOrderExist.Status = (int) OrderStatus.Canceled;
                var cancelledPaymentLinkInfo = await _paymentService.CancelPaymentLink(request.OrderId, request.Reason);
                return Ok(cancelledPaymentLinkInfo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [NonAction]
        public string GenerateOrderCode()
        {
            Random random = new Random();
            int randomDigits = random.Next(100000, 1000000);
            return randomDigits.ToString();
        }
        [NonAction]
        protected int GetCurrentUserIdFromToken()
        {
            int UserId = 0;
            try
            {
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var identity = HttpContext.User.Identity as ClaimsIdentity;
                    if (identity != null)
                    {
                        IEnumerable<Claim> claims = identity.Claims;
                        string strUserId = identity.FindFirst("UserId").Value;
                        int.TryParse(strUserId, out UserId);

                    }
                }
                return UserId;
            }
            catch
            {
                return UserId;
            }
        }
        [NonAction]
        private async Task<User> GetUserFromToken()
        {
            var user = await _userService.GetAsync(_ => _.Id == GetCurrentUserIdFromToken());
            return user.FirstOrDefault();
        }
        [NonAction]
        protected async Task<Order> CreateOrder(OrderCM orderCM, int paymentMethodId)
        {
            // Lấy thông tin người dùng từ token
            var user = await GetUserFromToken();
            if (user == null)
            {
                throw new Exception("User not found");
            }

            // Lấy phương thức thanh toán
            var paymentMethod = await _paymentMethodService.GetPaymentMethodAsync(paymentMethodId);
            if (paymentMethod == null)
            {
                throw new Exception("Payment method not found");
            }

            // Tạo đối tượng Order mới
            var order = new Order
            {
                OrderCode = GenerateOrderCode(),
                Status = (int?)OrderStatus.Order_Confirmation,
                TransportFee = orderCM.TransportFee,
                PaymentMethodId = paymentMethodId,
                PaymentMethod = paymentMethod,
                ShipmentDetailId = (int)orderCM.ShipmentDetailId,
                ReceivedDate = orderCM.ReceivedDate,
                UserId = GetCurrentUserIdFromToken(),
                User = user,
                OrderDetails = new List<OrderDetail>()
            };

            decimal totalPrice = 0;

            // Duyệt qua các chi tiết đơn hàng
            foreach (var item in orderCM.OrderDetails)
            {
                var product = await _productService.GetProductById((int)item.ProductId);
                if (product != null)
                {
                    var orderDetail = new OrderDetail
                    {
                        ProductId = product.Id,
                        Product = product,
                        Price = item.Price,
                        Quantity = item.Quantity,
                    };

                    order.OrderDetails.Add(orderDetail);
                    totalPrice += (decimal) (product.Price * item.Quantity);
                }
                else
                {
                    // Xử lý trường hợp sản phẩm không tồn tại
                    throw new Exception($"Product with ID {item.ProductId} not found");
                }
            }

            order.TotalPrice = totalPrice;
            order.IntoMoney = totalPrice + orderCM.TransportFee;

            // Thêm đơn hàng vào cơ sở dữ liệu
            await _orderService.AddOrderAsync(order);

            return order;
        }
        [NonAction]
        protected async Task<bool> DeleteCartItem(int userId, List<OrderDetailRequest> orderDetails)
        {
            var cart = await _cartService.GetCartByUserId(userId);
            if (cart != null && cart.CartItems.Any())
            {
                foreach (var orderDetail in orderDetails)
                {
                    var cartItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == orderDetail.ProductId && ci.Status == true);
                    var wareHouse =(Warehouse) await _warehouseService.GetWarehouseByProductId(orderDetail.ProductId);
                    if (cartItem != null)
                    {
                        if (cartItem.Quantity > orderDetail.Quantity)
                        {
                            var quantity = cartItem.Quantity - orderDetail.Quantity;
                            await _cartItemService.UpdateQuantityOfCartItem(cartItem.Id, (int)quantity);
                            wareHouse.Quantity = wareHouse.Quantity - orderDetail.Quantity;
                            await _warehouseService.UpdateWarehouseAsync(wareHouse);
                            _unitOfWork.Save();
                        }
                        else if (cartItem.Quantity < orderDetail.Quantity)
                        {
                            return false;
                        }
                        else
                        {
                            await _cartItemService.DeleteCartItem(cartItem.Id);
                        }

                    }
                    else
                    {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

    }
}