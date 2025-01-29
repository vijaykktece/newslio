import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
    const news_url = process.env.REACT_APP_NEWS_URL;
    const [articals, setArticals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(30)
        const url = `${news_url}countries=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(60)
        let parsedata = await data.json()
        props.setProgress(70)
        setArticals(parsedata.articles)
        setTotalResults(parsedata.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = `NewsLio - ${capitalizeFirstLetter(props.category)}`
        updateNews()
    }, [])

    const fetchMoreData = async () => {
        const url = `${news_url}country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url)
        let parsedata = await data.json()
        setArticals(articals.concat(parsedata.articles))
        setTotalResults(parsedata.totalResults)
    };

    return (
        <div className="container my-3">
            <h1 className='text-center my-4'>NewsLio - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articals.length}
                next={fetchMoreData}
                hasMore={articals.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {/* {!loading && articals?.map((element) => { */}
                        {articals?.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} urlToImage={element.urlToImage} url={element.url} publishedAt={element.publishedAt} author={element.author} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div >
    )
}


News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
}

News.propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}

export default News