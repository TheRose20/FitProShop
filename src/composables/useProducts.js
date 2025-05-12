import { watch, ref } from "vue";

const productsLocalStorage = ref([]);
const basketLocalStorage = ref([]);
const favoriteLocalStorage = ref([]);

const defaultProducts = [
  // 0
  {
    id: 0,
    basket: false,
    favorite: false,
    count: 1,
    hits: true,
    name: "Футболка Classic",
    description:
      "Классический топ Gorilla Wear свободного кроя с рваными краями и большим принтом на груди.",
    price: "5280",
    picture:
      "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/90107900-classic-work-out-top-black-41.png",
            // "https://katushka1743.github.io/FitProShop/img/90107900-classic-work-out-top-black-41.png",
    // picture: "img/90107900-classic-work-out-top-black-41.png",
    gender: "Муж",
  },
  // 1
  {
    id: 1,
    basket: false,
    favorite: false,
    count: 1,
    hits: true,
    name: "Шорты Mesh Shorts",
    description:
      "Шорты из сетчатой ткани высокого качества с добавлением микрофибры. Эластичный пояс на шнурке, два боковых кармана.",
    price: "4400",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/top1.jpg",
        // picture: "https://katushka1743.github.io/FitProShop/img/top1.jpg",
    // picture: "img/top1.jpg",
    gender: "Муж",
  },
  // 2
  {
    id: 2,
    basket: false,
    favorite: false,
    count: 1,
    hits: true,
    name: "Кроссовки GWEAR HIGH TOPS",
    description:
      "Высокие ботинки Gwear Classic идеально подходят для занятий бодибилдингом и пауэрлифтингом.",
    price: "10500",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/top2.jpg",
        // picture: "https://katushka1743.github.io/FitProShop/img/top2.jpg",
    // picture: "img/top2.jpg",
    gender: "Муж",
  },
  // 3
  {
    id: 3,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: "Классическая майка Gorilla Wear",
    description:
      "Эту классическую майку-безрукавку просто невозможно не заметить. Она традиционная и прочная.",
    price: "3050",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/top3.jpg",
        // picture: "https://katushka1743.github.io/FitProShop/img/top3.jpg",
    // picture: "img/top3.jpg",
    gender: "Муж",
  },
  // 4
  {
    id: 4,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Женская укороченная толстовка "Tracey"',
    description:
      "Укороченная толстовка свободного кроя из органического хлопка с флисовой подкладкой.",
    price: "7040",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/91877120-tracey-cropped-hoodie-beige-01.jpg",
        // picture: "https://katushka1743.github.io/FitProShop/img/91877120-tracey-cropped-hoodie-beige-01.jpg",
    // picture: "img/91877120-tracey-cropped-hoodie-beige-01.jpg",
    gender: "Жен",
  },
  // 5
  {
    id: 5,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Штаны "Augustine Old School"',
    description:
      "Штаны свободного кроя из хлопкового трикотажа в рубчик. Эластичный пояс на резинке, два боковых кармана на молнии.",
    price: "5940",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/augustine-bk01.jpg",
        // picture: "https://katushka1743.github.io/FitProShop/img/augustine-bk01.jpg",
    // picture: "img/augustine-bk01.jpg",
    gender: "Муж",
  },
  // 6
  {
    id: 6,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Бутылка "Gradient 1000 ml"',
    description: "Объём 1000мл",
    price: "2090",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/99221188-gradient-water-bottle-green-orange-101.jpg",
        // picture: "https://katushka1743.github.io/FitProShop/img/99221188-gradient-water-bottle-green-orange-101.jpg",
    // picture: "img/99221188-gradient-water-bottle-green-orange-101.jpg",
    gender: "Уни",
  },
  // 7
  {
    id: 7,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Полотенце "Zip Pocket"',
    description: "50см x 100см",
    price: "3300",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/99241900-zip-pocket-gym-towel-black-2.jpg",
        // picture: "https://katushka1743.github.io/FitProShop/img/99241900-zip-pocket-gym-towel-black-2.jpg",
    // picture: "img/99241900-zip-pocket-gym-towel-black-2.jpg",
    gender: "Уни",
  },
  // 8
  {
    id: 8,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Сумка "Norris"',
    description:
      "Большая тренировочная сумка-рюкзак из высокопрочного материала отлично соответствует потребностям спортсменов за счет многофункциональности. Ее можно носить как рюкзак благодаря уплотненной подкладке на спине. ",
    price: "9240",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/011.png",
        // picture: "https://katushka1743.github.io/FitProShop/img/011.png",
    // picture: "img/011.png",
    gender: "Уни",
  },
  // 9
  {
    id: 9,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Кроссовки "Gwear Pro High Tops"',
    description:
      "Эти кроссовки для бодибилдинга унисекс разработаны специально для серьезных спортсменов и отличаются функциональностью, стилем и комфортом для достижения максимальной производительности во время тренировок.",
    price: "11660",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/90016509-gwear-pro-high-tops-red-black-2.png",
        // picture: "https://katushka1743.github.io/FitProShop/img/90016509-gwear-pro-high-tops-red-black-2.png",
    // picture: "img/90016509-gwear-pro-high-tops-red-black-2.png",
    gender: "Муж",
  },
  // 10
  {
    id: 10,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Лосины женские "Colby"',
    description:
      "Лосины из мягкого стрейчевого материала, обеспечивающего максимальную свободу движений. Широкий эластичный пояс из брендированной резинки, плоские швы, логотип на голени.",
    price: "4840",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/91954800-colby-leggings-gray-9.png",
        // picture: "https://katushka1743.github.io/FitProShop/img/91954800-colby-leggings-gray-9.png",
    // picture: "img/91954800-colby-leggings-gray-9.png",
    gender: "Жен",
  },
  // 11
  {
    id: 11,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Бра "Colby"',
    description:
      "Спортивный топ-бра со средней степенью поддержки. Тонкие съемные чашечки обеспечивают надежную поддержку груди. Регулируемые бретели и тройная застежка на крючках на спине обеспечивают индивидуальную посадку.",
    price: "3960",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/91538806-colby-sports-bra-gray-pink-01.jpg",
        // picture: "https://katushka1743.github.io/FitProShop/img/91538806-colby-sports-bra-gray-pink-01.jpg",
    // picture: "img/91538806-colby-sports-bra-gray-pink-01.jpg",
    gender: "Жен",
  },
  // 12
  {
    id: 12,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Маска защитная "GW"',
    description:
      "Многоразовая двухслойная защитная маска с карманом для фильтра (фильтр в комплект не входит). Анатомическая форма и удобные резинки-повязки минимизируют давление на мягкие ткани лица.",
    price: "660",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/99178900-face-mask-01.jpg",
        // picture: "https://katushka1743.github.io/FitProShop/img/99178900-face-mask-01.jpg",
    // picture: "img/99178900-face-mask-01.jpg",
    gender: "Уни",
  },
  // 13
  {
    id: 13,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Сумка "Everyday"',
    description:
      "Тренировочная сумка из высокопрочного материала с двойными ручками и съемным регулируемым ремнем через плечо. Уплотненное дно, одно большое отделение на молнии, а также внутренние карманы.",
    price: "7700",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/photo_5447243675500407571_y.png",
        // picture: "https://katushka1743.github.io/FitProShop/img/photo_5447243675500407571_y.png",
    // picture: "img/photo_5447243675500407571_y.png",

    gender: "Уни",
  },
  // 14
  {
    id: 14,
    basket: false,
    favorite: false,
    count: 1,
    hits: false,
    name: 'Рюкзак с контейнерами для еды "Clyde Meal"',
    description:
      "Многофункциональный рюкзак с изолированной модульной системой для размещения 2-х контейнеров для еды, подойдет как для спортсменов, так и для повседневного использования. ",
    price: "13640",
    picture: "https://raw.githubusercontent.com/katushka1743/FitProShop/refs/heads/main/src/img/photo_5447243675500407570_y.png",
        // picture: "https://katushka1743.github.io/FitProShop/img/photo_5447243675500407570_y.png",
    // picture: "img/photo_5447243675500407570_y.png",

    gender: "Уни",
  },
];

