import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import { useState } from 'react';

export function Comment({ content, onDeleteComment}) {

    // criando um estado para armazenar os likes
    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment() {
        onDeleteComment(content);
    }

    // função para aumentar o número de likes
    function handleLikeComment() {
        // dessa forma abaixo eu incremento usando o estado anterior do likeCount
        // setLikeCount(likeCount + 1);

        // nesse caso eu pego no "state (nome qualquer)" o valor mais recente do likeCount
        setLikeCount((state) => {
            return state + 1
        });
    } 

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/jmofarias.png" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>João Marcos</strong>
                            <time title='27 de Março às 21:50h' dateTime='2023-03-27 21:50:12'>Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24}/>
                        </button>
                    </header>

                    {/* pegando a informação do array */}
                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        {/* {likeCount} pegando a quantidade de likes que eu tenho armazenado */}
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}