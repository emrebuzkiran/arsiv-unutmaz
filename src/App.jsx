import { useState, useEffect } from 'react'
import { getHotPosts } from './api'
import Next from '../public/next.svg'
import Back from '../public/back.svg'
import { Link } from 'react-router-dom'

function App() {
    const [posts, setPosts] = useState([])
    const [lastPostName, setLastPostName] = useState()
    const [firstPostName, setFirstPostName] = useState()
    const [loading, setLoading] = useState(false)

    const fetchPosts = async (before, after) => {
        setLoading(true)
        const posts = await getHotPosts(before, after)
        setPosts(posts)
        setLastPostName(posts[posts.length - 1].name)
        setFirstPostName(posts[0].name)
        setLoading(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const onSourceClick = (url) => {
        if (!url) return alert('Kaynak bulunamadı.')
        window.open(url, '_blank')
    }

    if (loading) {
        return (
            <div className="justify-center text-5xl">
                <svg
                    aria-hidden="true"
                    className="w-20 h-20 mx-auto mt-20 text-blue-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
            </div>
        )
    }

    return (
        <div className="bg-second">
            <div className="flex flex-row justify-center md:space-x-10 lg:space-x-20 text-5xl text-center py-10">
                <span
                    className="hover:cursor-pointer"
                    onClick={() => fetchPosts(firstPostName, null)}
                >
                    <img src={Back} width={50} height={50} />
                </span>
                <h1 className="text-3xl text-center text-fourth">
                    Arsiv Unutmaz
                </h1>
                <span
                    className="hover:cursor-pointer"
                    onClick={() => fetchPosts(null, lastPostName)}
                >
                    <img src={Next} width={50} height={50} />
                </span>
            </div>
            <div className="flex flex-col justify-center lg:px-20">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="shadow-xl bg-first justify-center space-y-4 flex flex-col p-4 m-4 h-fit text-center"
                    >
                        <h2 className="text-xl">{post.title}</h2>
                        <p className="line-clamp-2">{post.selftext}</p>
                        <a href={post.url} target="_blank">
                            Post'a eklenen link
                        </a>
                        <a
                            href={`https://www.reddit.com${post.permalink}`}
                            target="_blank"
                        >
                            Post Link
                        </a>
                        <div className="flex flex-row justify-center gap-4 text-center py-4">
                            <button className="bg-blue-500 hover:bg-blue-700 w-fit text-white font-bold py-2 px-4 rounded">
                                View More
                            </button>
                            <button
                                onClick={() => onSourceClick(post.source)}
                                className="bg-blue-500 hover:bg-blue-700 w-fit text-white font-bold py-2 px-4 rounded"
                            >
                                {post.source ? 'View Source' : 'No Source'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App