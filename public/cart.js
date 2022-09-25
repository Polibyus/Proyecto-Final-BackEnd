    let price = document.getElementById("price")
    let totalPrice = document.getElementById("totalPrice")

    document.getElementById('metodo').addEventListener('change', function () {
        totalPrice.value = price.textContent * this.value;
        totalPrice.innerHTML = `${totalPrice.value.toFixed(2)}`
    });

    
