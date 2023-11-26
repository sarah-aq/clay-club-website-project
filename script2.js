const db = firebase.firestore();
function getProducts() {

    /*document.querySelector("#products").innerHTML = ""*/
    db.collection('products').get()
        .then(products => {
            products.forEach(product => {
                const productData = product.data()
                console.log(productData)

                const productElement = `
                <div class="col-md-3 text-center">
                <div class="p-2 item" 
				onclick="addItem('${productData.name}' , '${productData.price}')"
				data-price="${product.price}" style="
				background-size: contain;color:#4e3d30;
background-image: url(${productData.imageUrl});">${productData.name}

                </div>

                <button id="myBtn${productData.id}">Details</button>

                <!-- The Modal -->
                <div id="myModal${productData.id}" class="modal">

                    <!-- Modal content -->
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>${productData.description}
                             <br>
                             Measurements:
                                9,5 x 6,5 cm
                                <br>
                                price:${productData.price} riyal.
                            </p>
                    </div>

                </div>
            </div>
           
            `
                document.querySelector("#products").innerHTML += productElement
            })
        })
		



}

getProducts()

