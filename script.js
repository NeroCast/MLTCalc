const subscriptionValues = {
    'Torreón': {
        'Beta': 0.35,
        'Básica': 0.25,
        'Supreme': 0.20
    },
    'Resto de México': {
        'Básica': 0.35,
        'Plus': 0.25,
        'Premium': 0.22,
        'Supreme': 0.20
    }
};

const shippingCosts = {
    'Básica': 400,
    'Plus': 400,
    'Premium': 350,
    'Supreme': 300
};

// Actualizar las opciones de suscripción al seleccionar la ubicación
function updateSubscriptionOptions() {
    const location = document.getElementById('location').value;
    const subscription = document.getElementById('subscription');
    const weightGroup = document.getElementById('weight-group');
    const shippingGroup = document.getElementById('shipping-group');
    const freeShippingGroup = document.getElementById('free-shipping-group');

    subscription.innerHTML = '<option value="">Selecciona una opción</option>';

    if (location === 'Torreón') {
        weightGroup.style.display = 'block';
        shippingGroup.style.display = 'none';
        freeShippingGroup.style.display = 'none';

        for (const [key, value] of Object.entries(subscriptionValues['Torreón'])) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            subscription.appendChild(option);
        }
    } else if (location === 'Resto de México') {
        weightGroup.style.display = 'none';
        shippingGroup.style.display = 'none'; 
        freeShippingGroup.style.display = 'none';

        for (const [key, value] of Object.entries(subscriptionValues['Resto de México'])) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            subscription.appendChild(option);
        }
    }
    
    calculateCost();
}

// Actualizar los campos según la suscripción y ubicación seleccionadas
function updateFields() {
    const subscriptionType = document.getElementById('subscription').value;
    const location = document.getElementById('location').value;
    const weightGroup = document.getElementById('weight-group');
    const shippingGroup = document.getElementById('shipping-group');
    const freeShippingGroup = document.getElementById('free-shipping-group');
    const shippingCostText = document.querySelector('#shippingCost ~ .text:last-of-type'); // Selecciona el texto de "por costo de envío a tu ciudad"

    // Ocultar el texto por defecto
    shippingCostText.style.display = 'none';

    // Configurar la visibilidad y el texto según la ubicación y la suscripción
    if (location === 'Torreón') {
        if (subscriptionType === 'Supreme') {
            weightGroup.style.display = 'none';
            freeShippingGroup.style.display = 'block';
        } else {
            weightGroup.style.display = 'block';
            freeShippingGroup.style.display = 'none';
        }
    } else if (location === 'Resto de México') {
        weightGroup.style.display = 'none';
        shippingGroup.style.display = 'none';
        freeShippingGroup.style.display = 'none';
        
        // Mostrar el texto solo si la ubicación es "Resto de México"
        shippingCostText.style.display = 'inline';

        // Modificar el texto según el tipo de suscripción
        if (subscriptionType === 'Básica' || subscriptionType === 'Plus') {
            shippingCostText.textContent = 'por costo de envío a tu ciudad, hasta 5 kg';
        } else if (subscriptionType === 'Premium') {
            shippingCostText.textContent = 'por costo de envío a tu ciudad, hasta 10 kg';
        } else if (subscriptionType === 'Supreme') {
            shippingCostText.textContent = 'por costo de envío a tu ciudad, hasta 30 kg';
        } else {
            shippingCostText.textContent = 'por costo de envío a tu ciudad'; // Si no hay suscripción seleccionada
        }
    }

    // Actualizar los cálculos inmediatamente con los datos disponibles
    calculateCost();
}

// Calcular el costo de la orden y del envío
function calculateCost() {
    const price = parseFloat(document.getElementById('price').value) || 0;
    const subscriptionType = document.getElementById('subscription').value;
    const location = document.getElementById('location').value;
    
    let subscriptionMultiplier = 1;
    let weight = parseFloat(document.getElementById('weight').value) || 0;
    let shippingCost = 0;

    if (location && subscriptionValues[location] && subscriptionValues[location][subscriptionType]) {
        subscriptionMultiplier = subscriptionValues[location][subscriptionType];
    }
    
    const orderCost = price * subscriptionMultiplier;

    if (location === 'Torreón') {
        if (subscriptionType === 'Supreme') {
            shippingCost = 0;
        } else {
            shippingCost = weight * 20;
        }
    } else if (location === 'Resto de México') {
        shippingCost = shippingCosts[subscriptionType] || 0;
    }

    const totalCost = orderCost + shippingCost;

    // Actualizar los valores en la interfaz
    document.getElementById('orderCost').textContent = `$${orderCost.toFixed(2)}`;
    document.getElementById('shippingCost').textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
}
