const ORDER_GET_ALL_QUERY = `SELECT c.name, o.total_amount, o.status, SUM(oi.quantity) as total_quantity 
FROM orders AS o
INNER JOIN order_items AS oi ON o.id = oi.order_id
INNER JOIN chocolate AS c ON oi.chocolate_id = c.id
WHERE o.user_id = ?
GROUP BY c.name, o.total_amount, o.status, o.id;`

const ORDER_DELETE_QUERY = "DELETE FROM `orders` WHERE id = ?;"

export { ORDER_GET_ALL_QUERY, ORDER_DELETE_QUERY }