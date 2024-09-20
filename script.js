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
}

function updateFields() {
    const subscriptionType = document.getElementById('subscription').value;
    const location = document.getElementById('location').value;
    const weightGroup = document.getElementById('weight-group');
    const shippingGroup = document.getElementById('shipping-group');
    const freeShippingGroup = document.getElementById('free-shipping-group');

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

    calculateCost();
}

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

    const totalCost = orderCost;

    document.getElementById('orderCost').textContent = `$${orderCost.toFixed(2)}`;
    document.getElementById('shippingCost').textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
}
