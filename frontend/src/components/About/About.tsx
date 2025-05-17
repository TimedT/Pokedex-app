import { useEffect, useState } from "react";
import "../../styles/main.css"
import "../../styles/About.css"
import BASE_URL from "../../config";

function About() {
    const [aboutText, setAboutText] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch(`${BASE_URL}/api/about`)
            .then((res) => res.json())
            .then((data) => setAboutText(data.content || ""));
    }, []);

    const handleSave = async () => {
        const res = await fetch(`${BASE_URL}/api/about`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: aboutText }),
        });

        if (res.ok) {
            setIsEditing(false);
        } else {
            alert("Failed to save about text.");
        }
    };


    return (
        <div className="container">
            <div className="about-container">
                <h1>About</h1>
                {isEditing ? (
                    <>
                        <textarea
                            className="about-editor"
                            rows={10}
                            value={aboutText}
                            onChange={(e) => setAboutText(e.target.value)}
                        />
                        <button onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <>
                        <p style={{ whiteSpace: "pre-wrap" }}>{aboutText}</p>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    </>
                )}
            </div>
        </div>

    );

}

export default About;