const pet = {
    hunger: 100,
    happy: 100,
    energy: 100,
    sleeping: false,
    emojis: ['🐸','🐼','🦒','🐯','🐷'],
    currentEmoji: 0,
}

function selectAnimal() {
    pet.currentEmoji = (pet.currentEmoji + 1) % pet.emojis.length; // Permet de remettre la constiable à zéro sans devoir 
    document.getElementById('pet').textContent = pet.emojis[pet.currentEmoji];
}

updateStats(pet);

document.getElementById('pet').onclick = selectAnimal;

function updateStats(pet) {
    document.getElementById('hunger').textContent = pet.hunger;
    document.getElementById('happy').textContent = pet.happy;
    document.getElementById('energy').textContent = pet.energy;
}

function showMsg(msg) {
    document.getElementById('msg').textContent = msg  
}

let lifeInterval;
function lifeGestion(pet) {
    lifeInterval = setInterval(() => {
        if (!pet.sleeping) {
            pet.hunger = Math.max(0, pet.hunger - 5);
            pet.happy = Math.max(0, pet.happy - 5);
            pet.energy = Math.max(0, pet.energy - 5);
            updateStats(pet);
            
            if (pet.happy===0 && pet.hunger===0 && pet.energy===0){
                dead();
                clearInterval(lifeInterval);   
            } else if (pet.hunger < 20) {
                showMsg('J\'ai la daaaaalle ! 😫 ');
            } else if (pet.happy < 20) {
                showMsg("Je m'ennuie, viens jouer avec moi ! 😢");
            } else if (pet.energy < 20) {
                showMsg('Je suis super fatigué, je veux dormir ! 😴');
            }

            
        }
    }, 5000);
    
}

function dead(){
    document.getElementById('pet').textContent = '💀';
    showMsg('Je suis mort. RIP me ⚰');
    createFireworkConfetti();
}

function feeding() {
    if (pet.sleeping){
        showMsg('Laisse-moi tranquille, je dors!') // fonction déterminée pour éviter de répéter l'action d'insérer du contenu dans l'html.
        return;
    }

    document.getElementById('pet').classList.add('jump');

    setTimeout(
        () => document.getElementById('pet').classList.remove('jump'),
        500
    );

    pet.hunger = Math.min(100, pet.hunger + 30);
    pet.energy = Math.max(0, pet.energy - 10);

    showMsg('Yum Yum! 🤤');
    updateStats(pet);  
}

function playing() {
    if (pet.sleeping) {
      showMsg('Laisse-moi tranquille, je dors!');
      return;
    }
  
    if (pet.energy < 30) {
      showMsg('Je suis trop fatigué ! 😪');
      return;
    }
  
    document.getElementById('pet').classList.add('shake');

    setTimeout(
      () => document.getElementById('pet').classList.remove('shake'),
      500
    );
  
    pet.happy = Math.min(100, pet.happy + 30);
    pet.energy = Math.max(0, pet.energy - 20);
    pet.hunger = Math.max(0, pet.hunger - 20);

    showMsg("Joue encore avec moi 🤩");
    updateStats(pet);
}

function makeTheAnimalSleep() {
    document.getElementById('sleep-button').disabled = true;
    pet.sleeping = true;
    document.getElementById('pet').style.transform = 'rotate(180deg)';
    pet.energy = Math.min(100, pet.energy + 50);
    updateStats(pet);
  
    setTimeout(() => {
      document.getElementById('sleep-button').disabled = false;
      pet.sleeping = false;
      document.getElementById('pet').style.transform = 'rotate(0deg)';
      showMsg('Je suis réveillé ! 🌞');
      updateStats(pet);
    }, 5000);
}

lifeGestion(pet);

window.feeding = feeding;
window.playing = playing;
window.makeTheAnimalSleep = makeTheAnimalSleep;



function createFireworkConfetti() {
    const container = document.getElementById('confetti');
    const skullEmojis = ['💀', '☠️'];
    const fireworkCount = 10; // Nombre de points de départ des fireworks

    for (let i = 0; i < fireworkCount; i++) {
        // Position de départ du firework
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        // Créer un point central de départ
        const centerConfetti = document.createElement('div');
        centerConfetti.textContent = '';
        centerConfetti.style.position = 'absolute';
        centerConfetti.style.left = `${startX}px`;
        centerConfetti.style.top = `${startY}px`;
        container.appendChild(centerConfetti);

        // Créer les confettis qui explosent
        const confettiCount = 100; // Nombre de confettis par firework
        for (let j = 0; j < confettiCount; j++) {
            const confetti = document.createElement('div');
            
            // Choisir un emoji tête de mort aléatoirement
            confetti.textContent = skullEmojis[Math.floor(Math.random() * skullEmojis.length)];
            
            // Position de départ
            confetti.style.position = 'absolute';
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            
            // Calculer la direction de propagation
            const angle = (j / confettiCount) * Math.PI * 2;
            const radius = Math.random() * 200 + 100; // Distance de propagation
            
            confetti.style.setProperty('--spread-x', `${Math.cos(angle) * radius}px`);
            confetti.style.setProperty('--spread-y', `${Math.sin(angle) * radius}px`);
            
            // Animation
            confetti.style.animation = `firework-spread ${Math.random() * 2 + 1}s ease-out forwards`;
            
            container.appendChild(confetti);

            // Nettoyer après l'animation
            confetti.addEventListener('animationend', () => {
                confetti.remove();
                if (container.children.length === 0) {
                    centerConfetti.remove();
                }
            });
        }
    }
}

