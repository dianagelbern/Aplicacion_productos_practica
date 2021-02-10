//Clase producto (como van a lucir los productos en la aplicación)
class Product {
    //Constructor
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }

}
//Interfaz que accede al DOM (interactua con el HTML)
class UI {
    //Métodos
    addProduct(product) {
        //interactuar con el documento
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        //Diseño de qué elemento irá dentro de 'product-list' 
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        //insertar para ver en pantalla
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById("product-form").reset();
    }

    deleteProduct(element) {
        if(element.name === 'delete') {
            console.log(element.parentElement.parentElement.parentElement.remove());
            this.showMessage('Product Deleted Successfuly', 'info')
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        //le asignamos una clase al div
        div.className = `alert alert-${cssClass} mt-4`;
        //agregar el mensaje
        div.appendChild(document.createTextNode(message));
        //mostrarlo en DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        //recibe dos elementos, la funcion que queremos ejecutar y 
        //cuanto tiempo tendremos que esperar para ejecutarla en milisegundos
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2000)

    }
}

// DOM events
document.getElementById('product-form').addEventListener('submit', 
    function (e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    
    //Se instancia la clase
    const product = new Product(name, price, year);
    
    //creamos una instancia de la clase UI, una vez creada accedemos al método "agregar producto" 
    //le damos el producto previamente creado para mostrarlo en la interfaz (objeto interactuando con otro)
    const ui = new UI();

    if(name === '' || price === '' || year === '') {
        return ui.showMessage('Complete Fields Please', 'danger');
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Product Added Successfuly', 'success');

    //cancela el comportamiento por defecto del formulario
    e.preventDefault();
    }
);

//Evento para eliminar 
document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
})
