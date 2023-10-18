// importando biblioteca para manipular datas
import { format, formatDistanceToNow } from 'date-fns';
// importando o idioma do date-fns
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';
import { useState } from 'react';

// esse componente vai possuir algumas propriedades como author
export function Post({ author, publishedAt, content }) {

    // criando um array de comentários
    // useState: função do React que vai observar o estado dessa variável
    // vai receber duas posições, a primeira vai ser a minha variável (comments), e a segunda vai receber uma função (setComments) para eu alterar o valor dessa minha variável e mostrar na tela a atualização 
    const [comments, setComments] = useState([
        'Post muito bacana!'
    ])

    // criando um estado para armazenar o texto digitado no input e limpar o textarea
    // como é um texto inicio o useState com uma string vazia
    // sempre iniciar o useState com o mesmo formato ou tipo que a gente vai trabalhar
    const [newCommentText, setNewCommentText] = useState('')

    // usando o format (função do date-fns) da biblioteca date-fns para formatar a data publishedAt, no formato escolhido
    const publishedDateFormatted = format(publishedAt, "d 'de' LLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    // variável para armazenar a data de publicação do post no exato momento
    // formatDistanceToNow(função do date-dns)
    // comparando a data que foi passada com a data atual
    const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        // para ficar "há.." 8 dias
        addSuffix: true,
    })

    // uso handle no nome da função quando se trata de uma ação que está sendo disparada através de uma ação do usuário, como um click do botão ou envio do formulário (padrão)
    function handleCreateNewComment() {
        event.preventDefault()

        // usando a função setComments para atualizar o array de comentários quando o form for enviado
        // passando o novo valor do estado de comentários
        // ...comments: copia o valor que já existe no array de comments
        // comments.length: pego o tamanho desse array + 1 que será o comentário adicionado quando clicar
        // usando a variável newCommentText que tem armazenado o valor mais recente para adicionar um novo comentário no final
        setComments([...comments, newCommentText])

        // depois de criar o novo comentário, pego o estado que armazena o conteúdo da textarea (setNewCommentText) e volto ele para com um valor em branco para limpar o textarea
        setNewCommentText('');
    }

    function handleNewCommentChange() {
        // voltando o valor do setCustomValidy para vazio quando o input estiver alguma alteração
        event.target.setCustomValidity('');
        // salvando o que foi digitado no textarea no setNewCommentText
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid() {
        // buscando o text-area e a propriedade setCustomValidity com a mensagem que eu quero que apareça quando o usuário tentar enviar com o input vazio
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    // função que vai receber o comentário que será removido
    function deleteComment(commentToDelete) {
        // criando nova lista de comentários tirando o comentário que não quero mais
        // método filter para percorrer cada comentário se eu retornar true ele mantém na lista, se eu retornar false ele remove da lista o item
        const commentsWithoutDeleteOne = comments.filter(comment => {
            // mantendo na lista os comentários que tiverem o texto diferente do comentário que quero deletar 
            return comment !== commentToDelete;
        })

        // usando a função setComments para atualizar o valor da lista
        // imutabilidade -> as variáveis não sofrem mutação, nós criamos um novo valor (um novo espaço na memória)
        setComments(commentsWithoutDeleteOne);
    }

    // clean code -> aqui eu estou criando uma variável que vai verificar se o newCommentText é igual a zero; utilizo essa variável no botão Publicar fazendo referência ao disabled
    const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    {/* passando a propriedade props.author para pegar o avatar dentro de author definido em App.jsx */}
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                {/* toISOString(): método do javascript para formatar data atual */}
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeNow}
                </time>
            </header>

            <div className={styles.content}>
                {/* percorrendo o array de content e mostrar isso em tela */}
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        // usando o key para remover o warning e como na lista não tem um id único para cada elemento a key será o conteúdo
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            {/* onSubmit: para quando o usuário realizar o envio do formulário */}
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe seu comentário'
                    // dizendo que o valor do textarea será o valor armazena em newCommentText
                    // usando isso para limpar o textarea depois
                    value={newCommentText}
                    // monitorar toda vez que estiver uma mudança no conteúdo, chamo a função
                    onChange={handleNewCommentChange}
                    // propriedade que vai ser chamada sempre que o html identificar que a gente realizou um submit do formulário com o texto inválido (vazio)
                    onInvalid={handleNewCommentInvalid}
                    // propriedade do próprio html para validar quando o campo está vazio, como eu iria colocar como true, não precisa colocar required = {true}
                    required
                />

                {/* criando o footer por volta do botão para esconder o espaço do botão para que quando clicar no input aparecer o espaço com o botão */}
                <footer>
                    {/* disabled={newCommentText.length === 0} -> dizendo que quando o input estiver tamanho igual a zero esse botão será disabled */}
                    <button type='submit' disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {/* percorrendo os itens do array de comentários e retornando o componente de comentário com o texto do comentário */}
                {/* passando também a função deleteComment no componente Comment */}
                {/* começando com "on" em onDeleteComment para quando acontecer a remoção de um comentário eu executo a função */}
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}