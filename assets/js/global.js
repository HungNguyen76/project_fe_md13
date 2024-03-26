let listProductsStock = [
    {
        img: "/assets/images/productItem/air-jordan-9-retro-mens-shoes-3WfxKt.png",
        name: "AIRism Cotton T (short sleeve)",
        price: 14.90,
        type: "MEN",
        options: [
            {
                src: "/assets/images/productItem/air-jordan-9-retro-mens-shoes-3WfxKt-FQ8992-101.png",
                sizes: [
                    {
                        key: "S",
                        stock: 10
                    },
                    {
                        key: "M",
                        stock: 10
                    },
                    {
                        key: "L",
                        stock: 10
                    }
                ],
            },
            {
                src: "/assets/images/productItem/air-jordan-9-retro-mens-shoes-3WfxKt-FQ8992-102.png",
                sizes: [
                    {
                        key: "S",
                        stock: 10
                    },
                    {
                        key: "M",
                        stock: 10
                    },
                    {
                        key: "L",
                        stock: 10
                    }
                ],
            },
            {
                src: "/assets/images/productItem/air-jordan-9-retro-mens-shoes-3WfxKt-FQ8992-103.png",
                sizes: [
                    {
                        key: "S",
                        stock: 10
                    },
                    {
                        key: "M",
                        stock: 10
                    },
                    {
                        key: "L",
                        stock: 10
                    }
                ],
            },
        ],
    },
]

window.onload = function () {
    const bar = document.getElementById("bar");
    const close = document.getElementById("close");
    const nav = document.getElementById("navbar");

    if (bar) {
        bar.addEventListener("click", () => {
            nav.classList.add("active");
        });
    }

    if (close) {
        close.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    }
};

// Create a Fixed Header on Scroll
window.onscroll = function () { myFunction() };

let header = document.querySelector(".nagivation-container");
let sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

// Hàm hiển thị banner
let slideIndex = 1;
// call showDivs() to display the first image
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

// The showDiv() function hides (display="none") all elements with the class name "mySlides", 
// and displays (display="block") the element with the given slideIndex
function showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    // Hides (display="none") all elements with the class name "mySlides"
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

//Format tiền
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

//Tạo id ngẫu nhiên cho sản phẩm
function uuid() {
    return new Date().getMilliseconds() + Math.floor(Math.random() * 999999999);
}


//Thêm id và số lượng cho sản phẩm
for (let i = 0; i < listProductsStock.length; i++) {
    listProductsStock[i].id = uuid();
    listProductsStock[i].quantity = 1;
}

//Thêm id cho option
for (let i = 0; i < listProductsStock.length; i++) {
    for (let j = 0; j < listProductsStock[i].options.length; j++) {
        listProductsStock[i].options[j].idOption = uuid();
    }
}


//Lưu listProducts vào localStorage
localStorage.setItem("listProducts", JSON.stringify(listProductsStock));

//Hàm render list tất cả sản phẩm
function renderListAllProducts() {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    renderListProducts(listProducts);
    document.querySelector(".listPage").style.display = "block";
    pagination();
}

//Hàm render list sản phẩm dành cho nam
function renderMenListProducts() {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    let listProductsMen = [];
    for (let i = 0; i < listProducts.length; i++) {
        if (listProducts[i].type == "MEN") {
            listProductsMen.push(listProducts[i])
        }
    }
    renderListProducts(listProductsMen);
    document.querySelector(".listPage").style.display = "none";
}

// Hàm hiển thị danh sách sản phẩm
function renderListProducts(params) {
    let result = "";
    for (let i = 0; i < params.length; i++) {
        result += `
            <div class="product-item" onclick="renderProductItem('${params[i].id}')">
                <div class="product-image">
                    <img src="${params[i].img}" alt="">
                </div>
                <div class="product-description">   
                    <div class="product-type">
                        <span>${params[i].type}</span>
                        <span>S-M-L</span>
                    </div>
                    <h4 class="product-name">${params[i].name}</h4>
                    <p>${USDollar.format(params[i].price)}</p>
                </div>
            </div>
            `
    }
    document.querySelector(".content-container").innerHTML = result;
    document.querySelector(".content-container").style.display = "flex";
    document.querySelector(".banner-container").style.display = "none";
    // document.querySelector(".footer-container").classList.remove("active-footer");
}

//Hiển thị chi tiết sản phẩm
function renderProductItem(idProduct) {

    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    let productItem = listProducts.find((item) => {
        return item.id == idProduct
    })

    let result = `
        <div class="product">
            <div class="productItem-image">
                <div class="productItem-main-image">
                <img src="${productItem.img}" alt="" class="main-image">
            </div>
                <div class="productItem-image-color">
            
                </div>
            </div>
            <div class="productItem-description">
                <h2>${productItem.name}</h2>
                <h3>${USDollar.format(productItem.price)}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente error totam harum iste deserunt
                suscipit enim aliquam nihil veritatis quam minima architecto ad corporis, facere ut veniam et quas
                culpa.
                </p>
                <h4>Size</h4>
                <div>
                    <input type="radio" id="S" value="S" name="size" class="size-option">
                    <label for="S">S</label>
                    <br>
                    <input type="radio" id="M" value="M" name="size" class="size-option">
                    <label for="M">M</label>
                    <br>
                    <input type="radio" id="L" value="L" name="size" class="size-option">
                    <label for="L">L</label>
                </div>
                <button class="addtocart-button" onclick="addToCart('${productItem.id}')">ADD TO CART</button><br>
                <p class="product-idOption">${productItem.options[0].idOption}</p>
                <span class="stock-size-S">Size S available in stock ${productItem.options[0].sizes[0].stock}</span><br>
                <span class="stock-size-M">Size M available in stock ${productItem.options[0].sizes[1].stock}</span><br>
                <span class="stock-size-L">Size L available in stock ${productItem.options[0].sizes[2].stock}</span>
            </div>
        </div>
        `;
    document.querySelector(".content-container").style.display = "flex";
    document.querySelector(".content-container").innerHTML = result;
    document.querySelector(".banner-container").style.display = "none";
    let productItemColor = document.querySelector(".productItem-image-color");

    let productColors = "";
    for (let i = 0; i < productItem.options.length; i++) {

        productColors += `
            <img src="${productItem.options[i].src}" alt="" onclick="changeProductColor(${idProduct}, '${productItem.options[i].src}', '${productItem.options[i].idOption}')">
        `
    }
    productItemColor.innerHTML = productColors;
}

