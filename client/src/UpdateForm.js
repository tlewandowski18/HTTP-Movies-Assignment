import React, { useState, useEffect }  from "react"
import axios from "axios"

const UpdateForm = (props) => {

    const [movie, setMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: []
    })

    useEffect(() => {
        const movieToUpdate = props.movies.find(movie => {
            return `${movie.id}` === props.match.params.id
        })

        if (movieToUpdate) {
            setMovie(movieToUpdate)
        }

    }, [props.movies, props.match.params.id])

    const handleChange = e => {
        if (e.target.name === "metascore") {
            setMovie({
                ...movie,
                metascore: parseInt(e.target.value, 10)
            })
        } else if (e.target.name === "stars") {
            setMovie({
                ...movie,
                stars: e.target.value.split(',')
            })
        } else {
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleUpdate = e => {
        e.preventDefault()
        console.log(props.movies)
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res.data)
                props.setMovieList(props.movies.map(movie => {
                        if (movie.id === res.data.id) {
                            return res.data
                        }
                        return movie
                    })
                )
                props.history.push("/")

            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <h1>Update Form</h1>
            <form onSubmit={handleUpdate}>
                <input 
                    name="title"
                    value={movie.title}
                    placeholder="Title"
                    onChange={handleChange}
                /><br /><br />
                <input 
                    name="director"
                    value={movie.director}
                    placeholder="Director"
                    onChange={handleChange}
                /><br /><br />
                <input 
                    name="metascore"
                    value={movie.metascore}
                    placeholder="Metascore"
                    onChange={handleChange}
                /><br /><br />
                <input 
                    name="stars"
                    value={movie.stars}
                    placeholder="Actors"
                    onChange={handleChange}
                /><br /><br />
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default UpdateForm;