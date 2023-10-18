import styles from "./Avatar.module.css"

// passando um objeto dizendo que quero buscar apenas as propriedade hasborder e uma propriedade src
// definindo o valor default de hasborder como true
export function Avatar( {hasBorder = true, src} ) {
    return(
        <img
        // se hasborder for true recebe a estilização avatarWithBorder senão recebe a estilização avatar
        className={hasBorder ? styles.avatarWithBorder : styles.avatar}
        src={src}
        />
    );
}