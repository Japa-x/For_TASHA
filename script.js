// Configuração das fotos
const fotos = [
    {
        src: 'fotos/foto1.png',
        alt: 'Nosso primeiro encontro',
        message: 'O dia em que tudo começou... 💕'
    },
    {
        src: 'fotos/foto1.png',
        alt: 'Nossa viagem juntos',
        message: 'Cada lugar é especial com você 🌎'
    },
    {
        src: 'fotos/foto1.png',
        alt: 'Momento especial',
        message: 'Seu sorriso ilumina meu dia ✨'
    }
];

// Configuração dos vales
const vouchers = {
    pizza: {
        titulo: 'Noite de Pizza',
        descricao: 'Uma noite especial com suas pizzas favoritas, do jeitinho que você gosta!',
        icone: '🍕',
        cor: '#C9A87C'
    },
    passeio: {
        titulo: 'Passeio Especial',
        descricao: 'Um passeio ao lugar que você escolher - praia, parque, montanha ou onde seu coração desejar!',
        icone: '🌅',
        cor: '#A0845C'
    },
    massagem: {
        titulo: 'Vale Massagem',
        descricao: 'Uma massagem relaxante completa só para você. Prometo fazer com todo carinho!',
        icone: '💆‍♀️',
        cor: '#8B6F47'
    },
    cinema: {
        titulo: 'Vale Cinema',
        descricao: 'Sessão de cinema com direito a filme escolhido por você, pipoca e muita companhia!',
        icone: '🎬',
        cor: '#6B4F2E'
    }
};

// Data do início do relacionamento: 13 de abril de 2025
const dataInicio = new Date('2025-04-13');

// Controle de música
let musicaTocando = false;

function toggleMusica() {
    const audio = document.getElementById('bgMusic');
    const button = document.getElementById('musicControl');
    
    if (musicaTocando) {
        audio.pause();
        button.classList.remove('playing');
        musicaTocando = false;
    } else {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                button.classList.add('playing');
                musicaTocando = true;
            }).catch(error => {
                console.log('Reprodução automática bloqueada. Clique no botão de música.');
                button.style.animation = 'musicPulse 2s ease 3';
                setTimeout(() => {
                    button.style.animation = '';
                }, 6000);
            });
        }
    }
}

// Função para criar galeria de fotos
function criarGaleria() {
    const photoGrid = document.getElementById('photoGrid');
    
    fotos.forEach((foto, index) => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.innerHTML = `
            <img src="${foto.src}" alt="${foto.alt}" class="photo-image">
            <div class="photo-overlay">
                <p class="photo-message">${foto.message}</p>
            </div>
        `;
        
        photoCard.addEventListener('click', () => abrirModal(foto));
        
        photoGrid.appendChild(photoCard);
    });
}

// Função para abrir modal com foto
function abrirModal(foto) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalMessage = document.getElementById('modalMessage');
    
    modalImage.src = foto.src;
    modalImage.alt = foto.alt;
    modalMessage.textContent = foto.message;
    
    modal.classList.add('active');
}

// Função para fechar modal de foto
function fecharModal() {
    const modal = document.getElementById('photoModal');
    modal.classList.remove('active');
}

