import sello from "@/assets/images/padron-beneficiarios.png";

const HomeView = () => {

    return (
        <div style={styles.container || {}}>
            <div style={{ ...styles.backgroundImage, backgroundImage: `url(${sello})` }} />
        </div>
    );
};

const styles = {
    container: {
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    backgroundImage: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: '100%',
        maxWidth: '800px',
        height: '100%',
        maxHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
    },
};

export default HomeView;
