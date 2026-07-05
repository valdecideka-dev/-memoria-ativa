// Memória Ativa - Frontend Application

const API_BASE = '/api';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  console.log('Memória Ativa app loaded');
  loadMemories();
});

// Load memories from API
async function loadMemories() {
  try {
    const response = await fetch(`${API_BASE}/memorias`);
    const data = await response.json();
    console.log('Memórias carregadas:', data);
    renderMemories(data);
  } catch (error) {
    console.error('Erro ao carregar memórias:', error);
  }
}

// Render memories in the DOM
function renderMemories(memories) {
  const container = document.getElementById('memories-container');
  if (!container) return;
  
  container.innerHTML = memories.map(memory => `
    <div class="memory-card">
      <h3>${memory.title}</h3>
      <p>${memory.content}</p>
      <small>${new Date(memory.created_at).toLocaleDateString('pt-BR')}</small>
    </div>
  `).join('');
}
