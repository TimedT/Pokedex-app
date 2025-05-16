import "../../styles/main.css"

function About() {
    let people = ["Pasang Shera"]
    if (people) {
        return (
            <>
                <div className="container">
                    <h1>About</h1>
                    <ul className="list-group">
                        {people.map((things) => (
                            <li>{things}</li>
                        ))}
                        <br></br>
                        <p></p>
                    </ul>
                </div>

            </>
        );
    } else {
        return <><h1>things</h1></>
    }
}

export default About;