// Hàm convert tiền tệ
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function renderListProductAdmin() {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    let result = "";
    for (let i = 0; i < listProducts.length; i++) {
        for (let j = 0; j < listProducts[i].options.length; j++) {
            for (let k = 0; k < listProducts[i].options[j].sizes.length; k++) {
                result += `
            <div class="product-item">
                <div class="product-item-image">
                    <img src="${listProducts[i].options[j].src}" alt="">
                </div>
                <div class="product-item-info">
                    <h5>${listProducts[i].name}</h5>
                    <p>${USDollar.format(listProducts[i].price)}</p>
                    <p>${listProducts[i].options[j].sizes[k].key} size in stock: ${listProducts[i].options[j].sizes[k].stock}</p>
                    <p class = "idOption">${listProducts[i].options[j].idOption}</p>
                    <div class="product-item-button">
                        <button onclick="decreaseItem(${listProducts[i].id}, ${listProducts[i].options[j].idOption}, '${listProducts[i].options[j].sizes[k].key}')">
                            <span class="material-symbols-outlined">
                                remove
                            </span>
                        </button>
                        <button onclick="increaseItem(${listProducts[i].id}, ${listProducts[i].options[j].idOption}, '${listProducts[i].options[j].sizes[k].key}')">
                            <span class="material-symbols-outlined">
                                add
                            </span>
                        </button>
                    </div>
                </div>
                <div class="product-item-close-button">
                    <span class="material-symbols-outlined" onclick = "deleteCartProductItem(${listProducts[i].id}, ${listProducts[i].options[j].idOption}, '${listProducts[i].options[j].sizes[k].key}')">
                        close
                    </span>
                </div>
            </div>
        `;
            }

        }

    }
    // console.log(result)
    document.querySelector(".listProducts-container").innerHTML = result;
}
renderListProductAdmin();

// Hàm tăng số lượng sản phẩm

function increaseItem(productId, idOption, size) {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    let product = listProducts.find((product) => {
        return product.id == productId;
    })
    let option = product.options.find((option) => {
        return option.idOption == idOption;
    })

    for (let i = 0; i < option.sizes.length; i++) {
        if (option.sizes[i].key == size) {
            option.sizes[i].stock += 1;
            localStorage.setItem("listProducts", JSON.stringify(listProducts));
            renderListProductAdmin()
        }
    }
}

// Hàm giảm số lượng sản phẩm

function decreaseItem(productId, idOption, size) {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    let product = listProducts.find((product) => {
        return product.id == productId;
    })
    let option = product.options.find((option) => {
        return option.idOption == idOption;
    })

    for (let i = 0; i < option.sizes.length; i++) {
        if (option.sizes[i].key == size) {
            if (option.sizes[i].stock > 0) {
                option.sizes[i].stock -= 1;
                localStorage.setItem("listProducts", JSON.stringify(listProducts));
                renderListProductAdmin()
            }
        }
    }
}

// Hàm xoá sản phẩm 

function deleteCartProductItem(productId, idOption, size) {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    let product = listProducts.find((product) => {
        return product.id == productId;
    })
    let option = product.options.find((option) => {
        return option.idOption == idOption;
    })

    for (let i = 0; i < option.sizes.length; i++) {
        if (option.sizes[i].key == size) {
            option.sizes[i].stock = 0;
            localStorage.setItem("listProducts", JSON.stringify(listProducts));
            renderListProductAdmin()
        }
    }

}

document.querySelector(".homePage").addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/index.html";
})

// document.querySelector(".userInfo").addEventListener("click", () => {
//     window.location.href = "http://127.0.0.1:5500/pages/userPurchase.html";
// })