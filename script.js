let totalOutfitPrice = 0;
let lastClickCoords = { x: 0, y: 0 };

const photoContainer = document.getElementById('photoContainer');
const tagModal = document.getElementById('tagModal');
const userPhoto = document.getElementById('userPhoto');
const imageUpload = document.getElementById('imageUpload');
const tagsOverlay = document.getElementById('tagsOverlay');
const totalDisplay = document.getElementById('totalDisplay');

// 1. Lógica para CARGAR IMAGEN desde Cámara o Galería
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            userPhoto.src = event.target.result;
            // Limpiar datos al subir nueva foto
            tagsOverlay.innerHTML = "";
            totalOutfitPrice = 0;
            updateTotal();
        };
        reader.readAsDataURL(file);
    }
});

// 2. Lógica para ETIQUETAR (Clic en foto)
photoContainer.addEventListener('click', (e) => {
    // Si el clic fue en la imagen
    const rect = photoContainer.getBoundingClientRect();
    lastClickCoords.x = ((e.clientX - rect.left) / rect.width) * 100;
    lastClickCoords.y = ((e.clientY - rect.top) / rect.height) * 100;

    // Posicionar modal
    tagModal.style.left = `${Math.min(e.clientX, window.innerWidth - 300)}px`;
    tagModal.style.top = `${Math.min(e.clientY, window.innerHeight - 250)}px`;
    tagModal.classList.remove('hidden');
    
    document.getElementById('itemName').focus();
});

// 3. Lógica para GUARDAR ETIQUETA
function saveTag() {
    const nameInput = document.getElementById('itemName');
    const priceInput = document.getElementById('itemPrice');
    
    const name = nameInput.value;
    const price = parseFloat(priceInput.value) || 0;

    if (name && price >= 0) {
        const tag = document.createElement('div');
        tag.className = "tag-label";
        tag.style.left = `${lastClickCoords.x}%`;
        tag.style.top = `${lastClickCoords.y}%`;
        
        tag.innerHTML = `
            <p class="font-bold uppercase tracking-tighter text-white">${name}</p>
            <p class="gold-text font-bold">$${price.toLocaleString()}</p>
        `;
        
        tagsOverlay.appendChild(tag);
        
        // Actualizar total
        totalOutfitPrice += price;
        updateTotal();

        // Cerrar y limpiar
        nameInput.value = "";
        priceInput.value = "";
        tagModal.classList.add('hidden');
    }
}

function updateTotal() {
    totalDisplay.innerHTML = `$${totalOutfitPrice.toLocaleString()} <span class="text-sm opacity-50 font-sans">USD</span>`;
}

// Cerrar modal con Escape
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") tagModal.classList.add('hidden');
});