// Загружаем данные из localStorage для всех продуктов
try {
  if (localStorage.getItem("productsLS") === null) {
    productsLocalStorage.value = defaultProducts;
  } else {
    productsLocalStorage.value = JSON.parse(localStorage.getItem("productsLS"));
  }
} catch (error) {
  productsLocalStorage.value = defaultProducts;
}

// Загружаем данные из localStorage для корзины
try {
  if (localStorage.getItem("basketLS") === null) {
    basketLocalStorage.value = [];
  } else {
    basketLocalStorage.value = JSON.parse(localStorage.getItem("basketLS"));
  }
} catch (error) {
  basketLocalStorage.value = [];
}

// Загружаем данные из localStorage для избранного
try {
  if (localStorage.getItem("favoriteLS") === null) {
    favoriteLocalStorage.value = [];
  } else {
    favoriteLocalStorage.value = JSON.parse(localStorage.getItem("favoriteLS"));
  }
} catch (error) {
  favoriteLocalStorage.value = [];
}

// Следим за изменениями в продуктах и сохраняем их в localStorage
watch(
  productsLocalStorage,
  (newValue) => {
    localStorage.setItem("productsLS", JSON.stringify(newValue));
  },
  { deep: true }
);

// Следим за изменениями в корзине и сохраняем их в localStorage
watch(
  basketLocalStorage,
  (newValue) => {
    localStorage.setItem("basketLS", JSON.stringify(newValue));
  },
  { deep: true }
);

