const db = firebase.firestore();
function getProducts() {

    document.querySelector("#products").innerHTML = ""
    db.collection('products').get()
        .then(products => {
            products.forEach(product => {
                const productData = product.data()
                console.log(productData)

                const productElement = `
            <div id="${product.id}" class="card col-2 mx-4 mt-5">
                <img src="${productData.imageUrl}" class="card-img-top img-thumbnail" alt="...">
                <div class="card-body">
                <h5 class="card-title" style="color:black " >${productData.name}</h5>
                <p class="card-text" style="color:black">${productData.description}</p>
                <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal-${product.id}" class="btn btn-danger mt-1">Delete</a>
            </div>
            <div class="modal fade" id="exampleModal-${product.id}" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Are you sure ?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" onclick="deleteProduct('${product.id}')" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            `
                document.querySelector("#products").innerHTML += productElement
            })
        })

}

getProducts()

function deleteProduct(productId) {
    console.log('detele', productId)
    db.collection("products").doc(productId).delete()
        .then(deletedProduct => {
            console.log('deleted product')
            const modal = document.querySelector(`#exampleModal-${productId}`)
            bootstrap.Modal.getInstance(modal).hide()
            getProducts()
        })
        .catch(err => {
            console.log('could not delete the product', err)
        })
}
//modify
/*function showModifyProduct(productId) {
    console.log('click', productId.id)
    db.collection("products").doc(productId.id).get()
        .then(product => {
            console.log(product.data())
            const modifyForm = `
            <form class="form mt-5">
                <h2>Modify Product</h2>
                <label class="form-label" for="name">Name:</label>
                <input class="form-control" type="text" id="mod-name" value="${product.data().name}" required>
                <label class="form-label" for="description">Description:</label>
                <input class="form-control" type="text" id="mod-description" value="${product.data().description}" required>
                <label class="form-label" for="price" required>Price:</label>
                <input class="form-control" type="number" id="mod-price" value="${product.data().price}">
                <label class="form-label" for="imageUrl">imageUrl:</label>
                <input class="form-control" type="url" id="mod-imageUrl" value="${product.data().imageUrl}" required>
                <label class="form-label" for="quantity">Quantity</label>
                <input class="form-control" type="number" id="mod-quantity" value="${product.data().quantity}">
                <button type="submit" class="btn btn-primary mt-5" id="mod-btn" onclick="updateProduct(${product.id})" >Modify</button>
            </form>
        `
            document.querySelector('#details').innerHTML = modifyForm
        })
}

*/

/*function updateProduct(productId) {
    console.log('click', productId.id)

    const name = document.querySelector("#mod-name").value
    const description = document.querySelector("#mod-description").value
    const quantity = document.querySelector("#mod-quantity").value
    const price = document.querySelector("#mod-price").value
    const imageUrl = document.querySelector("#mod-imageUrl").value

    db.collection('products').doc(productId.id).update({
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        imageUrl: imageUrl
    })
        .then(updatedProduct => {
            console.log('document updated', updatedProduct)
            getProducts()
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });

}


function viewProduct(productId) {
    console.log("click", productId.id)
    db.collection("products").doc(productId.id).get()
        .then(product => {
            console.log(product.data())

            const productElement = `
            <div>
                <strong>Product Name:</strong>
                <h3>${product.data().name}</h3>
                <strong>Description:</strong>
                <p>${product.data().description}</p>
                <strong>Quantity:</strong>
                <p>${product.data().quantity}</p>
                <strong>Price:</strong>
                <p>${product.data().price}</p>
                <img src="${product.data().imageUrl}" class="img-thumbnail" width="400" >
            </div>
            `
            document.querySelector("#details").innerHTML = productElement
        })
        .catch((error) => {
            console.error("Error getting document: ", error);
        });

}*/

document.querySelector("#add-btn").addEventListener("click", function (e) {
    e.preventDefault()
    const name = document.querySelector("#name").value
    const description = document.querySelector("#description").value
    const quantity = document.querySelector("#quantity").value
    const price = document.querySelector("#price").value
    const imageUrl = document.querySelector("#imageUrl").value

    db.collection('products').add({
        name: name,
        quantity: quantity,
        description: description,
        price: price,
        imageUrl: imageUrl,
        category: 'furniture'
    })
        .then((newProduct) => {
            console.log("Document written with ID: ", newProduct.id);
            getProducts()
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

})

/*document.querySelector('#search-btn').addEventListener('click', function (e) {
    e.preventDefault()

    const search = document.querySelector("#search").value

    db.collection("products").where("name", "==", search).get()
        .then(products => {

            document.querySelector("#products").innerHTML = ""
            products.forEach(product => {
                console.log(product.data())

                const productData = product.data()

                const productElement = `
                <div id="${product.id}" class="card col-2 mx-4 mt-5">
                    <img src="${productData.imageUrl}" class="card-img-top img-thumbnail" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${productData.name}</h5>
                    <p class="card-text">${productData.description}</p>
                    <a href="#" onclick="viewProduct(${product.id})" class="btn btn-primary">View</a>
                    <a href="#" onclick="showModifyProduct(${product.id})" class="btn btn-success mt-1">Modify</a>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal-${product.id}" class="btn btn-danger mt-1">Delete</a>
                </div>
                <div class="modal fade" id="exampleModal-${product.id}" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Are you sure ?</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" onclick="deleteProduct('${product.id}')" class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
                document.querySelector("#products").innerHTML += productElement
            })

        })
        .catch(err => {
            console.log('error searching', err)
        })
*/