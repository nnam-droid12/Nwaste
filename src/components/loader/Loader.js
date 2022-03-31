const Loader = () => {
    const loader = document.getElementById('loader');

                function loading() {
                    loader.hidden = false;
                }

    return ( 
        <main>
            <div className="loader" id="loader"></div>
        </main>
     );
}
 
export default Loader;