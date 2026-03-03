function mineClick(event) {
    if (fuel > 0) {
        balance += 0.01;
        fuel -= 1;
        updateUI();

        // Crear el número flotante (+0.01)
        const clickText = document.createElement('div');
        clickText.innerText = '+0.01';
        clickText.className = 'floating-text';
        
        // Posicionar donde el usuario hizo clic o tocó
        const x = event.clientX || event.touches[0].clientX;
        const y = event.clientY || event.touches[0].clientY;
        
        clickText.style.left = `${x}px`;
        clickText.style.top = `${y}px`;

        document.body.appendChild(clickText);

        // Borrar el elemento después de la animación (1 segundo)
        setTimeout(() => {
            clickText.remove();
        }, 1000);
    }
}