// Função para gerar voucher
function gerarVoucher(tipo) {
    const voucher = vouchers[tipo];
    const modal = document.getElementById('voucherModal');
    
    // Preencher dados do comprovante
    document.getElementById('voucherIcon').textContent = voucher.icone;
    document.getElementById('voucherTitle').textContent = voucher.titulo;
    document.getElementById('voucherDescription').textContent = voucher.descricao;
    
    // Gerar código único
    const codigo = gerarCodigoVoucher();
    document.getElementById('voucherCode').textContent = codigo;
    
    // Aplicar cor temática
    const comprovante = document.getElementById('comprovante');
    comprovante.style.borderColor = voucher.cor;
    
    // Mostrar modal
    modal.classList.add('active');
    
    // Scroll para o topo do modal em dispositivos móveis
    setTimeout(() => {
        const modalContent = document.getElementById('voucherModalContent');
        if (modalContent && window.innerWidth <= 768) {
            modalContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 200);
    
    // Efeito de celebração
    criarParticulasCelebracao();
}

// Função para gerar código único do voucher
function gerarCodigoVoucher() {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');
    const aleatorio = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `VALE-${ano}${mes}${dia}-${hora}${minuto}-${aleatorio}`;
}

// Função para criar partículas de celebração
function criarParticulasCelebracao() {
    const emojis = ['✨', '💕', '🎉', '💖', '🌟', '💝'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particula = document.createElement('span');
            particula.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particula.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 60 + 20}%;
                z-index: 9999;
                pointer-events: none;
                animation: celebrar ${Math.random() * 1 + 0.5}s ease forwards;
            `;
            document.body.appendChild(particula);
            
            setTimeout(() => particula.remove(), 1500);
        }, i * 50);
    }
}

// Adicionar animação de celebração
if (!document.getElementById('celebration-style')) {
    const style = document.createElement('style');
    style.id = 'celebration-style';
    style.textContent = `
        @keyframes celebrar {
            0% {
                opacity: 1;
                transform: translateY(0) scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: translateY(-50px) scale(1.5) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(2) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Função para fechar modal do voucher
function fecharVoucherModal() {
    const modal = document.getElementById('voucherModal');
    modal.classList.remove('active');
}

// Função para salvar comprovante como imagem
async function salvarComprovanteImagem() {
    const comprovante = document.getElementById('comprovante');
    const modalContent = document.getElementById('voucherModalContent');
    const button = document.querySelector('.print-button');
    
    // Mostrar feedback de carregamento
    const textoOriginal = button.innerHTML;
    button.innerHTML = '⏳ Gerando imagem...';
    button.disabled = true;
    
    try {
        // Configurações para melhor qualidade
        const canvas = await html2canvas(comprovante, {
            scale: 2, // Melhor qualidade (2x)
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#FFFDF9',
            windowWidth: comprovante.scrollWidth,
            windowHeight: comprovante.scrollHeight
        });
        
        // Converter canvas para blob
        canvas.toBlob(async (blob) => {
            if (!blob) {
                throw new Error('Não foi possível gerar a imagem');
            }
            
            // Criar nome do arquivo
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            const nomeArquivo = `vale-presente-${timestamp}.png`;
            
            // Verificar se o navegador suporta compartilhamento (mobile)
            if (navigator.share && navigator.canShare) {
                const file = new File([blob], nomeArquivo, { type: 'image/png' });
                
                if (navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: 'Vale Presente',
                            text: 'Meu vale presente especial! 💕'
                        });
                        
                        // Feedback de sucesso
                        button.innerHTML = '✅ Salvo com sucesso!';
                        button.style.background = '#4CAF50';
                    } catch (shareError) {
                        // Se o usuário cancelar o compartilhamento, faz download direto
                        if (shareError.name !== 'AbortError') {
                            downloadImagem(canvas, nomeArquivo);
                        }
                    }
                } else {
                    // Se não pode compartilhar, faz download
                    downloadImagem(canvas, nomeArquivo);
                }
            } else {
                // Desktop ou navegador sem suporte a compartilhamento
                downloadImagem(canvas, nomeArquivo);
            }
            
            // Restaurar botão após 2 segundos
            setTimeout(() => {
                button.innerHTML = textoOriginal;
                button.disabled = false;
                button.style.background = '';
            }, 2000);
            
        }, 'image/png', 1.0);
        
    } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        button.innerHTML = '❌ Erro! Tente novamente';
        button.style.background = '#f44336';
        
        setTimeout(() => {
            button.innerHTML = textoOriginal;
            button.disabled = false;
            button.style.background = '';
        }, 2000);
    }
}

// Função auxiliar para download da imagem
function downloadImagem(canvas, nomeArquivo) {
    // Criar link de download
    const link = document.createElement('a');
    link.download = nomeArquivo;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    
    // Feedback visual
    const button = document.querySelector('.print-button');
    button.innerHTML = '✅ Imagem salva!';
    button.style.background = '#4CAF50';
}

// Função para criar corações caindo
function criarCoracoes() {
    const container = document.getElementById('heartsContainer');
    const emojis = ['💕', '💖', '💗', '💝', '✨', '💑', '🌟', '🍂', '☕'];
    
    setInterval(() => {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 2000);
}

// Função para atualizar contador
function atualizarContador() {
    function update() {
        const agora = new Date();
        const diferenca = agora - dataInicio;
        
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = dias;
        document.getElementById('hours').textContent = horas;
        document.getElementById('minutes').textContent = minutos;
        document.getElementById('seconds').textContent = segundos;
    }
    
    update();
    setInterval(update, 1000);
}

// Função para revelar mensagem surpresa (agora com os vales)
function revelarMensagem() {
    const hiddenMessage = document.getElementById('hiddenMessage');
    const button = document.getElementById('revealButton');
    
    if (hiddenMessage.classList.contains('active')) {
        hiddenMessage.classList.remove('active');
        button.innerHTML = '✨ Revele uma surpresa ✨';
        button.style.background = 'linear-gradient(135deg, var(--primary), var(--gold))';
    } else {
        hiddenMessage.classList.add('active');
        button.innerHTML = '💝 Ocultar surpresa 💝';
        button.style.background = 'linear-gradient(135deg, var(--primary-dark), var(--primary))';
        
        // Scroll suave até os vales
        setTimeout(() => {
            hiddenMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

// Configurar botão do Spotify
function configurarSpotify() {
    const spotifyButton = document.getElementById('spotifyButton');
    const spotifyPlaylistUrl = 'https://open.spotify.com/playlist/0IKFNIIHHVow618BF4dkSz?si=LuRJo4IYSyKP7c3uS-6RaA&pi=CXQiIQynReeL0';
    
    spotifyButton.href = spotifyPlaylistUrl;
}

// Função para animações de entrada
function animacoesEntrada() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.photo-card, .voucher-card, .spotify-card, .love-letter, .counter-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Event Listeners
document.getElementById('modalClose').addEventListener('click', fecharModal);
document.getElementById('photoModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        fecharModal();
    }
});

document.getElementById('revealButton').addEventListener('click', revelarMensagem);
document.getElementById('musicControl').addEventListener('click', toggleMusica);

// Fechar voucher modal clicando fora
document.getElementById('voucherModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        fecharVoucherModal();
    }
});

// Fechar modais com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fecharModal();
        fecharVoucherModal();
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    criarGaleria();
    criarCoracoes();
    atualizarContador();
    configurarSpotify();
    animacoesEntrada();
    
    // Tentar tocar música automaticamente
    setTimeout(() => {
        toggleMusica();
    }, 1000);
});

// Permitir iniciar música com clique em qualquer lugar
document.addEventListener('click', function iniciarMusicaUmaVez() {
    if (!musicaTocando) {
        toggleMusica();
    }
}, { once: true });