//Hàm kiểm tra xem đã đăng nhập hay chưa
function checkLogin() {
    let isLogin = localStorage.getItem("checkLogin");
    if (isLogin == null) {
        return false
    } else {
        return true
    }
}

//Hàm kiểm tra đăng xuất hay chưa
function checkLogout() {
    let confirmLogout = confirm("Bạn có muốn thoát không?");
    if (confirmLogout) {
        localStorage.removeItem("checkLogin");
        window.location.href = "index.html";
        document.querySelector(".logout-button").style.display = "hidden";

    }
}

if (checkLogin()) {
    document.querySelector(".login-button").style.display = "none";
    document.querySelector(".logout-button").style.display = "block";
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(idProduct) {
    let checkLogin = localStorage.getItem("checkLogin");

    if (checkLogin == null) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng")
        return
    }

    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    let listUsers = JSON.parse(localStorage.getItem("listUsers"));
    let selectedSize = null
    let idOption = document.querySelector(".product-idOption").innerHTML;

    const sizeOptions = document.querySelectorAll(".size-option");
    for (let i = 0; i < sizeOptions.length; i++) {
        if (sizeOptions[i].checked) {
            selectedSize = sizeOptions[i].value
            break
        }
    }
    if (selectedSize == null) {
        alert("Bạn cần chọn size")
        return
    }
    let product = listProducts.find((item) => {
        return item.id == idProduct
    })

    let option = product.options.find((item) => {
        return item.idOption == idOption
    })
    let imageLink = option.src
    let productName = product.name
    let productPrice = product.price

    for (let i = 0; i < listUsers.length; i++) {
        if (listUsers[i].idUser == checkLogin) {
            let cart = listUsers[i].cartUser

            //kiểm tra sản phẩm đã có trong giỏ hàng chưa
            let existingProduct = cart.find((item) => {
                return item.size == selectedSize && item.idOption == idOption
            })
            if (existingProduct) {
                existingProduct.quantity++
                localStorage.setItem("listUsers", JSON.stringify(listUsers))
                alert("Thêm sản phẩm vào giỏ hàng thành công")
            } else {
                cart.push({
                    idProduct: idProduct,
                    size: selectedSize,
                    quantity: 1,
                    idOption: idOption,
                    imageLink: imageLink,
                    productName: productName,
                    productPrice: productPrice
                })
                localStorage.setItem("listUsers", JSON.stringify(listUsers))
                alert("Thêm sản phẩm vào giỏ hàng thành công")
            }
        }
    }
}

//Hàm hiển thị danh sách sản phẩm giỏ hàng
function showCartProducts() {
    document.querySelector(".cartProducts-container").style.display = "block";
    document.querySelector(".nagivation-container").style.opacity = 0.5;
    document.querySelector(".content-container").style.opacity = 0.5;
    document.querySelector(".banner-container").style.opacity = 0.5;

    let listUsers = JSON.parse(localStorage.getItem("listUsers"));
    let checkLogin = localStorage.getItem("checkLogin");
    let user = listUsers.find((item) => {
        return item.idUser == checkLogin
    })
    let cartUser = user.cartUser;
    let result = ""
    for (let i = 0; i < cartUser.length; i++) {
        result += `
        <div class="cartProductItem" id = "cartProductItem_${i}">
                <div class="cartItem">
                    <div class="cartProductItem-image">
                        <img src="${cartUser[i].imageLink}" alt="">
                    </div>
                    <div class="cartProductItem-info">
                        <h4>${cartUser[i].productName}</h4>
                        <p>Product code: ${cartUser[i].idOption}</p>
                        <p>Size: ${cartUser[i].size}</p>
                        <p>${USDollar.format(cartUser[i].productPrice)}</p>
                            <div class="changeQuantity-button">
                                <button>
                                    <span class="material-symbols-outlined" onclick="decreaseItem(${i})">
                                        remove
                                    </span>
                                </button>
                                
                                <span class="productItem-quantity" id="quantity">${cartUser[i].quantity}</span>

                                <button>
                                    <span class="material-symbols-outlined" onclick="increaseItem(${i})">
                                        add
                                    </span>
                                </button>
                            </div>
                    </div>
                </div>
                <div class="cartItem-delete-button" onclick = "deleteCartProductItem(${i})">
                        <span class="material-symbols-outlined">
                            close
                        </span>
                </div>
            </div>
        `
    }
    document.querySelector(".cartProductItems").innerHTML = result;
}
document.querySelector(".cartProducts-close").addEventListener("click", () => {
    document.querySelector(".cartProducts-container").style.display = "none";
    document.querySelector(".nagivation-container").style.opacity = 1;
    document.querySelector(".content-container").style.opacity = 1;
    document.querySelector(".banner-container").style.opacity = 1;
})