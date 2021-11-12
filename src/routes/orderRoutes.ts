export const orderRoutes = {
    getOrders: '/getOrders?email=:EMAIL',
    cancelOrder: '/cancelOrder?orderId=:ORDER_ID&email=:EMAIL',
    getOrderItems: '/getOrderItems?order_id=:ORDER_ID'
}