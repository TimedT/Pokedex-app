import "../styles/main.css"
import "../styles/home.css"

function Home() {
    let things = ["pokemon things", "mabye pokemon things"]

    if (things) {
        return (
            <div className="container">
                <h1>Pokedex</h1>
                <ul className="list-group">
                    {things.map((things) => (
                        <li>{things}</li>
                    ))}
                </ul>
                <a href="/Pokemon/incineroar">Incineorar</a>
            </div>
        );
    } else {
        return <><h1>things</h1></>
    }
}

export default Home;