// Следим за изменениями в избранном и сохраняем их в localStorage
watch(
  favoriteLocalStorage,
  (newValue) => {
    localStorage.setItem("favoriteLS", JSON.stringify(newValue));
  },
  { deep: true }
);

// Функция добавления товара в избранное
function addInFavorite(productData, userId) {
  // Проверяем, что товара в избранном ещё нет
  const favoriteProductBool = favoriteLocalStorage.value.find(
    (element) =>
      element.userId === userId && element.productData.id === productData.id
  );
  // Если нет --> добавляем
  if (!favoriteProductBool) {
    favoriteLocalStorage.value.push({
      productData: productData,
      userId: userId,
    });
  }
  // Устанавливаем флаг, что данный товар в избранном
  productData.favorite = true;
  const product = productsLocalStorage.value.find(
    (p) => p.id === productData.id
  );
  if (product) {
    product.favorite = true;
  }
}

// Функция удаления товара из избранного
function deleteInFavorite(productData, userId) {
  // Ищем индекс элемента в массиве при условии, что пользователь и товар в массиве совпадают
  const index = favoriteLocalStorage.value.findIndex(
    (element) =>
      element.userId === userId && element.productData.id === productData.id
  );
  // Если индекс -1 (товар не найден) --> устанавливаем флаг, что товара в избранном нет и удаляем товар по его индексу
  if (index !== -1) {
    productData.favorite = false;
    favoriteLocalStorage.value.splice(index, 1);
    const product = productsLocalStorage.value.find(
      (p) => p.id === productData.id
    );
    if (product) {
      product.favorite = false;
    }
  }
}

// Функция добавления товара в корзину
function addInBasket(productData, userId) {
  // Проверяем, что товара в корзине ещё нет
  const basketProductBool = basketLocalStorage.value.find(
    (element) =>
      element.userId === userId && element.productData.id === productData.id
  );
  // Если нет --> добавляем
  if (!basketProductBool) {
    basketLocalStorage.value.push({
      productData: productData,
      userId: userId,
    });
  }
  // Устанавливаем флаг, что данный товар в корзине
  productData.basket = true;
  const product = productsLocalStorage.value.find(
    (p) => p.id === productData.id
  );
  if (product) {
    product.basket = true;
  }
}

// Функция удаления товара из корзины
function deleteInBasket(productData, userId) {
  // Ищем индекс элемента в массиве при условии, что пользователь и товар в массиве совпадают
  const index = basketLocalStorage.value.findIndex(
    (element) =>
      element.userId === userId && element.productData.id === productData.id
  );
  // Если индекс -1 (товар не найден) --> устанавливаем флаг, что товара в корзине нет и удаляем товар по его индексу
  if (index !== -1) {
    productData.basket = false;
    basketLocalStorage.value.splice(index, 1);
    const product = productsLocalStorage.value.find(
      (p) => p.id === productData.id
    );
    if (product) {
      product.basket = false;
    }
  }
}

// Поиск товара по id
function findProduct(productId) {
  return productsLocalStorage.value.find((product) => product.id === productId);
}

// Экспорт функций и переменных
export default function useProducts() {
  return {
    findProduct,
    basketLocalStorage,
    addInBasket,
    deleteInBasket,
    addInFavorite,
    deleteInFavorite,
    favoriteLocalStorage,
    productsLocalStorage,
  };
}
