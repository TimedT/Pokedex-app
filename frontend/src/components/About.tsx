

function About() {
    let people = ["Pasang Shera"]
    if (people) {
        return (
            <>
                <h1>About</h1>
                <ul className="list-group">
                    {people.map((things) => (
                        <li>{things}</li>
                    ))}
                </ul>
            </>
        );
    } else {
        return <><h1>things</h1></>
    }
}

export default About;