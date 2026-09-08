import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import { Heart, X } from 'lucide-react';
import './App.css';

interface Cat {
  id: string;
  url: string;
  name: string;
}

const INITIAL_CATS: Cat[] = [
  {
    id: '1',
    name: 'Frajola',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'Mingau',
    url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'Simba',
    url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    name: 'Luna',
    url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    name: 'Garfield',
    url: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '6',
    name: 'Mel',
    url: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '7',
    name: 'Nina',
    url: 'https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '8',
    name: 'Tom',
    url: 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '9',
    name: 'Chico',
    url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '10',
    name: 'Salem',
    url: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '11',
    name: 'Bidu',
    url: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '12',
    name: 'Nala',
    url: 'https://images.unsplash.com/photo-1491485880301-ff12e4f6b28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

function App() {
  const [cats, setCats] = useState<Cat[]>(INITIAL_CATS);
  const [newCatUrl, setNewCatUrl] = useState('');
  const [newCatName, setNewCatName] = useState('');

  const swiped = (direction: string, nameToDelete: string) => {
    console.log(`Você arrastou o ${nameToDelete} para a ${direction}`);
  };

  const outOfFrame = (idToRemove: string) => {
    console.log(`Card removido da tela!`);
    // Remove the cat from the state array so the deck shrinks
    setCats((prev) => prev.filter(cat => cat.id !== idToRemove));
  };

  const handleAddCat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatUrl || !newCatName) return;

    const newCat: Cat = {
      id: Date.now().toString(),
      name: newCatName,
      url: newCatUrl
    };

    setCats((prev) => [...prev, newCat]);
    setNewCatUrl('');
    setNewCatName('');
  };

  return (
    <div className="app-container">
      <header>
        <h1>😻 Purrfect Match</h1>
      </header>

      <div className="card-container">
        {cats.map((cat) => (
          <TinderCard
            className="swipe"
            key={cat.id}
            onSwipe={(dir) => swiped(dir, cat.name)}
            onCardLeftScreen={() => outOfFrame(cat.id)}
            preventSwipe={['up', 'down']} 
          >
            <div
              style={{ backgroundImage: `url(${cat.url})` }}
              className="card"
            >
              <h3>{cat.name}</h3>
            </div>
          </TinderCard>
        ))}
        {cats.length === 0 && (
          <p className="empty-message">Acabaram os gatinhos! Adicione mais.</p>
        )}
      </div>

      <div className="buttons">
        <button className="btn-nope"><X size={32} color="#ff5a5f" /></button>
        {/* Fixed invalid hex code below */}
        <button className="btn-like"><Heart size={32} color="#4ec9a0" /></button> 
      </div>

      <form className="add-cat-form" onSubmit={handleAddCat}>
        <h3>Adicione seu Gatinho</h3>
        <input
          type="text"
          placeholder="Nome do gato"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
        />
        <input
          type="url"
          placeholder="URL da imagem (Ex: https://...)"
          value={newCatUrl}
          onChange={(e) => setNewCatUrl(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default App;