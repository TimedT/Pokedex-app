import "../styles/main.css"
import "../styles/home.css"

function Home() {

    if (true) {
        return (
            <div className="container">
                <h1>Pokedex</h1>
                <div>Welcome</div>
                <a href="/Pokemon/incineroar">Incineorar</a>
            </div>
        );
    } else {
        return <><h1>things</h1></>
    }
}

export default Home;