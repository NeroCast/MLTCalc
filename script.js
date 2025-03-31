// Valores de suscripción
const subscriptionValues = {
    '3 Meses': 0.25,
    '6 Meses': 0.22,
    '12 Meses': 0.20
};

// Costos de envío
const shippingCosts = {
    '3 Meses': 300,
    '6 Meses': 300,
    '12 Meses': 300
};

// Cargar opciones de suscripción al cargar la página
function loadSubscriptionOptions() {
    const subscription = document.getElementById('subscription');

    for (const [key, value] of Object.entries(subscriptionValues)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        subscription.appendChild(option);
    }
}

// Actualizar campos según la suscripción seleccionada
function updateFields() {
    calculateCost();
}

// Calcular el costo de la orden y del envío
function calculateCost() {
    const price = parseFloat(document.getElementById('price').value) || 0;
    const subscriptionType = document.getElementById('subscription').value;

    let subscriptionMultiplier = 1;
    let shippingCost = 0;

    if (subscriptionValues[subscriptionType]) {
        subscriptionMultiplier = subscriptionValues[subscriptionType];
    }

    const orderCost = price * subscriptionMultiplier;
    shippingCost = shippingCosts[subscriptionType] || 0;

    // Actualizar los valores en la interfaz
    document.getElementById('orderCost').textContent = `$${orderCost.toFixed(2)}`;
    document.getElementById('shippingCost').textContent = `$${shippingCost.toFixed(2)}`;
}

// Cargar opciones de suscripción al inicio
document.addEventListener('DOMContentLoaded', loadSubscriptionOptions);
