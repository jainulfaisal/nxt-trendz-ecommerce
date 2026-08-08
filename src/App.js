import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => {
      const existingProduct = prevState.cartList.find(
        eachItem => eachItem.id === product.id,
      )

      if (existingProduct) {
        const updatedCartList = prevState.cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return {
              ...eachItem,
              quantity: eachItem.quantity + product.quantity,
            }
          }
          return eachItem
        })

        return {
          cartList: updatedCartList,
        }
      }
      return {
        cartList: [...prevState.cartList, product],
      }
    })
  }

  removeCartItem = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.filter(eachItem => {
        return eachItem.id !== id
      })
      return {
        cartList: updatedCartList,
      }
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            quantity: eachItem.quantity + 1,
          }
        }
        return eachItem
      })
      return {
        cartList: updatedCartList,
      }
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const cartItem = prevState.cartList.find(eachItem => eachItem.id === id)

      if (!cartItem) {
        return {cartList: prevState.cartList}
      }

      if (cartItem.quantity > 1) {
        const updatedCartList = prevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            return {
              ...eachItem,
              quantity: eachItem.quantity - 1,
            }
          }
          return eachItem
        })
        return {
          cartList: updatedCartList,
        }
      }
      const updatedCartList = prevState.cartList.filter(
        eachItem => eachItem.id !== id,
      )

      return {
        cartList: updatedCartList,
      }
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
