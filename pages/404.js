import Navigation from '../src/components/Navigation';
import Link from 'next/link';

const custom404 = () => {
    return(
        <div className="outer-container">
        <Navigation />
        <div className="pge404">
                <p>Page Not Found</p> 
                <p>Unfortunately the page you're looking for doesn't exist or there was an error in the link you typed </p>       
                <button> <Link href="/dashboard"><a> Go Back to Dashboard</a></Link></button>
        </div>
        </div>
    )
}

export default custom404;