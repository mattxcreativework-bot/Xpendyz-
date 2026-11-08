// Navegação entre abas
function switchTab(tabId) {
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.style.display = 'none';
    });
    const target = document.getElementById(tabId);
    if(target) target.style.display = 'block';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event && event.currentTarget && event.currentTarget.classList.add('active');
    
    // Atualiza título da Topbar
    const titles = {
        'workspace': 'Personal Workspace',
        'projects': 'Meus Projetos',
        'assistant': 'AI Assistant',
        'plans': 'Planos & Assinaturas',
        'account': 'Minha Conta',
        'editor': 'Editor de Código',
        'settings': 'Configurações e Privacidade'
    };
    document.getElementById('topbarTitle').innerText = titles[tabId] || 'Workspace';
    
    if(tabId === 'projects') loadProjects();
}

// Criar Novo Projeto (Vai pro Editor)
function createNewProject() {
    switchTab('editor');
    document.getElementById('projectTitleInput').value = "Meu Novo Projeto.js";
    document.getElementById('codeEditor').value = "// Escreva seu código incrível aqui...\nconsole.log('Olá, Xpendyz!');";
}

// Salvar Projeto no LocalStorage
function saveProjectToStorage() {
    const title = document.getElementById('projectTitleInput').value || "Projeto Sem Título";
    const code = document.getElementById('codeEditor').value;
    
    let projects = JSON.parse(localStorage.getItem('xpendyz_projects') || '[]');
    projects.push({ title, code, date: new Date().toLocaleDateString() });
    localStorage.setItem('xpendyz_projects', JSON.stringify(projects));
    
    alert('✨ Projeto salvo com sucesso no seu navegador!');
    switchTab('projects');
}

// Carregar Projetos
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    let projects = JSON.parse(localStorage.getItem('xpendyz_projects') || '[]');
    
    if(projects.length === 0) {
        grid.innerHTML = '<p class="subtle">Nenhum projeto salvo ainda. Vá no Editor e crie o seu primeiro!</p>';
        return;
    }
    
    grid.innerHTML = projects.map(p => `
        <div class="project-card">
            <h4>📁 ${p.title}</h4>
            <span class="subtle" style="font-size:11px; margin:0;">Salvo em: ${p.date}</span>
            <pre style="background:#080d17; padding:8px; border-radius:6px; font-size:11px; max-height:80px; overflow:hidden;"><code>${p.code}</code></pre>
        </div>
    `).join('');
}

// Simular Chat com a IA
function sendAiMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    if(!input.value.trim()) return;
    
    messages.innerHTML += `<div class="message user">${input.value}</div>`;
    const userText = input.value;
    input.value = '';
    
    setTimeout(() => {
        messages.innerHTML += `<div class="message ai">Análise concluída para "${userText}": O Xpendyz Studio sugere estruturar sua lógica em módulos otimizados para melhor performance! 🚀</div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 800);
}

// Salvar Conta
function saveAccount() {
    const name = document.getElementById('inputName').value;
    document.getElementById('userName').innerText = name;
    alert('Configurações de conta salvas com sucesso!');
}

// Simular Upgrade de Plano ($12/mo)
function simulateUpgrade() {
    alert('🎉 Parabéns! Redirecionando para o ambiente de pagamento seguro ($12/mês)...');
}

// Alternar Autenticação (Login/Logout simulado)
function toggleAuth() {
    const status = document.getElementById('userStatus');
    if(status.innerText.includes('Conectado')) {
        status.innerText = 'Modo Convidado';
        document.getElementById('userName').innerText = 'Visitante';
        alert('Você saiu da conta. Seus projetos locais continuam salvos.');
    } else {
        status.innerText = 'Conectado (Local)';
        document.getElementById('userName').innerText = 'Alex Morgan';
        alert('Bem-vindo de volta, Alex!');
    }
}

// Limpar dados locais
function clearLocalStorage() {
    if(confirm('Tem certeza que deseja apagar todos os projetos salvos?')) {
        localStorage.removeItem('xpendyz_projects');
        loadProjects();
        alert('Dados limpos com sucesso.');
    }
}
