import styles from './BaseError.module.css';

export default function BaseError({code = 404, text = ''}){
    return (
        <div className={styles.baseError}>
            <div className={styles.baseErrorContent}>
                <div className={styles.baseErrorCode}>{code}</div>
                <div className={styles.baseErrorText}>{text}</div>
            </div>
        </div>
    );
}
