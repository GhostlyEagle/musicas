import React, { useState } from 'react';
import './App.css';

function PlaylistApp() {
  // State variables
  const [playlist, setPlaylist] = useState([]);
  const [novaEntrada, setNovaEntrada] = useState('');
  const [emEdicao, setEmEdicao] = useState(null);
  const [entradaEditada, setEntradaEditada] = useState('');
  const [notificacao, setNotificacao] = useState('');

  // Add a song to the playlist
  const adicionarNaPlaylist = () => {
    if (novaEntrada.trim()) {
      setPlaylist([...playlist, novaEntrada]);
      setNovaEntrada('');
      mostrarNotificacao(`🎶 "${novaEntrada}" foi adicionada!`);
    } else {
      mostrarNotificacao("⚠️ O campo não pode estar vazio!");
    }
  };

  // Remove a song from the playlist
  const removerDaPlaylist = (index) => {
    const tituloRemovido = playlist[index];
    const novaPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(novaPlaylist);
    mostrarNotificacao(`❌ "${tituloRemovido}" foi removida.`);
  };

  // Start editing a song
  const iniciarEdicao = (index) => {
    setEmEdicao(index);
    setEntradaEditada(playlist[index]);
  };

  // Save edited song
  const salvarEdicao = () => {
    if (entradaEditada.trim()) {
      const novaPlaylist = [...playlist];
      novaPlaylist[emEdicao] = entradaEditada;
      setPlaylist(novaPlaylist);
      setEmEdicao(null);
      setEntradaEditada('');
      mostrarNotificacao(`✔️ Música atualizada para "${entradaEditada}"`);
    } else {
      mostrarNotificacao("⚠️ O nome não pode estar vazio!");
    }
  };

  // Display temporary notifications
  const mostrarNotificacao = (mensagem) => {
    setNotificacao(mensagem);
    setTimeout(() => {
      setNotificacao('');
    }, 3000);
  };

  return (
    <div className="PlaylistApp">
      <nav className="navbar">
        <div className="navbar-logo">🌌 SPNV PLAYLIST</div>
      </nav>
      <header className="App-header">
        <h1> Baile Papai 🛸👋</h1>
      </header>
      <div className="entrada-form">
        <input
          type="text"
          value={novaEntrada}
          onChange={(e) => setNovaEntrada(e.target.value)}
          placeholder="Digite o título de uma música"
        />
        <button onClick={adicionarNaPlaylist}>Adicionar</button>
      </div>
      {notificacao && <div className="notificacao">{notificacao}</div>}
      <ul className="lista-playlist">
        {playlist.map((musica, index) => (
          <li key={index}>
            <div className="musica-item">
              {emEdicao === index ? (
                <>
                  <input
                    type="text"
                    value={entradaEditada}
                    onChange={(e) => setEntradaEditada(e.target.value)}
                    placeholder="Novo título"
                  />
                  <button onClick={salvarEdicao}>Salvar</button>
                </>
              ) : (
                <>
                  <span className="musica-titulo">{musica}</span>
                  <div className="acoes">
                    <button onClick={() => iniciarEdicao(index)}>Editar</button>
                    <button onClick={() => removerDaPlaylist(index)}>Remover</button>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <footer className="footer">
        <p>&copy; 2024 Sua Playlist. Todos os direitos reservados.</p>
        <p>Bhraian Ribeiro Marques | Matrícula: 23214290081</p>
      </footer>
    </div>
  );
}

export default PlaylistApp;
