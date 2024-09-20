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

const weightLimits = {
    'Básica': 5,
    'Plus': 5,
    'Premium': 10,
    'Supreme': 30
};

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

    calculateCost();  // Llamamos a calculateCost para que los valores se actualicen inmediatamente
}

function updateFields() {
    const subscriptionType = document.getElementById('subscription').value;
    const location = document.getElementById('location').value;
    const weightGroup = document.getElementById('weight-group');
    const shippingGroup = document.getElementById('shipping-group');
    const freeShippingGroup = document.getElementById('free-shipping-group');
    const shippingCostLabel = document.querySelector("#shippingCostLabel span.text");

    if (!shippingCostLabel) return;

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
    }

    // Actualizar el texto de peso límite
    if (subscriptionType) {
        const limit = weightLimits[subscriptionType] || 5;
        shippingCostLabel.textContent = `por costo de envío a tu ciudad, hasta ${limit} kg`;
    }

    calculateCost();
}

function calculateCost() {
    const priceElement = document.getElementById('price');
    const price = parseFloat(priceElement ? priceElement.value : 0) || 0;
    const subscriptionType = document.getElementById('subscription').value;
    const location = document.getElementById('location').value;

    let subscriptionMultiplier = 1;
    let weight = parseFloat(document.getElementById('weight') ? document.getElementById('weight').value : 0) || 0;
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

    // Actualizamos los valores solo si los elementos existen
    const orderCostElement = document.getElementById('orderCost');
    const shippingCostElement = document.getElementById('shippingCost');

    if (orderCostElement) {
        orderCostElement.textContent = `$${orderCost.toFixed(2)}`;
    }

    if (shippingCostElement) {
        shippingCostElement.textContent = `$${shippingCost.toFixed(2)}`;
    }
}

// Escuchar cambios inmediatos en el campo de precio
document.getElementById('price').addEventListener('input', calculateCost);
