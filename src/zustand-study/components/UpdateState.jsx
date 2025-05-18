import { create } from 'zustand';
import { useCartStore } from '../store/main';

// Create your store, which includes both state and (optionally) actions
const useQuantityStore = create((set) => ({
  meoNef: '',
  updateMeo: (meoNefs) => set(() => ({ meoNef: meoNefs })),
  quantityD: '',
  updateQuantity: (quantityDay) => set(() => ({ quantityD: quantityDay })),
}));

const useTest3 = create((set) => ({
  test3: '',
  updateTest3: (test3nha) => set(() => ({ test3: test3nha })),
}));

function UpdateState() {
  // "select" the needed state and actions, in this case, the firstName value
  // and the action updateFirstName
  const meoValue = useQuantityStore((state) => state.meoNef);
  const updateMeoValue = useQuantityStore((state) => state.updateMeo);

  const quantityValue = useQuantityStore((state) => state.quantityD);
  const updateQuantityValue = useQuantityStore((state) => state.updateQuantity);

  // test3 --------------------------------------
  const test3Value = useTest3((state) => state.test3);
  const updateTest3Value = useTest3((state) => state.updateTest3);

  // test4 --------------------------------------
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  return (
    <>
      <main>
        {/* test1 -------------------------------------- */}
        {/* <label>
          meo1
          <input onChange={(e) => updateMeoValue(e.currentTarget.value)} value={meoValue} />
        </label>
        <p>
          meonef1, <strong>{meoValue}</strong>
        </p> */}
        {/* test2 -------------------------------------- */}
        {/* <label>
          meo2
          <input onChange={(e) => updateQuantityValue(e.currentTarget.value)} value={quantityValue} />
        </label>
        <p>
          meonef2, <strong>{quantityValue}</strong>
        </p> */}
        {/* test3 -------------------------------------- */}
        {/* <label>
          meo3
          <input onChange={(e) => updateTest3Value(e.currentTarget.value)} value={test3Value} />
        </label>
        <p>
          meonef3, <strong>{test3Value}</strong>
        </p> */}
        {/* test4 -------------------------------------- */}
        {/* <div>
          <h2>Giỏ hàng</h2>
          {cart.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.name} - ${item.price}
                    </span>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      min="1"
                    />
                    <button onClick={() => removeFromCart(item.id)}>Xóa</button>
                  </li>
                ))}
              </ul>
              <button onClick={clearCart}>Xóa toàn bộ</button>
            </>
          )}
        </div> */}
        {/* test5 -------------------------------------- */}

      </main>
    </>
  );
}

export default UpdateState;

// // src/components/Cart.js
// import useCartStore from '../stores/cartStore';

// function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

//   return (
//     <div>
//       <h2>Giỏ hàng</h2>
//       {cart.length === 0 ? (
//         <p>Giỏ hàng trống</p>
//       ) : (
//         <>
//           <ul>
//             {cart.map((item) => (
//               <li key={item.id}>
//                 <span>{item.name} - ${item.price}</span>
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     updateQuantity(item.id, parseInt(e.target.value))
//                   }
//                   min="1"
//                 />
//                 <button onClick={() => removeFromCart(item.id)}>Xóa</button>
//               </li>
//             ))}
//           </ul>
//           <button onClick={clearCart}>Xóa toàn bộ</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Cart;

// src/stores/cartStore.js
// import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer';

// const useCartStore = create(
//   immer((set) => ({
//     cart: [],
//     addToCart: (product) =>
//       set((state) => {
//         const existingItem = state.cart.find((item) => item.id === product.id);
//         if (existingItem) {
//           existingItem.quantity += 1;
//         } else {
//           state.cart.push({ ...product, quantity: 1 });
//         }
//       }),
//     removeFromCart: (productId) =>
//       set((state) => {
//         state.cart = state.cart.filter((item) => item.id !== productId);
//       }),
//     updateQuantity: (productId, quantity) =>
//       set((state) => {
//         const item = state.cart.find((item) => item.id === productId);
//         if (item && quantity > 0) {
//           item.quantity = quantity;
//         }
//       }),
//     clearCart: () =>
//       set((state) => {
//         state.cart = [];
//       }),
//   }))
// );

// export default useCartStore;
