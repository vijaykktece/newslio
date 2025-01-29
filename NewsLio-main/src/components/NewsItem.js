import React from 'react'

const NewsItem = (props) => {

    let { title, description, urlToImage, url, publishedAt, author } = props
    return (
        < div className='my-2' >
            <div className="card">
                <img src={!urlToImage ? "https://thereader.mitpress.mit.edu/wp-content/uploads/2020/01/lede-1-700x420.jpg" : urlToImage} className="card-img-top" alt="NewsImage" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(publishedAt).toGMTString()}</small></p>
                    <a href={url} target="_blank" className="btn btn-dark">Go somewhere</a>
                </div>
            </div>
        </ div>
    )
}

export default NewsItem     