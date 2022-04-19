import './Loader.scss';


const Loader = () => {
   let loader = document.getElementById('loader');
                function loading() {
                    loader.hidden = false;
                }
    return ( 
        <main className='loading'>
            <div className="loader" id="loader">
            </div>
            <p>Loading. . .</p>
        </main>
     );
}
 
export default Loader;