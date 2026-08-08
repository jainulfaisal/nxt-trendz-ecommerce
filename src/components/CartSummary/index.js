import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalAmount = cartList.reduce((acc, eachItem) => {
        return acc + eachItem.price * eachItem.quantity
      }, 0)

      const totalItems = cartList.reduce((acc, eachItem) => {
        return acc + eachItem.quantity
      }, 0)

      return (
        <div className="cart-summary-container">
          <div className="cart-summary-content">
            <h1 className="summary-heading">
              Order Total:
              <span className="total-price">Rs {totalAmount}/-</span>
            </h1>

            <p className="summary-paragraph">{totalItems} Items in cart</p>
          </div>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
