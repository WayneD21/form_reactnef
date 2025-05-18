import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';

// counter --------------------------------------------
const useStoreBearCounter = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

// count docs --------------------------------------------
const useStoreTestDocs = create((set) => ({
  count: 1,
  inc: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));

// -------------------------------- immer --------------------------------
// cart store --------------------------------------------
const useCartStore = create(
  immer((set) => ({
    cart: [],
    addToCart: (product) =>
      set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cart.push({ ...product, quantity: 1 });
        }
      }),
    removeFromCart: (productId) =>
      set((state) => {
        state.cart = state.cart.filter((item) => item.id !== productId);
      }),
    updateQuantity: (productId, quantity) =>
      set((state) => {
        const item = state.cart.find((item) => item.id === productId);
        if (item && quantity > 0) {
          item.quantity = quantity;
        }
      }),
    clearCart: () =>
      set((state) => {
        state.cart = [];
      }),
  })),
);

// immer nested --------------------------------
const useNestedImmer = create(
  immer((set) => ({
    count: 0,
    nested: { value: 1, list: [{ id: 1, name: 'Item 1' }] },
    increment: () =>
      set((state) => {
        state.count += 1; // Cập nhật trực tiếp
      }),
    updateNested: () =>
      set((state) => {
        state.nested.value += 1; // Cập nhật object lồng nhau
        state.nested.list[0].name = 'Updated Item'; // Cập nhật array lồng nhau
      }),
    addItem: () =>
      set((state) => {
        state.nested.list.push({ id: state.nested.list.length + 1, name: 'New Item' }); // Thêm vào array
      }),
  })),
);

// -------------------------------- persist --------------------------------
// theme --------------------------------------------
const useThemeStore = create(
  // (persist) lưu trữ trạng thái (state) của store vào (localStorage, sessionStorage, hoặc các storage khác).
  //  trạng thái không bị mất khi người dùng làm mới trang hoặc đóng/mở lại trình duyệt.
  persist(
    (set) => ({
      theme: 'light-theme',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light-theme' ? 'dark-theme' : 'light-theme',
        })),
    }),
    {
      name: 'theme-storage',
    },
  ),
);

// Persist Count --------------------------------------------
const usePersistCount = create(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage', // tên key trong localStorage
      storage: createJSONStorage(() => localStorage), // sử dụng localStorage
    },
  ),
);

// Persist Count --------------------------------------------
const usePanigationStore = create((set)=> ({
  currentPage: 1,
  itemsPerPage: 10,
  setPage: (page)=> set({currentPage: page}),
  setItemsPerPage: (items)=> set({itemsPerPage: items})
}))

export { useStoreBearCounter, useStoreTestDocs, useCartStore, useThemeStore, usePersistCount, useNestedImmer,usePanigationStore };
