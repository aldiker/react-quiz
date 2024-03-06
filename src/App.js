import { useEffect } from 'react'
import Header from './components/Header'
import Main from './components/Main'

export default function App() {
    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log('Error'))
    }, [])

    return (
        <div className="app">
            <Header />
            <Main>
                <p>1/15</p>
                <p>Question?</p>
            </Main>
        </div>
    )
}
