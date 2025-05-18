import { create } from 'lodash';
import UpdateState from './components/UpdateState';
import useCounterStore from './studyWithGPT/Ex01';
// import useStoreEx02 from './studyWithGPT/Ex02';
import {
  useNestedImmer,
  usePersistCount,
  useStoreBearCounter,
  useStoreTestDocs,
  useThemeStore,
  usePanigationStore,
} from './store/main';

// Danh sách sản phẩm thực tế
const products = [
  { id: 1, name: 'Laptop Dell XPS 13', price: 1200, category: 'Laptop' },
  { id: 2, name: 'iPhone 14 Pro', price: 999, category: 'Điện thoại' },
  { id: 3, name: 'Tai nghe Sony WH-1000XM5', price: 350, category: 'Phụ kiện' },
  { id: 4, name: 'Màn hình Samsung Odyssey G7', price: 600, category: 'Màn hình' },
  { id: 5, name: 'Bàn phím cơ Keychron K8', price: 90, category: 'Phụ kiện' },
  { id: 6, name: 'MacBook Air M2', price: 1300, category: 'Laptop' },
  { id: 7, name: 'Samsung Galaxy S23', price: 850, category: 'Điện thoại' },
  { id: 8, name: 'Chuột Logitech MX Master 3', price: 100, category: 'Phụ kiện' },
  { id: 9, name: 'Máy ảnh Canon EOS R5', price: 3800, category: 'Máy ảnh' },
  { id: 10, name: 'Loa Bluetooth JBL Flip 6', price: 130, category: 'Phụ kiện' },
  { id: 11, name: 'iPad Pro 12.9"', price: 1100, category: 'Máy tính bảng' },
  { id: 12, name: 'Ổ cứng SSD Samsung 1TB', price: 150, category: 'Lưu trữ' },
  { id: 13, name: 'Máy chơi game PS5', price: 500, category: 'Gaming' },
  { id: 14, name: 'Đồng hồ thông minh Apple Watch Series 8', price: 400, category: 'Phụ kiện' },
  { id: 15, name: 'Máy in HP LaserJet Pro', price: 200, category: 'Máy in' },
];

function ZustandStudy() {
  // ex01 -------------------
  // const { count, increase, decrease } = useCounterStore();

  // ex02 ----------------------
  //   const { countHello, textHello } = useStore()

  // const countHello = useStoreEx02((state) => state.countHello);
  // const increase = useStoreEx02((state) => state.increase);

  // useStoreBearCounter ------------------------------------------
  // const bears = useStoreBearCounter((state) => state.bears); // Lấy giá trị bears
  // const increasePopulation = useStoreBearCounter((state) => state.increasePopulation);
  // const removeAllBears = useStoreBearCounter((state) => state.removeAllBears);

  // test docs ------------------------------------------
  // const incc = useStoreTestDocs((state) => state.inc);
  // const countTestDocs = useStoreTestDocs((state) => state.count);

  // theme store ------------------------------------------
  // const { theme, toggleTheme } = useThemeStore();
  // document.body.className = theme;

  // persist count ------------------------------------------
  // const countPersist = usePersistCount((state) => state.count);
  // const incrementPersist = usePersistCount((state) => state.increment);
  // const resetPersist = usePersistCount((state) => state.reset);

  // use Nested Immer ------------------------------------------
  // const { count, nested, increment, updateNested, addItem } = useNestedImmer();

  // use Nested Immer ------------------------------------------
  const { currentPage, itemsPerPage, setPage, setItemsPerPage } = usePanigationStore();

  // Giả lập danh sách sản phẩm --------------------
  // const products = Array.from({ length: 100 }, (_, i) => ({
  //   id: i + 1,
  //   name: `sản phẩm ${i + 1}`,
  // }));

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <main style={{ padding: '40px 100px' }}>
        {/* theme store ------------------------------- */}
        {/* <div>
          <h2>Theme: {theme}</h2>
          <button onClick={toggleTheme}>Change Theme</button>
        </div> */}

        {/* update state ------------------------------- */}
        {/* <UpdateState /> */}

        {/* ex01 ------------------------------- */}
        {/* <div>
          <h1>Count: {count}</h1>
          <button onClick={decrease} style={{ padding: '4px 20px' }}>
            -
          </button>
          <button onClick={increase} style={{ padding: '4px 20px', marginLeft: '20px' }}>
            +
          </button>
        </div> */}

        {/* ex02 ------------------------------- */}
        {/* <div>
          <h1>Count: {countHello}</h1>
          <button onClick={increase}>+</button>
        </div> */}

        {/* useStoreBearCounter ------------------------------- */}
        {/* <div>
          <h1>{bears}</h1>
          <button onClick={increasePopulation}>add bears</button>
          <button onClick={removeAllBears}>remove all bears</button>
        </div> */}

        {/* test docs ------------------------------- */}
        {/* <button onClick={incc}>one upnef</button>
        <h1>{countTestDocs}</h1> */}

        {/* Persist Count ------------------------------- */}
        {/* <div>
          <h1>counter app</h1>
          <p>count: {countPersist}</p>
          <button onClick={incrementPersist}>increment</button>
          <button onClick={resetPersist}>reset</button>
        </div> */}

        {/* Persist Count ------------------------------- */}
        {/* <div>
          <p>count: {count}</p>
          <p>nested value: {nested.value}</p>
          <p>list: {nested.list.map((item) => `${item.name}`)}</p>
          <button onClick={increment}>increment count</button>
          <button onClick={updateNested}>update nested</button>
          <button onClick={addItem}>add item</button>
        </div> */}

        {/* Pagination ------------------------------- */}
        <div>
          <h2>danh sách sản phẩm</h2>
          <div>
            <label>số mục mỗi trang:</label>
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <ul>
            {currentProducts.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
          <div>
            <button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
              trang trước
            </button>
            <span>
              trang {currentPage} / {totalPages}
            </span>
            <button disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
              trang sau
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

// function TextDisplay() {
//   const text = useStoreEx02((state) => state.text);
//   console.log('textDisplay component rendered');
//   return <p>Text: {text}</p>;
// }

export default ZustandStudy;

// import { Component } from 'react';

// class Counter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       datas: {},
//       open: {},
//       loading: {},
//     };
//   }

//   setOpen = (ojb) => {
//     this.setState((prev) => ({
//       user: {
//         ...prev.open,
//         ...ojb,
//       },
//     }));
//   };

//   //   increment = () => {
//   //     this.setState((prevState) => ({ count: prevState.count + 1 }));
//   //   };
// }

// export default Counter;

// const ab =  new Counter()
// const abv =  new Counter()
// ab.setOpen()
