/**
 * Efeitos Visuais para o Sistema Bottle
 * 
 * Inclui:
 * - Animação de carregamento suave
 * - Efeito de hover em botões/tabelas
 * - Feedback visual para formulários
 * - Botão de scroll para topo
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Efeito de fade-in ao carregar a página
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    // 2. Efeito de hover para linhas da tabela
    const tableRows = document.querySelectorAll('tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.transform = 'scale(1.01)';
            row.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            row.style.transition = 'all 0.3s ease';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.transform = 'scale(1)';
            row.style.boxShadow = 'none';
        });
    });

    // 3. Efeito para botões
    const buttons = document.querySelectorAll('button, .btn, a[href]');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
            btn.style.transition = 'all 0.2s ease';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // 4. Feedback visual para formulários
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            input.parentElement.style.transition = 'all 0.2s ease';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });

    // 5. Botão de scroll para topo (aparece ao rolar)
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.backgroundColor = '#3498db';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.width = '40px';
    scrollToTopBtn.style.height = '40px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.display = 'flex';
    scrollToTopBtn.style.justifyContent = 'center';
    scrollToTopBtn.style.alignItems = 'center';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.transition = 'opacity 0.3s';
    scrollToTopBtn.style.zIndex = '1000';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });

    // 6. Efeito de confirmação personalizado para ações
    window.customConfirm = function(message, callback) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '2000';

        const modal = document.createElement('div');
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '8px';
        modal.style.maxWidth = '400px';
        modal.style.textAlign = 'center';
        modal.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';

        modal.innerHTML = `
            <p style="margin-bottom: 20px; font-size: 16px;">${message}</p>
            <div style="display: flex; justify-content: center; gap: 10px;">
                <button id="confirm-yes" style="padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 4px;">Sim</button>
                <button id="confirm-no" style="padding: 8px 16px; background: #e74c3c; color: white; border: none; border-radius: 4px;">Não</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById('confirm-yes').addEventListener('click', () => {
            callback(true);
            document.body.removeChild(overlay);
        });

        document.getElementById('confirm-no').addEventListener('click', () => {
            callback(false);
            document.body.removeChild(overlay);
        });
    };

    // Substitui os confirms padrão
    document.querySelectorAll('[onsubmit*="confirm"]').forEach(form => {
        form.onsubmit = function(e) {
            e.preventDefault();
            const message = this.getAttribute('data-confirm-message') || 'Tem certeza que deseja continuar?';
            window.customConfirm(message, (confirmed) => {
                if (confirmed) this.submit();
            });
        };
    });
});
