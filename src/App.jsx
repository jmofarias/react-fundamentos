import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Post } from './components/Post';

import styles from './App.module.css';

import './global.css';

// informações que variam de um post para outro
// author: { avatar_url: "", name: "", role: "" }
// publishedAt: Date
// content: string

// array de objetos que vai possuir as informações que variam dos posts
const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/jmofarias.png',
      name: 'João Marcos',
      role: 'Dev Front-End'
    },
    content: [
      { type: 'paragraph', content: 'Opa, galeraa!',},
      { type: 'paragraph', content: 'Estou subindo esse projetinho no meu portifa.'},
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-04-07 10:46:03'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educador @Rocketseat'
    },
    content: [
      { type: 'paragraph', content: 'Opa, galeraa!',},
      { type: 'paragraph', content: 'Estou subindo esse projetinho no meu portifa.'},
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-04-02 11:26:41'),
  }
];

export function App() {
  return (
    <div>
      <Header/>

      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {/* percorrendo o array de objetos posts que foi criado, usando o map */}
          {posts.map(post => {
            // retornando o componente Post com as propriedades definidas
            return (
              <Post
                // usando o key para resolver o warning: each child in a list should have a unique key prop
                // a key não mostra no html 
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
      
    </div>
  )
}