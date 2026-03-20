let totalOutfitPrice = 0;
let lastClickCoords = { x: 0, y: 0 };

const photoContainer = document.getElementById('photoContainer');
const tagModal = document.getElementById('tagModal');

// Detectar clic para abrir el modal de etiquetado
photoContainer.addEventListener('click', (e) => {
    const rect = photoContainer.getBoundingClientRect();
    
    // Calcular posición porcentual para que sea responsivo
    lastClickCoords.x = ((e.clientX - rect.left) / rect.width) * 100;
    lastClickCoords.y = ((e.clientY - rect.top) / rect.height) * 100;

    // Posicionar el modal cerca del clic
    tagModal.style.left = `${Math.min(e.clientX, window.innerWidth - 260)}px`;
    tagModal.style.top = `${Math.min(e.clientY, window.innerHeight - 200)}px`;
    tagModal.classList.remove('hidden');
    
    document.getElementById('itemName').focus();
});

// Guardar la etiqueta y actualizar el total
function saveTag() {
    const nameInput = document.getElementById('itemName');
    const priceInput = document.getElementById('itemPrice');
    
    const name = nameInput.value;
    const price = parseFloat(priceInput.value) || 0;

    if (name && price >= 0) {
        // Crear el elemento visual del Tag
        const tag = document.createElement('div');
        tag.className = "tag-label";
        tag.style.left = `${lastClickCoords.x}%`;
        tag.style.top = `${lastClickCoords.y}%`;
        tag.style.transform = "translate(-50%, -50%)"; // Centrar el tag en el clic
        
        tag.innerHTML = `
            <p class="font-bold uppercase tracking-tighter text-white">${name}</p>
            <p class="gold-text font-bold">$${price.toLocaleString()}</p>
        `;
        
        document.getElementById('tagsOverlay').appendChild(tag);
        
        // Sumar al total global
        totalOutfitPrice += price;
        document.getElementById('totalDisplay').innerHTML = `$${totalOutfitPrice.toLocaleString()} <span class="text-sm opacity-50">USD</span>`;

        // Limpiar inputs y cerrar modal
        nameInput.value = "";
        priceInput.value = "";
        tagModal.classList.add('hidden');
    } else {
        alert("Por favor, ingrese un nombre y un precio válido.");
    }
}

// Cerrar modal si se hace clic fuera de él (opcional)
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") tagModal.classList.add('hidden');
});
