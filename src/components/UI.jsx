import React from 'react'

function UI() {
    const [opened, setOpened] = useState(false);
    const handleNext = () => {
        setOpened(true);
    }
    return (
        <>
            <button className='' onClick={handleNext}>Next</button>
        </>
    )
}

export default UI
