document.addEventListener('DOMContentLoaded', () => {
  
    const musicPlayer = document.getElementById('bg-music');
    const musicButton = document.getElementById('music-toggle');
    let isPlaying = false;

    musicButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        isPlaying ? musicPlayer.play() : musicPlayer.pause();
        musicButton.textContent = isPlaying ? '🎵' : '🔇';
    });


    const startDate = new Date('2024-09-18T05:00:00.000Z');
    const timeUnits = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    function updateTime() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timeUnits.days.textContent = days;
        timeUnits.hours.textContent = hours.toString().padStart(2, '0');
        timeUnits.minutes.textContent = minutes.toString().padStart(2, '0');
        timeUnits.seconds.textContent = seconds.toString().padStart(2, '0');
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Configuración de la galería
    lightGallery(document.querySelector('.photo-grid'), {
        selector: '.gallery-item',
        download: false,
        zoom: true
    });

    // Efectos de confeti
    const confettiSettings = {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff99cc', '#ffd700']
    };

    // Confeti al cargar
    confetti.create(undefined, { resize: true })(confettiSettings);

    // Control de cartas
    // ... existing code ...

// Control de cartas
window.toggleLetter = (type) => {
  const existingModal = document.getElementById('letter-modal-container');
  if (existingModal) existingModal.remove();

  const modalContainer = document.createElement('div');
  modalContainer.id = 'letter-modal-container';
  document.body.appendChild(modalContainer);
  
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal()"></div>
    <div class="letter-modal active">
      <div class="close-btn" onclick="closeModal()">×</div>
      <div class="vintage-paper">
        ${document.getElementById(`${type}-letter`).innerHTML}
      </div>
    </div>
  `;

  // Bloquear scroll de fondo
  document.body.style.overflow = 'hidden';
  confetti({...confettiSettings, particleCount: 150});
};

window.closeModal = () => {
  const modal = document.getElementById('letter-modal-container');
  if (modal) {
    modal.querySelector('.letter-modal').classList.remove('active');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = 'auto';
    }, 300);
  }
};
});
